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
    @click="handleClick"
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

const props = defineProps({
  name: { type: String, required: true },
  bgColor: String,
  color: String,
  clickHandler: Function,
});

const handleClick = () => {
  if (props.clickHandler) {
    props.clickHandler();
  }
};
</script>
