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
      <section class="modalContent">
        <div class="modalOption">거래 유형</div>
        <div class="modalBadge">
          <badge
            v-for="item in typeState.types"
            :key="item.name"
            :name="item.name"
            :color="item.selected ? 'WHITE' : 'GRAY02'"
            :bgColor="item.selected ? 'GRAY03' : 'GREEN01'"
            @click="selectType(item.name, typeState)"
          />
        </div>
        <div class="modalOption">카테고리</div>
        <div class="modalBadge">
          <badge
            v-for="item in filteredCategories"
            :key="item.name"
            :name="item.name"
            :color="item.selected ? 'WHITE' : 'GRAY02'"
            :bgColor="item.selected ? 'GRAY03' : 'GREEN01'"
            @click="selectType(item.name, categoryState)"
          />
        </div>
        <div class="modalOption cursor">거래 내역 정렬</div>
        <div class="modalBadge">
          <badge
            v-for="item in dateState.types"
            :key="item.name"
            :name="item.name"
            :color="item.selected ? 'WHITE' : 'GRAY02'"
            :bgColor="item.selected ? 'GRAY03' : 'GREEN01'"
            @click="selectType(item.name, dateState)"
          />
        </div>
      </section>
      <Button :name="'확인'" :bgColor="'GREEN01'" @click="closeModal" />
    </div>
  </div>
</template>

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
  padding: 0 36px 30px 36px;
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
  width: 100%;
  display: flex;
  flex-direction: column;
}

.modalOption {
  width: 100%;
  padding: 16px 0;
  margin-top: 5px;
  text-align: left;
  font-size: 16px;
}

.modalBadge {
  gap: 10px;
  margin-bottom: 20px;

  display: flex;
  flex-wrap: wrap;
}
</style>

<script setup>
import { ref, reactive, computed } from 'vue';
import { COLORS } from '@/util/constants';
import Badge from '../common/Badge.vue';
import Button from '../common/Button.vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: true,
  },
});

const typeState = reactive({
  types: [
    { name: '전체', type: 'both', selected: false },
    { name: '수입', type: 'income', selected: false },
    { name: '지출', type: 'expense', selected: false },
  ],
});

const categoryState = reactive({
  types: [
    { name: '월급', type: 'income', selected: false },
    { name: '용돈', type: 'income', selected: false },
    { name: '식비', type: 'expense', selected: false },
    { name: '쇼핑', type: 'expense', selected: false },
    { name: '커피', type: 'expense', selected: false },
    { name: '문화생활', type: 'expense', selected: false },
    { name: '교통', type: 'expense', selected: false },
    { name: '기타', type: 'both', selected: false },
  ],
});

const dateState = reactive({
  types: [
    { name: '최신순', type: 'both', selected: false },
    { name: '오래된 순', type: 'both', selected: false },
  ],
});

const selectType = (selectedName, state) => {
  state.types.forEach((type) => {
    type.selected = type.name === selectedName;
  });
};

const startY = ref(0);
const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};

//수입, 지출에 따라 카테고리 필터링
const filteredCategories = computed(() => {
  const selectedType = typeState.types.find((type) => type.selected);
  if (!selectedType || selectedType.type === 'both') return categoryState.types;
  return categoryState.types.filter(
    (cat) => (cat.type === selectedType.type) | (cat.type === 'both')
  );
});

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
