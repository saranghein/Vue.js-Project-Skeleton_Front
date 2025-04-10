<template>
  <div class="calendar-overlay" @click.self="$emit('close')">
    <div class="calendar-modal">
      <button class="close-btn" @click="$emit('close')">✕</button>
      <h2 class="modal-title">가계부 달력</h2>

      <!-- 달력 (단일 날짜 모드) -->
      <div class="calendar-wrapper">
        <VCalendar
          v-model="calendarModel"
          :attributes="attributes"
          :locale="customLocale"
          mode="single"
          @dayclick="onDayClick"
        />
      </div>
      <!-- 선택된 날짜의 거래 내역 표시 -->
      <div v-if="filteredEvents.length > 0" class="event-list">
        <h3>{{ displayDate }} 내역</h3>
        <ul>
          <li v-for="(event, i) in filteredEvents" :key="i">
            💸 {{ event.amount.toLocaleString() }}원 - {{ event.memo }}
          </li>
        </ul>
      </div>
      <div v-else class="event-list empty">
        <p>해당 날짜의 내역이 없습니다.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Calendar as VCalendar } from 'v-calendar';

const props = defineProps({
  budget: {
    type: Array,
    default: () => [],
  },
});

// (1) 달력에 연결할 값
const calendarModel = ref(new Date());

// (2) 실제로 선택된 날짜
const selectedDate = ref(new Date());

const customLocale = {
  id: 'custom-locale',
  firstDayOfWeek: 0,
  masks: {
    title: 'YYYY년 M월', // → 2025년 4월
  },
};
// (3) 날짜 클릭 이벤트
function onDayClick({ date }) {
  if (!date) {
    selectedDate.value = null;
    return;
  }
  if (date.start) {
    // range 객체 형태면 start만 사용
    selectedDate.value = date.start;
  } else {
    selectedDate.value = date;
  }
}

// (4) 화면 표시용 (locale기반)
const displayDate = computed(() => {
  const val = selectedDate.value;
  if (!val) return '';
  return val instanceof Date
    ? val.toLocaleDateString()
    : new Date(val).toLocaleDateString();
});

