<script setup>
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
</style>
