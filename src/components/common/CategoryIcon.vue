<style scoped>
.categoryIconContainer {
  width: 42px;
  height: 42px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;
  object-fit: contain;
  color: white;
}
</style>

<template>
  <div
    class="categoryIconContainer"
    :style="{
      backgroundColor,
    }"
  >
    <i :class="`fa-solid fa-${icon}`"></i>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { defineProps } from 'vue';

const props = defineProps({
  //'수입' 혹은 '지출'
  categoryType: {
    type: String,
    default: '',
    required: true,
  },
  // 수입이라면 어떤 카테고리인지
  incomeType: {
    type: String,
    default: '',
  },
  // 지출이라면 어떤 카테고리인지
  expenseType: {
    type: String,
    default: '',
  },
});

// 추후 상수 파일로 옮길 예정
const incomeIcons = {
  월급: ['briefcase', '#4CAF50'], // 녹색
  용돈: ['sack-dollar', '#FFC107'], // 노란색
  기타: ['folder-plus', '#03A9F4'], // 파란색
};

const expenseIcons = {
  식비: ['utensils', '#FF5722'], // 주황색
  쇼핑: ['basket-shopping', '#9C27B0'], // 보라색
  커피: ['mug-hot', '#795548'], // 갈색
  문화생활: ['masks-theater', '#673AB7'], // 진한 보라색
  교통: ['car-side', '#2196F3'], // 파란색
  기타: ['folder-minus', '#607D8B'], // 회색
};

// 수입인지 지출인지 저장
const isIncome = computed(() => props.categoryType === '수입');

// 수입 지출 여부에 따라 아이콘 매칭
const icon = computed(() => {
  return isIncome.value
    ? incomeIcons[props.incomeType]?.[0] || 'folder-plus'
    : expenseIcons[props.expenseType]?.[0] || 'folder-minus';
});

// 수입 지출 여부에 따라 배경색 매칭
const backgroundColor = computed(() => {
  return isIncome.value
    ? incomeIcons[props.incomeType]?.[1] || '#03A9F4' // 기본값: 파란색
    : expenseIcons[props.expenseType]?.[1] || '#607D8B'; // 기본값: 회색
});
</script>
