<style scoped>
.inputWrapper {
  width: 100dvw;
}
</style>
<template>
  <div class="row mb-2 inputWrapper">
    <div class="col-10 col-md-6 mx-auto">
      <div class="mb-2">
        <label for="phone" class="form-label">⁎ 전화번호</label>
        <div class="input-group w-50" :class="{ shake: error }">
          <input
            type="tel"
            id="phone"
            class="form-control"
            :value="inputValue"
            @input="onInput"
            placeholder="전화번호를 입력하세요(숫자만 입력)"
          />
        </div>
        <small
          class="text-danger ms-1"
          :style="{ visibility: error ? 'visible' : 'hidden' }"
        >
          전화번호를 입력하세요.
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

const emit = defineEmits(['update:modelValue']);

const inputValue = ref(props.modelValue);

function onInput(event) {
  let digits = event.target.value.replace(/\D/g, '');

  // 2. 최대 숫자 길이를 11자로 제한 (01012345678)
  if (digits.length > 11) {
    event.target.value = inputValue.value;
    return;
  }

  // 3. 형식화: 010-1234-5678
  let formatted = '';
  if (digits.length <= 3) {
    formatted = digits;
  } else if (digits.length <= 7) {
    formatted = digits.replace(/(\d{3})(\d+)/, '$1-$2');
  } else {
    formatted = digits.replace(/(\d{3})(\d{4})(\d+)/, '$1-$2-$3');
  }

  inputValue.value = formatted;
  emit('update:modelValue', formatted);
}

// modelValue가 외부에서 변경될 때 inputValue 업데이트
watch(
  () => props.modelValue,
  (newValue) => {
    inputValue.value = newValue;
  }
);
</script>
