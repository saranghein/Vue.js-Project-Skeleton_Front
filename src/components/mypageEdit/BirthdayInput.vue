<template>
  <div class="row mb-2">
    <div class="col-10 col-md-6 mx-auto">
      <div class="mb-2">
        <label for="date" class="form-label">⁎ 생년월일</label>
        <div class="input-group w-50" :class="{ shake: error }">
          <input
            type="date"
            id="date"
            class="form-control"
            :value="modelValue"
            @input="onInput"
          />
        </div>
        <small
          class="text-danger ms-1"
          :style="{ visibility: error ? 'visible' : 'hidden' }"
        >
          날짜를 선택해 주세요
        </small>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch } from 'vue';

const props = defineProps({
  modelValue: String,
  error: Boolean,
});

const emit = defineEmits(['update:modelValue', 'update:error']);

// 입력 이벤트 처리
function onInput(event) {
  const value = event.target.value;

  // 부모 컴포넌트로 선택된 값 전달
  emit('update:modelValue', value);

  // 에러 상태 업데이트
  validateInput(value);
}

// 입력값 검증 함수
function validateInput(value) {
  const hasError = !value; // 값이 비어 있으면 에러
  emit('update:error', hasError); // 에러 상태를 부모 컴포넌트로 전달
}

// modelValue가 외부에서 변경될 때 에러 상태 업데이트
watch(
  () => props.modelValue,
  (newValue) => {
    validateInput(newValue);
  }
);
</script>
