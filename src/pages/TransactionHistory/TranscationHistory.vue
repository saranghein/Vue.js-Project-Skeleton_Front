<template>
  <div class="layout" :style="{ backgroundColor: COLORS.GREEN02 }">
    <Header :pageName="'거래 내역'"></Header>
    <section class="transaction-info">
      <div class="transaction-info__badge">
        <badge
          :name="'전체'"
          :color="selectedType === '전체' ? 'WHITE' : 'GRAY02'"
          :bgColor="selectedType === '전체' ? 'GRAY03' : 'GREEN01'"
          @click="selectType('전체')"
        ></badge>
        <badge
          :name="'수입'"
          :color="selectedType === '수입' ? 'WHITE' : 'GRAY02'"
          :bgColor="selectedType === '수입' ? 'GRAY03' : 'GREEN01'"
          @click="selectType('수입')"
        ></badge>
        <badge
          :name="'지출'"
          :color="selectedType === '지출' ? 'WHITE' : 'GRAY02'"
          :bgColor="selectedType === '지출' ? 'GRAY03' : 'GREEN01'"
          @click="selectType('지출')"
        ></badge>
      </div>
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
    </section>
    <section
      class="transaction-list"
      :style="{ backgroundColor: COLORS.WHITE }"
    >
      <div class="transaction-list__filter">
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
      <transaction-list />
    </section>
  </div>
</template>

<style scoped>
.transaction-info {
  margin-top: 20px;
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

.transaction-list {
  width: 100%;
  margin-top: 25px;
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
import Badge from '@/components/common/Badge.vue';
import { COLORS } from '@/util/constants';
import { ref } from 'vue';

const selectedType = ref('전체');

const selectType = (type) => {
  selectedType.value = type;
};
</script>
