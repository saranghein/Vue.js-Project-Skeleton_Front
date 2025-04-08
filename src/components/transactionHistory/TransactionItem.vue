<template>
  <article class="transaction-item">
    <div class="transaction-item__left">
      <img class="transaction-item__img" src="" alt="" />
      <div class="transaction-item__content">
        <p class="transaction-item__title">{{ data.transactionTitle }}</p>
        <p class="transaction-item__desc" :style="{ color: COLORS.GRAY02 }">
          {{ data.transactionDate }} | {{ data.transactionMemo }}
        </p>
      </div>
    </div>
    <div class="transaction-item__right">
      <p class="transaction-item__amount">{{ data.transactionAmount }}원</p>
      <i
        class="fa-solid fa-ellipsis-vertical"
        style="color: #aeaeae; padding: 10px"
      ></i>
    </div>
  </article>
  <div
    class="transaction-item__divider"
    :style="{ backgroundColor: COLORS.GRAY00 }"
  ></div>
</template>

<style scoped>
.transaction-item {
  padding: 20px;
  padding-right: 30px;

  display: flex;
  justify-content: space-between;
}

.transaction-item__left {
  display: flex;
  align-items: center;
}

.transaction-item__content {
  margin-left: 12px;
}

.transaction-item__img {
  clip-path: circle(50%);
  height: 42px;
  background-color: gray;
  width: 42px;
}

.transaction-item__title {
  font-size: 16px;
  padding: 0;
  margin: 0;
}

.transaction-item__desc {
  font-size: 10px;
  padding: 0;
  margin: 4px 0 0 0;
}

.transaction-item__right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.transaction-item__amount {
  padding: 0;
  margin: 0;
  margin-right: 12px;
}

.transaction-item__divider {
  height: 2px;
}
</style>

<script setup>
import { defineProps } from 'vue';
import { COLORS } from '@/util/constants';

const props = defineProps({
  data: {
    transactionId: Number,
    userId: Number,
    flowType: String,
    transactionDate: String,
    transactionAmount: Number,
    transactionCategory: String,
    transactionTitle: String,
    transactionMemo: String,
  },
});
</script>
