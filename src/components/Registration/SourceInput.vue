<template>
  <div class="row mb-4">
    <div class="col-10-md-6">
      <label for="source" class="form-label">⁎ 출처</label>
      <div class="input-group" :class="{ shake: error }">
        <input
          type="text"
          id="source"
          class="form-control no-default-icon"
          :value="modelValue"
          @input="onInput"
          :placeholder="placeholder"
        />
      </div>
      <small
        class="text-danger ms-1"
        :style="{ visibility: error ? 'visible' : 'hidden' }"
      >
        출처를 입력해 주세요
      </small>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: String,
  error: Boolean,
  placeholder: String,
});
const emit = defineEmits(['update:modelValue']);
const onInput = (e) => {
  const value = e.target.value.slice(0, 30); // 30자 제한
  e.target.value = value;
  emit('update:modelValue', value);
};
</script>
