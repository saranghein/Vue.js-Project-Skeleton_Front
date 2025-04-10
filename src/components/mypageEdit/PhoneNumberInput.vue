<template>
  <div class="row mb-2">
    <div class="col-10 col-md-6 mx-auto">
      <div class="mb-2">
        <label for="phone" class="form-label">⁎ 전화번호</label>
        <div class="input-group w-50" :class="{ shake: error }">
          <input
            type="tel"
            id="phone"
            class="form-control"
            :value="modelValue"
            @input="onInput"
            placeholder="010-0000-0000"
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
defineProps({
  modelValue: String,
  error: Boolean,
});
defineEmits(['update:modelValue']);
function onInput(event) {
  const value = event.target.value.replace(/[^0-9-]/g, ''); // 숫자와 '-'만 허용
  $emit('update:modelValue', value);
}
</script>
