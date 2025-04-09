<template>
  <div class="row mb-4">
    <div class="col-10 col-md-6 mx-auto">
      <label for="amount" class="form-label">⁎ 금액</label>
      <div class="input-group" :class="{ shake: error }">
        <input
          type="text"
          id="amount"
          class="form-control no-default-icon"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          placeholder="금액 입력"
          style="text-align: right"
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
defineProps({
  modelValue: [String, Number],
  error: Boolean,
});
defineEmits(['update:modelValue']);
</script>
