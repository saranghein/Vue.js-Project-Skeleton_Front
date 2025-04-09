<style scoped>
span {
  padding: 8px 16px;

  color: black;
  border-radius: 20px;
  cursor: pointer;
}
</style>

<template>
  <span
    :style="{
      backgroundColor: bgColor ? COLORS[bgColor] : COLORS.GRAY01,
      color: color ? COLORS[color] : 'black',
    }"
  >
    {{ name }}
  </span>
</template>

<script setup>
import { COLORS } from '@/util/constants';

defineProps({
  name: {
    type: String,
    required: true, // name만 필수요소
  },
  bgColor: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '',
  },
});
</script>
