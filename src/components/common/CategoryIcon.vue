<style scoped>
.categoryIconContainer {
  width: 42px;
  height: 42px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: lightgray;

  border-radius: 50%;
  object-fit: contain;
  color: black;
}
</style>

<template>
  <div
    class="categoryIconContainer"
    :style="{
      backgroundColor: isIncome
        ? incomeIcons[incomeType][1]
        : expenseIcons[expenseType][1],
    }"
  >
    <i :class="`fa-solid fa-${icon}`"></i>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { defineProps } from 'vue';

defineProps({
  //'수입' 혹은 '지출'
  categoryType: {
    type: String,
    default: '',
    default: true,
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
  월급: ['briefcase'],
  용돈: 'sack-dollar',
  기타: 'folder-plus',
};

const expenseIcons = {
  식비: 'utensils',
  쇼핑: 'basket-shopping',
  커피: 'mug-hot',
  문화생활: 'masks-theater',
  교통: 'car-side',
  기타: 'folder-minus',
};

// 수입인지 지출인지 저장
const isIncome = categoryType;

// 수입 지출 여부에 따라 아이콘 매칭
const icon = computed(() => {
  return isIncome.value === '수입'
    ? incomeIcons[incomeType][0] || 'folder-plus'
    : expenseIcons[expenseType][0] || 'folder-minus';
});
</script>
