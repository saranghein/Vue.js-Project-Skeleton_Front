<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.bottomModal {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  align-items: center;

  border-radius: 16px 16px 0 0;
  background-color: white;
  z-index: 1000;

  transform: translateY(100%);
  transition: transform 0.3s ease-in-out;
}

.modalBar {
  width: 42px;
  height: 4px;

  margin: 16px 0;

  border-radius: 2px;
  cursor: pointer;
}

.bottomModal.active {
  transform: translateY(0);
}

.modalContent {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.modalOption {
  width: 100%;
  padding: 16px 0;
  cursor: pointer;

  text-align: center;
  font-size: 16px;
}
</style>

<template>
  <div>
    <div class="overlay" v-if="isOpen" @click="closeModal"></div>
    <div
      :class="['bottomModal', { active: isOpen }]"
      @touchstart="onTouchStart"
      @touchend="onTouchEnd"
      @mousedown="onMouseDown"
      @mouseup="onMouseUp"
    >
      <div class="modalBar" :style="{ backgroundColor: COLORS.GRAY04 }"></div>
      <div class="modalContent">
        <div class="modalOption" @click="editTransaction">수정하기</div>
        <div class="modalOption" @click="deleteTransaction">삭제하기</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { COLORS } from '@/util/constants';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: true,
  },
  id: Number,
});

const startY = ref(0);

const emit = defineEmits(['close', 'delete', 'edit']);

const closeModal = () => {
  emit('close');
};

const deleteTransaction = () => {
  emit('delete');
  closeModal();
};

const editTransaction = () => {
  emit('edit');
  closeModal();
};

const onTouchStart = (event) => {
  startY.value = event.touches[0].clientY;
};

const onTouchEnd = (event) => {
  const diffY = event.changedTouches[0].clientY - startY.value;
  if (diffY > 50) {
    // 어느 정도 아래로 스와이프했을 때만 닫기
    closeModal();
  }
};

// 마우스 이벤트
const onMouseDown = (event) => {
  startY.value = event.clientY;
};

const onMouseUp = (event) => {
  const diffY = event.clientY - startY.value;
  if (diffY > 50) {
    closeModal();
  }
};
</script>
