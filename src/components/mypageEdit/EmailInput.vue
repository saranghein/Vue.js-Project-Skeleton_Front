<template>
  <div class="row mb-2">
    <div class="col-10 col-md-6 mx-auto">
      <div class="mb-2">
        <label for="email" class="form-label">⁎ 이메일 주소</label>
        <div class="input-group w-100" :class="{ shake: error }">
          <input
            type="email"
            id="email"
            class="form-control"
            :value="inputValue"
            @input="onInput"
            placeholder="example@email.com"
          />
        </div>
        <small
          class="text-danger ms-1"
          :style="{ visibility: error ? 'visible' : 'hidden' }"
        >
          올바른 이메일 주소를 입력하세요
        </small>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: String,
  error: Boolean,
});

const emit = defineEmits(['update:modelValue', 'update:error']);

const inputValue = ref(props.modelValue);

// 이메일 형식 검증 함수
function validateInput(value) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 간단한 이메일 형식 검증
  const hasError = !emailRegex.test(value);

  // 부모 컴포넌트에 에러 상태 전달
  emit('update:error', hasError);
}

// 이메일 형식 검증
function onInput(event) {
  const value = event.target.value;

  inputValue.value = value;
  emit('update:modelValue', value);

  // 입력값 유효성 검사
  validateInput(value);
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

<!-- 부모에서 -->
<!-- <EmailInput
v-model="email"
:error="emailError"
@update:error="emailError = $event"
/> -->
