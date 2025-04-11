<template>
  <div class="modal-backdrop" @click.self="onClose">
    <div class="modal-content">
      <div class="scroll-padding-wrapper">
        <div class="modal-scroll-wrapper">
          <Registration :isModal="true" @close="onClose" />
        </div>
      </div>
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
  z-index: 9999;
}

.modal-content {
  background-color: white;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: fade-in 0.3s ease;
}

/* ✅ 여백만 담당하는 껍데기 */
.scroll-padding-wrapper {
  flex: 1;
  padding: 8px 0;
  box-sizing: border-box;
  overflow: hidden; /* 스크롤바가 radius 영역 넘어가지 않도록 잘라줌 */
}

/* ✅ 진짜 스크롤 되는 영역 */
.modal-scroll-wrapper {
  height: 100%;
  overflow-y: auto;
}
.modal-scroll-wrapper::-webkit-scrollbar-track {
  background: transparent; /* ✅ 비활성화 영역 투명하게 */
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
