<template>
  <div class="row mb-4">
    <div class="col-10 col-md-6 mx-auto">
      <div class="input-group w-50" :class="{ shake: error }">
        <input
          type="time"
          id="time"
          class="form-control"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
        />
      </div>
      <small
        class="text-danger ms-1"
        :style="{ visibility: error ? 'visible' : 'hidden' }"
      >
        시간을 선택해 주세요
      </small>
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
