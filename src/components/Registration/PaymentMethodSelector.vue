<script setup>
import { computed } from 'vue';
import { useOptionStore } from '@/stores/useOptionStore';

const props = defineProps({
  modelValue: Object,
  selectedType: String,
});
const emit = defineEmits(['update:modelValue']);

const store = useOptionStore();

const options = computed(() => {
  if (!props.selectedType) return []; // 선택 안 된 경우
  return store.paymentMethods.filter(
    (pay) => pay.type === props.selectedType || pay.type === 'both'
  );
});

const select = (value) => {
  emit('update:modelValue', value);
};

const selectedLabel = computed(() => props.modelValue?.name || '');
</script>

<template>
  <div class="row mb-4">
    <div class="col-10-md-6">
      <label class="form-label">거래수단</label>
      <div class="input-group">
        <input
          type="button"
          class="form-control"
          :value="selectedLabel || '거래수단 선택'"
          readonly
          data-bs-toggle="dropdown"
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
    </div>
  </div>
</template>
