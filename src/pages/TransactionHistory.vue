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
        <span
          class="transaction-info__balance__label"
          :style="{ color: COLORS.GRAY02 }"
          >총 평가금액</span
        >
        <span class="transaction-info__balance__amount">1,000,000</span>
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
          <span>10000원</span>
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
          <span>10000원</span>
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
          >최신순</span
        >
        <i
          class="fa-solid fa-angle-down icon"
          style="color: #dedede; padding: 3px; margin-right: 25px"
        ></i>
      </div>
      <transaction-list @open="openEditModal" />
    </section>
    <filter-bottom-modal
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

  display: flex;
  justify-content: space-between;
}

.transaction-info__balance__label {
  font-size: 12px;
}

.transaction-info__balance__amount {
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
import { ref, provide, onMounted } from 'vue';
import { TransactionService } from '@/util/apiService';

const selectedType = ref('전체');
const isFilterModalOpen = ref(false);
const isEditModalOpen = ref(false);
const transactions = ref([]);
const transactionId = ref(null);

const fetchTransactions = async () => {
  try {
    const response = await TransactionService.get();
    transactions.value = response.data;
  } catch (error) {
    console.error('거래내역 가져오기 실패:', error);
  }
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

onMounted(() => {
  fetchTransactions();
});

provide('transactionHistory', {
  transactions,
});

const selectType = (type) => {
  selectedType.value = type;
};

const openFilterModal = () => {
  isFilterModalOpen.value = true;
};

const openEditModal = (id) => {
  isEditModalOpen.value = true;
  transactionId.value = id;
};

const closeFilterModal = () => {
  isFilterModalOpen.value = false;
};

const closeEditModal = () => {
  isEditModalOpen.value = false;
};
</script>
