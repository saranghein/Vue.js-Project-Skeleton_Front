<!-- <script setup>
defineProps({
  label: String,
  image: String,
  isActive: Boolean,
});
const emit = defineEmits(['click']);
</script>
<template>
  <div
    class="btn-container"
    @click="$emit('click')"
    :class="{ active: isActive }"
  >
    <img :src="image" :alt="label" class="btn-image" />
    <span class="btn-label">{{ label }}</span>
  </div>
</template>

<style scoped>
.btn-container {
  position: relative;
  width: 64px;
  height: 64px;
  cursor: pointer;
  margin: 10px;
  transition: transform 0.1s ease;
}
.btn-container:hover {
  transform: scale(1.05);
}
.btn-image {
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 50%;
  filter: brightness(1);
}
.btn-container.active .btn-image {
  filter: brightness(0.6);
}
.btn-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  font-size: 14px;
  font-weight: 600;
  color: #434343; /* 기본 색 */
  opacity: 0.7;
  pointer-events: none;
  transition: color 0.2s ease;
}

.btn-container.active .btn-label {
  color: #55efc4; /* 클릭 시 색 */
}
</style> -->
<template>
  <div
    class="btn-container"
    :class="{ active: isActive }"
    @click="$emit('click')"
    :style="{
      backgroundColor: bgColor ? COLORS[bgColor] : COLORS.GRAY01,
      color: color ? COLORS[color] : 'white',
    }"
  >
    <span class="btn-label">{{ label }}</span>
  </div>
</template>

<script setup>
import { COLORS } from '@/util/constants';

defineProps({
  label: { type: String, required: true },
  bgColor: String,
  color: String,
  isActive: Boolean,
});
const emit = defineEmits(['click']);
</script>

<style scoped>
.btn-container {
  min-width: 100px;
  max-width: 160px;
  width: 300px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.2s ease, filter 0.2s ease;
}

.btn-container:hover {
  transform: scale(1.03);
}

.btn-container.active {
  filter: brightness(0.85);
}

.btn-label {
  font-weight: 200;
  opacity: 0.9;
}
.btn-container.active {
  background-color: #55efc4 !important; /* 예: 민트 */
  color: black !important;
  filter: none;
}
</style>
