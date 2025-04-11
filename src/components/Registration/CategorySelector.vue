<script setup>
import { computed } from 'vue';
import { useOptionStore } from '@/stores/useOptionStore';

const props = defineProps({
  modelValue: Object,
  selectedType: String, // 'income' or 'expense'
  error: Boolean,
});
const emit = defineEmits(['update:modelValue']);

const store = useOptionStore();

const options = computed(() => {
  if (!props.selectedType) return []; // 선택 안 된 경우
  return store.categories.filter(
    (cat) => cat.type === props.selectedType || cat.type === 'both'
  );
});

const select = (value) => {
  emit('update:modelValue', value);
};

const selectedLabel = computed(() => props.modelValue?.name || '');

// const selectedLabel = computed(() => {
//   const match = options.value.find((opt) => opt.id === props.modelValue);
//   return match ? match.name : '';
// });
</script>

<template>
  <div class="row mb-4">
    <div class="col-10-md-6">
      <label class="form-label">⁎ 카테고리</label>
      <div class="input-group">
        <input
          type="button"
          class="form-control"
          :value="selectedLabel || '카테고리 선택'"
          readonly
          data-bs-toggle="dropdown"
          :class="{ shake: error }"
          style="text-align: left"
        />
        <button
          type="button"
          class="btn btn-outline-secondary"
          data-bs-toggle="dropdown"
        >
          <i class="fa-solid fa-chevron-down"></i>
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li v-for="option in options" :key="option.id">
            <span class="dropdown-item" @click.prevent="select(option)">
              {{ option.name }}
            </span>
          </li>
        </ul>
      </div>
      <small v-if="error" class="text-danger ms-1"
        >카테고리를 선택해 주세요</small
      >
      <small v-else class="text-danger ms-1" style="visibility: hidden"></small>
    </div>
  </div>
</template>
