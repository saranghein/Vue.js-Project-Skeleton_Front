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
          userId: transaction.user_id,
          transactionFlowType: transaction.flow_type,
          transactionDate: transaction.date,
          transactionAmount: transaction.amount,
          transactionCategory: transaction.category,
          transactionTitle: transaction.memo,
          transactionMemo: transaction.payment,
        }"
        @open="openModal(transaction.id)"
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
import { computed } from 'vue';
import { formatDateToShort } from '../../util/formatDate.js';

const props = defineProps({
  transactions: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['open']);

const formattedTransactions = computed(() =>
  props.transactions.map((tx) => ({
    ...tx,
    date: formatDateToShort(tx.date),
  }))
);

const openModal = (id) => {
  emit('open', id);
};
</script>
