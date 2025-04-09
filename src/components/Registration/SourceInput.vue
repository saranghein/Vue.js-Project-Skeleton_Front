<template>
  <div class="row mb-4">
    <div class="col-10 col-md-6 mx-auto">
      <label for="source" class="form-label">⁎ 출처</label>
      <div class="input-group" :class="{ shake: error }">
        <input
          type="text"
          id="source"
          class="form-control no-default-icon"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
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
defineEmits(['update:modelValue']);
</script>
