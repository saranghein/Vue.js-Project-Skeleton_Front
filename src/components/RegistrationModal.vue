<template>
  <div class="modal-backdrop" @click.self="onClose">
    <div class="modal-content">
      <Registration />
    </div>
  </div>
</template>

<script setup>
import Registration from '@/pages/Registration.vue';

const emit = defineEmits(['close']);

const onClose = () => {
  emit('close');
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.modal-content {
  background-color: white;
  border-radius: 12px;
  padding: 0px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  animation: fade-in 0.3s ease;
}
@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
