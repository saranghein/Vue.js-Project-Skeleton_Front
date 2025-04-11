<template>
  <div v-if="visible" class="modal-backdrop">
    <div class="modal-content">
      <p>{{ message }}</p>
      <div class="modal-buttons">
        <button class="modal-button confirm" @click="onConfirm">확인</button>
        <button class="modal-button cancel" @click="onCancel">취소</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  visible: Boolean,
  message: String,
});

const emit = defineEmits(['confirm', 'cancel']);

const onConfirm = () => {
  emit('confirm');
};

const onCancel = () => {
  emit('cancel');
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal-content {
  background: white;
  width: 18.75rem;
  padding: 2rem 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.modal-buttons {
  margin-top: 1.2rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.modal-button {
  padding: 0.5rem 1.5rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: bold;
}

.confirm {
  background-color: #8bbfff;
  color: white;
}

.cancel {
  background-color: #ddd;
  color: #333;
}
</style>
