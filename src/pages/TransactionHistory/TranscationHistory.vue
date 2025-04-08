<template>
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
.transaction-list__filter {
  display: flex;
  width: 100%;
  justify-content: right;
  margin-left: auto;
  align-items: center;
}

.transaction-list__filter__label {
  font-size: 12px;
  color: #8d8d8d;
}
</style>

<script setup>
import TransactionList from '@/components/transactionHistory/TransactionList.vue';
</script>
