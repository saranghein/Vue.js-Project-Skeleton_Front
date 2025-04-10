<template>
  <div class="row mb-4">
    <div class="col-10 col-md-6 mx-auto">
      <label for="username" class="form-label">⁎ 이름</label>
      <div class="input-group w-50" :class="{ shake: error }">
        <input
          type="text"
          id="username"
          class="form-control no-default-icon"
          :value="inputValue"
          @input="onInput"
          placeholder="이름을 입력하세요(최대 5자)"
        />
      </div>
      <small
        class="text-danger ms-1"
        :style="{ visibility: error ? 'visible' : 'hidden' }"
      >
        이름을 입력해주세요
      </small>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: String,
  error: Boolean,
  placeholder: String,
});

const emit = defineEmits(['update:modelValue', 'update:error']);

const inputValue = ref(props.modelValue);

// 입력값 검증 함수
function validateInput(value) {
  const hasError = value.trim().length === 0 || value.length > 5; // 이름이 5자를 초과하면 에러
  emit('update:error', hasError); // 에러 상태를 부모 컴포넌트로 전달
}

// 입력 이벤트 처리
function onInput(event) {
  let value = event.target.value;

  // 최대 5자까지만 입력 허용
  if (value.length > 5) {
    value = value.slice(0, 5);
  }

  inputValue.value = value; // 잘라낸 값을 inputValue에 저장
  emit('update:modelValue', value); // 부모 컴포넌트로 전달

  // 입력값 유효성 검사
  validateInput(value);

  // 강제로 input 태그의 값을 업데이트
  event.target.value = value;
}

// modelValue가 외부에서 변경될 때 inputValue 업데이트
watch(
  () => props.modelValue,
  (newValue) => {
    inputValue.value = newValue;
    validateInput(newValue);
  }
);
</script>
