<style scoped>
span {
  padding: 8px 16px;

  color: black;
  border-radius: 20px;
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
  name: String,
  bgColor: {
    type: String,
    default: false,
  },
  color: {
    type: String,
    default: false,
  },
});
</script>
