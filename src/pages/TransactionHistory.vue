<template>
  <div class="layout" :style="{ backgroundColor: COLORS.GREEN02 }">
    <header>
      <Header :pageName="'거래 내역'"></Header>
    </header>
    <section class="transaction-info">
      <div
        class="transaction-info__balance"
        :style="{ backgroundColor: COLORS.GREEN01 }"
      >
        <span class="transaction-info__balance__amount">{{
          calculateTotalAmount()
        }}</span>
      </div>
      <div class="transaction-info__summary">
        <div
          :style="{
            backgroundColor:
              selectedType === '수입' ? COLORS.GRAY03 : COLORS.GREEN01,
            color: selectedType === '수입' ? COLORS.WHITE : COLORS.GRAY02,
          }"
          @click="selectType('수입')"
        >
          <span>수입</span>
          <br />
          <span
            :style="{
              color: selectedType === '수입' ? COLORS.WHITE : COLORS.BLUE,
            }"
            >{{ sumTransactionsAmount('수입') }}원</span
          >
        </div>
        <div
          :style="{
            backgroundColor:
              selectedType === '지출' ? COLORS.GRAY03 : COLORS.GREEN01,
            color: selectedType === '지출' ? COLORS.WHITE : COLORS.GRAY02,
          }"
          @click="selectType('지출')"
        >
          <span>지출</span>
          <br />
          <span
            :style="{
              color: selectedType === '지출' ? COLORS.WHITE : COLORS.RED,
            }"
            >{{ sumTransactionsAmount('지출') }}원</span
          >
        </div>
      </div>
    </section>
    <section
      class="transaction-list"
      :style="{ backgroundColor: COLORS.WHITE }"
    >
      <div class="transaction-list__filter pointer" @click="openFilterModal">
        <span
          class="transaction-list__filter__label"
          :style="{ color: COLORS.GRAY02 }"
          >{{ filters.type }} | {{ filters.category }} |
          {{ filters.date }}</span
        >
        <i
          class="fa-solid fa-angle-down icon"
          style="color: #dedede; padding: 6px; margin-right: 25px"
        ></i>
      </div>

      <div v-if="filteredTransactions.length === 0" class="empty-view">
        <p
          :style="{
            color: COLORS.GRAY02,
            textAlign: 'center',
            marginTop: '40px',
          }"
        >
          거래 내역이 없습니다 😢
        </p>
      </div>

      <transaction-list
        :transactions="filteredTransactions"
        @open="openEditModal"
      />
    </section>
    <filter-bottom-modal
      :type="filters.type"
      :isOpen="isFilterModalOpen"
      @close="closeFilterModal"
    />
    <bottom-modal
      :isOpen="isEditModalOpen"
      @close="closeEditModal"
      @delete="deleteTransaction"
    />
  </div>
</template>

<style scoped>
.transaction-info {
  margin-left: 16px;
  margin-right: 16px;

  display: flex;
  flex-direction: column;
}

.transaction-info__badge > * {
  margin-right: 10px;
}

.transaction-info__balance {
  padding: 22px 20px;
  margin-top: 20px;
  border-radius: 16px;
}

.transaction-info__balance__amount {
  font-size: 20px;

  display: flex;
  justify-content: center;
}

.transaction-info__summary {
  margin-bottom: 24px;
  margin-top: 20px;

  display: flex;
  justify-content: space-around;
}

.transaction-info__summary > div {
  width: 100%;
  padding: 20px;
  border-radius: 16px;
  text-align: center;
}

.transaction-info__summary > div:first-child {
  margin-right: 20px;
}

.transaction-list {
  width: 100%;
  margin-top: 15px;
  padding-top: 15px;
  border-radius: 16px 16px 0 0;
}

.transaction-list__filter {
  width: 100%;
  margin-left: auto;
  margin-top: 15px;

  display: flex;
  align-items: center;
  justify-content: right;
}

.transaction-list__filter__label {
  font-size: 12px;
}
</style>

<script setup>
import TransactionList from '@/components/transactionHistory/TransactionList.vue';
import Header from '@/components/common/Header.vue';
import FilterBottomModal from '@/components/transactionHistory/FilterBottomModal.vue';
import BottomModal from '@/components/transactionHistory/BottomModal.vue';
import { COLORS } from '@/util/constants';
import { reactive, ref, onMounted, computed } from 'vue';
import { TransactionService } from '@/util/apiService';

const isFilterModalOpen = ref(false);
const isEditModalOpen = ref(false);
const transactions = ref([]);
const transactionId = ref(null);
const filters = reactive({
  type: null,
  category: null,
  date: null,
});

const selectedType = computed(() => filters.type || '전체');

const fetchTransactions = async () => {
  try {
    const response = await TransactionService.get();
    transactions.value = response.data;
  } catch (error) {
    console.error('거래내역 가져오기 실패:', error);
  }
};

//필터링 및 정렬된 거래내역
const filteredTransactions = computed(() => {
  return transactions.value
    .filter((tx) => {
      //type 필터
      if (filters.type && filters.type !== '전체') {
        return tx.flow_type === filters.type;
      }
      return true;
    })
    .filter((tx) => {
      //category 필터
      if (filters.category && filters.category !== '전체') {
        return tx.category === filters.category;
      }
      return true;
    })
    .sort((a, b) => {
      //정렬: 최신순 또는 오래된순
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (filters.date === '오래된 순') return dateA - dateB;
      return dateB - dateA; // 최신순이 기본
    });
});

const selectType = (type) => {
  if (filters.type !== type) {
    filters.category = '전체';
  }
  filters.type = type;
};

const deleteTransaction = async () => {
  try {
    await TransactionService.delete(transactionId.value);

    transactions.value = transactions.value.filter(
      (tx) => tx.id !== transactionId.value
    );
  } catch (error) {
    console.error('거래내역 삭제 실패:', error);
  }
};

const sumTransactionsAmount = (type) => {
  return transactions.value
    .filter((tx) => tx.flow_type === type)
    .reduce((acc, tx) => acc + tx.amount, 0);
};

const calculateTotalAmount = () => {
  const total = sumTransactionsAmount('수입') - sumTransactionsAmount('지출');
  if (total > 0) {
    return `💰 ${total}원 벌었어요`;
  } else if (total < 0) {
    return `😢 ${-total}원 더 썼어요 ㅠㅠ`;
  } else {
    return '수입과 지출이 같아요';
  }
};

onMounted(() => {
  fetchTransactions();
});

const openFilterModal = () => {
  isFilterModalOpen.value = true;
};

const openEditModal = (id) => {
  isEditModalOpen.value = true;
  transactionId.value = id;
};

const closeFilterModal = (selectedFilters) => {
  isFilterModalOpen.value = false;
  filters.type = selectedFilters.type;
  filters.category = selectedFilters.category;
  filters.date = selectedFilters.date;
};

const closeEditModal = () => {
  isEditModalOpen.value = false;
};
</script>
