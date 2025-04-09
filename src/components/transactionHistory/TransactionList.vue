<template>
  <ul
    class="transaction-list"
    v-for="(transaction, index) in formattedTransactions"
    :key="index"
  >
    <li>
      <transaction-item
        :data="{
          transactionId: transaction.id,
          transactionUserId: transaction.user_id,
          transactionFlowType: transaction.flow_type,
          transactionDate: transaction.date,
          transactionAmount: transaction.amount,
          transactionCategory: transaction.category,
          transactionTitle: transaction.category,
          transactionMemo: transaction.memo,
        }"
        @open="openModal"
      />
    </li>
  </ul>
</template>

<style scoped>
.transaction-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>

<script setup>
import TransactionItem from './TransactionItem.vue';
import { reactive, computed } from 'vue';
import { formatDateToShort } from '../../util/formatDate.js';

const baseTransaction = {
  user_id: 1,
  flow_type: '지출',
  date: '2025-04-02T12:30:00',
  amount: 12000,
  category: '식비',
  memo: '회사 근처 식당',
  payment: '신용/체크',
};

const state = reactive({
  transactions: Array.from({ length: 10 }, (_, i) => ({
    ...baseTransaction,
    id: i + 1,
  })),
});

const formattedTransactions = computed(() =>
  state.transactions.map((tx) => ({
    ...tx,
    date: formatDateToShort(tx.date),
  }))
);

const emit = defineEmits(['open']);

const openModal = () => {
  emit('open');
};
</script>
