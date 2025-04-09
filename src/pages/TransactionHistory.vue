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
    <transaction-history-filter-modal
      :isOpen="isFilterModalOpen"
      @close="closeFilterModal"
    />
    <BottomModal :isOpen="isEditModalOpen" @close="closeEditModal" />
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
import TransactionHistoryFilterModal from '@/components/transactionHistory/TransactionHistoryFilterModal.vue';
import BottomModal from '@/components/transactionHistory/BottomModal.vue';

import { COLORS } from '@/util/constants';
import { ref } from 'vue';

const selectedType = ref('전체');

const selectType = (type) => {
  selectedType.value = type;
};

const isFilterModalOpen = ref(false);
const isEditModalOpen = ref(false);

const openFilterModal = () => {
  isFilterModalOpen.value = true;
};

const openEditModal = () => {
  isEditModalOpen.value = true;
};

const closeFilterModal = () => {
  isFilterModalOpen.value = false;
};

const closeEditModal = () => {
  isEditModalOpen.value = false;
};
</script>
