<template>
  <Header :pageName="'거래 내역'"></Header>
  <section class="transaction-info">
    <div class="transaction-info__badge">
      <badge :name="'전체'" :color="'WHITE'" :bgColor="'GREEN02'"></badge>
      <badge :name="'수입'" :color="'WHITE'" :bgColor="'GREEN02'"></badge>
      <badge :name="'지출'" :color="'WHITE'" :bgColor="'GREEN02'"></badge>
    </div>
    <div class="transaction-info__balance">
      <span class="transaction-info__balance__label">총 평가금액</span>
      <span class="transaction-info__balance__amount">1,000,000</span>
    </div>
  </section>
  <section class="transaction-list">
    <div class="transaction-list__filter">
      <span class="transaction-list__filter__label">최신순</span>
      <i
        class="fa-solid fa-angle-down icon"
        style="color: #dedede; padding: 3px"
      ></i>
    </div>
    <transaction-list />
  </section>
</template>

<style scoped>
.transaction-info {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}

.transaction-info__badge > * {
  margin-right: 10px;
}

.transaction-info__balance {
  padding-top: 22px;
  padding-bottom: 22px;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 20px;

  background-color: #cef9ed;
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
}

.transaction-info__balance__label {
  font-size: 12px;
  color: #8d8d8d;
}

.transaction-info__balance__amount {
  justify-content: center;
}

.transaction-list {
  margin-top: 25px;
  width: 100%;
}

.transaction-list__filter {
  display: flex;
  width: 100%;
  justify-content: right;
  margin-left: auto;
  align-items: center;
  margin-top: 15px;
}

.transaction-list__filter__label {
  font-size: 12px;
  color: #8d8d8d;
}
</style>

<script setup>
import TransactionList from '@/components/transactionHistory/TransactionList.vue';
import Header from '@/components/common/Header.vue';
import Badge from '@/components/common/Badge.vue';
import { COLORS } from '@/util/constants';
</script>
