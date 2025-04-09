<template>
  <section class="transaction-info">
    <div
      class="transaction-info__balance"
      :style="{ backgroundColor: COLORS.GREEN01 }"
    >
      <span class="transaction-info__balance__amount">{{
        calculateTotalAmount()
      }}</span>
    </div>
    <div class="transaction-info__summary pointer">
      <div
        :style="{
          backgroundColor:
            selectedType === '수입' ? COLORS.GRAY03 : COLORS.GREEN01,
          color: selectedType === '수입' ? COLORS.WHITE : COLORS.GRAY02,
        }"
        @click="$emit('selectType', '수입')"
      >
        <span>수입</span><br />
        <span
          :style="{
            color: selectedType === '수입' ? COLORS.WHITE : COLORS.BLUE,
          }"
        >
          {{ sumTransactionsAmount('수입') }}원
        </span>
      </div>
      <div
        :style="{
          backgroundColor:
            selectedType === '지출' ? COLORS.GRAY03 : COLORS.GREEN01,
          color: selectedType === '지출' ? COLORS.WHITE : COLORS.GRAY02,
        }"
        @click="$emit('selectType', '지출')"
      >
        <span>지출</span><br />
        <span
          :style="{
            color: selectedType === '지출' ? COLORS.WHITE : COLORS.RED,
          }"
        >
          {{ sumTransactionsAmount('지출') }}원
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.transaction-info {
  margin: 0 16px;
  display: flex;
  flex-direction: column;
}
.transaction-info__balance {
  padding: 22px 20px;
  margin-top: 20px;
  border-radius: 12px;
}
.transaction-info__balance__amount {
  font-size: 20px;
  display: flex;
  justify-content: center;
}
.transaction-info__summary {
  margin: 20px 0 24px;
  display: flex;
  justify-content: space-around;
}
.transaction-info__summary > div {
  width: 100%;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s;
}

.transaction-info__summary > div:first-child {
  margin-right: 20px;
}
</style>

<script setup>
import { COLORS } from '@/util/constants';

const props = defineProps({
  selectedType: String,
  calculateTotalAmount: Function,
  sumTransactionsAmount: Function,
});
</script>
