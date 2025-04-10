<template>
  <div class="row mb-2">
    <div class="col-10 col-md-6 mx-auto">
      <div class="mb-0">
        <label for="date" class="form-label">⁎ 날짜 및 시간</label>
        <div class="input-group w-50" :class="{ shake: error }">
          <input
            type="date"
            id="date"
            class="form-control"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
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
defineProps({
  modelValue: String,
  error: Boolean,
});
defineEmits(['update:modelValue']);
</script>
