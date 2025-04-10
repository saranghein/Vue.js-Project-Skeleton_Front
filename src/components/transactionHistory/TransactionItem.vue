<template>
  <article class="transaction-item">
    <div class="transaction-item__left">
      <category-icon
        :categoryType="data.transactionFlowType"
        :incomeType="data.transactionCategory"
        :expenseType="data.transactionCategory"
      />
      <div class="transaction-item__content">
        <p class="transaction-item__title">{{ data.transactionTitle }}</p>
        <p class="transaction-item__desc" :style="{ color: COLORS.GRAY02 }">
          {{ data.transactionDate }} | {{ data.transactionMemo }}
        </p>
      </div>
    </div>

    <div class="transaction-item__right">
      <p
        class="transaction-item__amount"
        :style="{
          color: data.transactionFlowType === '지출' ? COLORS.RED : COLORS.BLUE,
        }"
      >
        {{ data.transactionAmount }}원
      </p>
      <i
        class="fa-solid fa-ellipsis-vertical pointer"
        style="color: #aeaeae; padding: 10px"
        @click="openModal"
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
  display: flex;
  justify-content: space-between;

  padding: 20px;
  padding-right: 30px;
}

.transaction-item__left {
  display: flex;
  align-items: center;
}

.transaction-item__content {
  margin-left: 12px;
}

.transaction-item__img {
  height: 42px;
  width: 42px;
  clip-path: circle(50%);
  background-color: gray;
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
import CategoryIcon from '@/components/common/CategoryIcon.vue';

const props = defineProps({
  data: {
    transactionId: String,
    userId: String,
    transactionFlowType: String,
    transactionDate: String,
    transactionAmount: Number,
    transactionCategory: String,
    transactionTitle: String,
    transactionMemo: String,
  },
});

const emit = defineEmits(['open']);

const openModal = () => {
  emit('open');
};
</script>