// (5) 'YYYY-MM-DD' 포맷팅
function formatDateToYMD(date) {
  const d = new Date(date);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${dd}`;
}

// (6) 해당 날짜 예산 필터
const filteredEvents = computed(() => {
  if (!selectedDate.value || !(selectedDate.value instanceof Date)) {
    return [];
  }
  const selectedStr = formatDateToYMD(selectedDate.value);

  return props.budget.filter((item) => {
    return formatDateToYMD(item.date) === selectedStr;
  });
});

// (7) 달력에 표시할 attributes
//     예: 예산 있는 날짜는 연한 초록 배경, 선택된 날짜는 진한 초록 배경
const attributes = computed(() => {
  const budgetAttrs = props.budget.map((item) => ({
    key: `budget-${item.id}`,
    dates: new Date(item.date),
    customStyles: {
      backgroundColor: '#ecfdf5',
      borderRadius: '8px',
    },
    dot: {
      color: '#2eccaa',
      style: {
        backgroundColor: '#2eccaa',
        borderRadius: '50%',
        width: '4px',
        height: '4px',
        transform: 'translateY(-5px)',
        boxShadow: '0 0 0 1px white',
      },
    },
    popover: {
      label: `${item.memo} - ${item.amount.toLocaleString()}원`,
    },
  }));

  let selectedAttr = null;
  if (selectedDate.value) {
    selectedAttr = {
      key: 'selected',
      dates: selectedDate.value,
      customStyles: {
        backgroundColor: '#55efc4',
        borderRadius: '8px',
        color: '#ffffff',
      },
    };
  }

  return selectedAttr ? [...budgetAttrs, selectedAttr] : budgetAttrs;
});
</script>

<style scoped>
/* 오버레이, 모달 스타일 */
.calendar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
}

.calendar-wrapper {
  display: flex;
  justify-content: center;
}

.calendar-modal {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  width: 90%;
  max-width: 500px;
  position: relative;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.close-btn {
  position: absolute;
  top: 12px;
  right: 16px;
  font-size: 18px;
  background: none;
  border: none;
  cursor: pointer;
}

.modal-title {
  margin-bottom: 16px;
  text-align: center;
  font-size: 20px;
  color: #2eccaa;
}

/* 거래 내역 목록 */
.event-list {
  margin-top: 24px;
  background: #e8fdf6;
  padding: 16px;
  border-radius: 16px;
  font-size: 14px;
  color: #2d3436;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.event-list h3 {
  margin-bottom: 12px;
  font-size: 16px;
  color: #00796b;
  font-weight: 600;
}

.event-list ul {
  padding-left: 0;
  margin: 0;
  list-style: none;
}

.event-list li {
  background: #ffffff;
  border-radius: 12px;
  padding: 10px 14px;
  margin-bottom: 8px;
  border-left: 5px solid #55efc4;
  font-size: 15px;
  color: #2d3436;
}

.event-list.empty {
  text-align: center;
  color: #b2bec3;
  font-style: italic;
  background: none;
  box-shadow: none;
  padding: 0;
  margin-top: 20px;
}

/* ============================= */
/* ↓↓↓ 핵심: “.vc-day-content.vc-focus” 오버라이드 ↓↓↓ */
/* ============================= */

/* 1) 포커스(파란테두리) → 둥근 사각형 테두리로 변경 */
:deep(.vc-day-content[tabindex='0']) {
  /*background-color: #55efc4 !important;*/
  border-radius: 8px !important;
  /*color: white !important;*/
  font-weight: bold;
  outline: none !important;
  box-shadow: inset 0 0 0 2px #2eccaa !important;
}

/* ✅ 마우스를 올렸을 때 살짝 어두운 초록 계열 배경 */
:deep(.vc-day-content:hover) {
  background-color: #b2f2dc !important;
  border-radius: 8px !important;
  cursor: pointer;
}

:deep(.vc-weekday) {
  color: #2eccaa !important;
  font-weight: 600;
  font-size: 13px;
}

/* ✅ 네비게이션 타이틀 (예: "4월 2025") */
:deep(.vc-title) {
  color: #2eccaa !important;
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 0.5px;
  background-color: #e0faf3;
  border-radius: 8px;
  padding: 4px 12px;
}

/* ✅ 좌우 화살표 버튼 (< >) */
:deep(.vc-base-icon) {
  stroke: #2eccaa !important; /* 테마 색상으로 선 색상 변경 */
  background-color: #e0faf3 !important; /* 배경색 부여 */
  border-radius: 6px !important;
  padding: 4px;
  width: 32px;
  height: 32px;
  box-shadow: none !important;
  border: none !important;
  outline: none !important;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
}

:deep(.vc-base-icon:hover) {
  transform: scale(1.1);
  background-color: #c1f0e5 !important;
}

:deep(.vc-day-popover-row-indicator .vc-dot) {
  background-color: #2eccaa !important;
}

:deep(.vc-nav-item) {
  background-color: #e0faf3 !important;
}

:deep(.vc-nav-item:hover) {
  background-color: #c1f0e5 !important;
}

:deep(.vc-nav-title) {
  background-color: #e0faf3;
}

:deep(.vc-nav-title:hover) {
  background-color: #c1f0e5;
}
:deep(.vc-blue.vc-light) {
  --vc-accent-50: #e0faf3;
  --vc-accent-100: #c1f0e5;
  --vc-accent-200: #a3e2d2;
  --vc-accent-300: #75d3be;
  --vc-accent-400: #55c9af;
  --vc-accent-500: #2dbd9e; /* 메인 강조색 */
  --vc-accent-600: #24a78c;
  --vc-accent-700: #1c927b;
  --vc-accent-800: #157d69;
  --vc-accent-900: #0e6858;

  --vc-bg: #ffffff;
  --vc-text: #222;
  --vc-border: #cceee5;
}
:deep(.is-active) {
  color: #1c927b;
}
:deep(.is-current) {
  color: black;
}
:deep(.vc-focus:focus) {
  outline: none !important;
  box-shadow: none !important;
}
</style>
