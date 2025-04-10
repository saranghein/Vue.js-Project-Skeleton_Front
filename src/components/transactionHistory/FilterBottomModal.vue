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
            @click="selectType(item.name, typeState, true)"
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

  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;

  background-color: rgba(0, 0, 0, 0.5);

  z-index: 999;
}

.bottomModal {
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;

  bottom: 0;
  padding: 0 36px 30px 36px;
  left: 0;
  right: 0;

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

  width: 100%;
}

.modalOption {
  text-align: left;

  width: 100%;
  padding: 16px 0;
  margin-top: 5px;

  font-size: 16px;
}

.modalBadge {
  display: flex;
  flex-wrap: wrap;

  gap: 10px;
  margin-bottom: 20px;
}
</style>

<script setup>
import { ref, reactive, computed, watch } from 'vue';
import { COLORS } from '@/util/constants';
import Badge from '../common/Badge.vue';
import Button from '../common/Button.vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: true,
  },
  type: String, //수입, 지출, 전체
});

const emit = defineEmits(['close']);

const typeState = reactive({
  types: [
    { name: '전체', type: 'both', selected: true },
    { name: '수입', type: 'income', selected: false },
    { name: '지출', type: 'expense', selected: false },
  ],
});

const categoryState = reactive({
  types: [
    { name: '전체', type: 'both', selected: true },
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
    { name: '최신순', type: 'both', selected: true },
    { name: '오래된 순', type: 'both', selected: false },
  ],
});

const previousType = ref(null);
const startY = ref(0);

const selectType = (selectedName, state, resetCategory = false) => {
  state.types.forEach((item) => {
    item.selected = item.name === selectedName;
  });

  if (state === typeState && resetCategory) {
    categoryState.types.forEach((cat) => {
      cat.selected = cat.name === '전체';
    });
  }
};

watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal && props.type) {
      const isTypeChanged = props.type !== previousType.value;

      // 이전 type과 다르면 카테고리 초기화도 수행
      selectType(props.type, typeState, isTypeChanged);

      // 현재 type을 저장해두기
      previousType.value = props.type;
    }
  }
);

//수입, 지출에 따라 카테고리 필터링
const filteredCategories = computed(() => {
  const selectedType = typeState.types.find((type) => type.selected);
  if (!selectedType || selectedType.type === 'both') return categoryState.types;
  return categoryState.types.filter(
    (cat) => (cat.type === selectedType.type) | (cat.type === 'both')
  );
});

// 선택된 필터 값 추출 함수
const getSelectedFilters = () => {
  const selectedType = typeState.types.find((type) => type.selected);
  const selectedCategory = categoryState.types.find((cat) => cat.selected);
  const selectedDate = dateState.types.find((date) => date.selected);

  return {
    type: selectedType ? selectedType.name : null,
    category: selectedCategory ? selectedCategory.name : null,
    date: selectedDate ? selectedDate.name : null,
  };
};

const closeModal = () => {
  emit('close', getSelectedFilters());
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
