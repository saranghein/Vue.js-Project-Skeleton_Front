<template>
  <div class="row mb-2">
    <div class="col-10 col-md-6 mx-auto">
      <div class="mb-2">
        <label for="email" class="form-label">⁎ 이메일 주소</label>
        <div class="input-group w-50" :class="{ shake: error }">
          <input
            type="email"
            id="email"
            class="form-control"
            :value="modelValue"
            @input="onInput"
          />
        </div>
        <small
          class="text-danger ms-1"
          :style="{ visibility: error ? 'visible' : 'hidden' }"
        >
          이메일 주소를 입력하세요
        </small>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: String,
  error: Boolean,
});
defineEmits(['update:modelValue']);

function isValidEmail(value) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 간단한 이메일 형식 검증
  return emailRegex.test(value);
}

// 이메일 형식 검증
function onInput(event) {
  const value = event.target.value;
  const isValid = isValidEmail(value);

  // 부모 컴포넌트로 값과 에러 상태 전달
  $emit('update:modelValue', value);
  $emit('update:error', !isValid);
}
</script>

<!-- 부모에서 -->
<!-- <EmailInput
v-model="email"
:error="emailError"
@update:error="emailError = $event"
/> -->
