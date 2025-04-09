<style scoped>
div {
  width: 100%;
  height: 44px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 20px;
  border: none;

  font-size: 16px;
  line-height: 24px;
  text-align: center;

  cursor: pointer;
}
</style>

<template>
  <div
    @click="clickHandler ? clickHandler : () => {}"
    :style="{
      backgroundColor: bgColor ? COLORS[bgColor] : COLORS.GRAY01,
      color: color ? COLORS[color] : 'black',
    }"
  >
    {{ name }}
  </div>
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
  },
  color: {
    type: String,
  },
  clickHandler: {
    type: Function,
  },
});
</script>
