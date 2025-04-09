<template>
  <div class="layout" :style="{ backgroundColor: COLORS.GREEN02 }">
    <header>
      <Header :pageName="'거래 내역'" />
    </header>

    <TransactionSummary
      :selectedType="selectedType"
      :calculateTotalAmount="calculateTotalAmount"
      :sumTransactionsAmount="sumTransactionsAmount"
      @selectType="selectType"
    />

    <section
      class="transaction-list"
      :style="{ backgroundColor: COLORS.WHITE }"
    >
      <div class="transaction-list__filter pointer" @click="openFilterModal">
        <span
          class="transaction-list__filter__label"
          :style="{ color: COLORS.GRAY02 }"
        >
          {{ filters.type || '전체' }} | {{ filters.category || '전체' }} |
          {{ filters.date || '최신순' }}
        </span>
        <i
          class="fa-solid fa-angle-down icon"
          style="color: #dedede; padding: 6px; margin-right: 25px"
        />
      </div>

      <EmptyView v-if="filteredTransactions.length === 0" />

      <TransactionList
        v-else
        :transactions="filteredTransactions"
        @open="openEditModal"
      />
    </section>

    <FilterBottomModal
      :type="filters.type"
      :isOpen="isFilterModalOpen"
      @close="closeFilterModal"
    />
    <BottomModal
      :isOpen="isEditModalOpen"
      @close="closeEditModal"
      @delete="deleteTransaction"
    />
  </div>
</template>

<style scoped>
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
import Header from '@/components/common/Header.vue';
import TransactionList from '@/components/transactionHistory/TransactionList.vue';
import TransactionSummary from '@/components/transactionHistory/TransactionSummary.vue';
import EmptyView from '@/components/transactionHistory/EmptyView.vue';
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

const filteredTransactions = computed(() => {
  return transactions.value
    .filter((tx) => {
      if (filters.type && filters.type !== '전체') {
        return tx.flow_type === filters.type;
      }
      return true;
    })
    .filter((tx) => {
      if (filters.category && filters.category !== '전체') {
        return tx.category === filters.category;
      }
      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (filters.date === '오래된 순') return dateA - dateB;
      return dateB - dateA;
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
