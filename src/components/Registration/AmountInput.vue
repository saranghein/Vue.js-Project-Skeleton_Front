<template>
  <div class="row mb-4">
    <div class="col-10 col-md-6 mx-auto">
      <label for="amount" class="form-label">⁎ 금액</label>
      <div class="input-group" :class="{ shake: error }">
        <input
          type="text"
          inputmode="numeric"
          pattern="[0-9]*"
          id="amount"
          class="form-control no-default-icon text-end"
          :value="displayValue"
          @input="onInput"
          @keypress="onKeyPress"
          placeholder="금액 입력"
        />
        <span class="my-2 ms-2">원</span>
      </div>
      <small
        class="text-danger ms-1"
        :style="{ visibility: error ? 'visible' : 'hidden' }"
      >
        금액을 입력해 주세요
      </small>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: [Number, String],
  error: Boolean,
});

const emit = defineEmits(['update:modelValue']);

const displayValue = ref('');
const onKeyPress = (e) => {
  const charCode = e.charCode;
  // 숫자(0~9) 이외 입력 방지
  if (charCode < 48 || charCode > 57) {
    e.preventDefault();
  }
};
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal === null || newVal === undefined || newVal === '') {
      displayValue.value = '';
    } else {
      const numeric = parseInt(newVal);
      displayValue.value = isNaN(numeric) ? '' : numeric.toLocaleString();
    }
  },
  { immediate: true }
);

const onInput = (e) => {
  let raw = e.target.value.replace(/[^0-9]/g, ''); // 숫자만
  if (raw.length > 20) {
    raw = raw.slice(0, 20);
  }
  const number = parseInt(raw);
  //HTML input 자체도 실시간 업데이트 (즉시 반영)
  e.target.value = raw === '' ? '' : parseInt(raw).toLocaleString();
  // 내부 값 업데이트
  emit('update:modelValue', isNaN(number) ? '' : number);

  // 보여지는 값 동기화 (콤마 포함)
  displayValue.value = e.target.value;

  // displayValue.value = raw === '' ? '' : parseInt(raw).toLocaleString();
};
</script>
