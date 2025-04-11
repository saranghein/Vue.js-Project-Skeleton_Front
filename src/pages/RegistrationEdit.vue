<script setup>
import { ref, onMounted, computed, watchEffect, watch } from 'vue';
import { useOptionStore } from '@/stores/useOptionStore';
import { RegisterService } from '@/api/RegisterService';
import { useRoute, useRouter } from 'vue-router';

// 컴포넌트
import RegistrationButton from '@/components/Registration/RegistrationButton.vue';
import CategorySelector from '@/components/Registration/CategorySelector.vue';
import PaymentMethodSelector from '@/components/Registration/PaymentMethodSelector.vue';
import Button from '@/components/common/Button.vue';
import ApiService from '@/util/apiService';
import DateInput from '@/components/Registration/DateInput.vue';
import TimeInput from '@/components/Registration/TimeInput.vue';
import AmountInput from '@/components/Registration/AmountInput.vue';
import SourceInput from '@/components/Registration/SourceInput.vue';
import MemoInput from '@/components/Registration/MemoInput.vue';
import ModalMessage from '@/components/Registration/ModalMessage.vue';

// Props
const props = defineProps({
  isModal: Boolean,
  editData: Object,
});
const emit = defineEmits(['close']);

// 상태 변수
const selectedDate = ref('');
const selectedTime = ref('');
const inputAmount = ref('');
const memo = ref('');
const depositor = ref('');
const selectedType = ref('income');
const selectedCategory = ref(null);
const selectedPaymentMethod = ref(null);
const isLoading = ref(false);
const errors = ref({
  date: false,
  time: false,
  amount: false,
  category: false,
  depositor: false,
});

// 스토어 및 라우팅
const store = useOptionStore();
const route = useRoute();
const router = useRouter();

// 모달 메시지 상태
const modalVisible = ref(false);
const modalMessage = ref('');
const navigateAfterModal = ref(false);

// 모달 메시지 처리
const showModal = (message, goHome = false) => {
  modalMessage.value = message;
  navigateAfterModal.value = goHome;
  modalVisible.value = true;
};
const handleModalConfirm = () => {
  modalVisible.value = false;
  if (props.isModal) {
    emit('close');
  } else if (navigateAfterModal.value) {
    router.push('/transaction-history');
  } else {
    router.push('/');
  }
};
const handleModalCancel = () => {
  modalVisible.value = false;
};

// 타입 변경 핸들러
const onTypeChange = (type) => {
  selectedType.value = type;
};
watch(selectedType, () => {
  if (!isLoading.value) {
    isLoading.value = true;
    return;
  }
  selectedCategory.value = null;
  selectedPaymentMethod.value = null;
});

// 출처 placeholder
const getDepositorPlaceholder = computed(() => {
  if (selectedType.value === 'income') return '수입의 출처를 입력하세요';
  if (selectedType.value === 'expense') return '사용처를 입력하세요';
  return '';
});

// 등록 처리
const handleSubmit = async () => {
  const newErrors = {
    date: !selectedDate.value,
    time: !selectedTime.value,
    amount: !inputAmount.value,
    category: !selectedCategory.value || !selectedCategory.value.name,
    depositor: !depositor.value,
  };
  errors.value = newErrors;
  if (Object.values(newErrors).some(Boolean)) return;

  const payload = {
    user_id: 'test_user',
    date: selectedDate.value,
    time: selectedTime.value,
    amount: Number(inputAmount.value),
    category: selectedCategory.value?.name,
    source: depositor.value,
    paymentMethod: selectedPaymentMethod.value?.name || '',
    memo: memo.value,
    flow_type: selectedType.value === 'income' ? '수입' : '지출',
  };

  try {
    const id = props.isModal ? props.editData?.id : route.params.id;
    const response = await RegisterService.update(id, payload);
    if (response.status >= 200 && response.status < 300) {
      showModal('수정 완료!', true);
    } else {
      showModal('수정 실패!', true);
    }
  } catch (error) {
    showModal('요청 중 문제가 발생했습니다.', true);
  } finally {
    resetForm();
  }
};

// 취소
const handleCancel = () => {
  showModal('수정한 내용이 사라집니다.', true);
};

// 모달일 때: editData로 초기화
watchEffect(() => {
  if (props.isModal && props.editData) {
    const data = props.editData;
    selectedDate.value = data.date;
    selectedTime.value = data.time;
    inputAmount.value = data.amount;
    memo.value = data.memo;
    depositor.value = data.source;
    selectedType.value = data.flow_type === '수입' ? 'income' : 'expense';
    selectedCategory.value = store.categories.find(
      (cat) => cat.name === data.category
    );
    selectedPaymentMethod.value = store.paymentMethods.find(
      (pay) => pay.name === data.payment
    );
  }
});

// 페이지 방식일 경우만 데이터 로딩
const loadData = async () => {
  const id = route.params.id;
  try {
    const { data } = await ApiService.get('money', id);
    if (!data) throw new Error('존재하지 않는 거래입니다.');
    selectedDate.value = data.date;
    selectedTime.value = data.time;
    inputAmount.value = data.amount;
    memo.value = data.memo;
    depositor.value = data.source;
    selectedType.value = data.flow_type === '수입' ? 'income' : 'expense';
    selectedCategory.value = store.categories.find(
      (cat) => cat.name === data.category
    );
    selectedPaymentMethod.value = store.paymentMethods.find(
      (pay) => pay.name === data.payment
    );
  } catch (error) {
    showModal('존재하지 않는 거래입니다.', true);
  }
  isLoading.value = false;
};

const resetForm = () => {
  selectedDate.value = '';
  selectedTime.value = '';
  inputAmount.value = '';
  depositor.value = '';
  paymentMethod.value = '';
  memo.value = '';
  selectedType.value = '';
  errors.value = {
    date: false,
    time: false,
    amount: false,
    category: false,
    depositor: false,
  };
};

onMounted(() => {
  store.fetchOptions();
  if (!props.isModal) loadData();
});
</script>

<template>
  <div class="modal-overlay" @click.self="emit('close')">
    <div class="modal-container">
      <div class="scroll-padding-wrapper">
        <div class="modal-scroll-wrapper">
          <!-- 헤더 -->
          <div class="row mt-4">
            <div class="col-10-md-6 mx-auto">
              <div class="row align-items-center">
                <div class="col-auto pointer" @click="handleCancel">
                  <i class="fa-solid fa-chevron-left"></i>
                </div>
                <div class="col text-center">
                  <span class="registry-title">거래 수정</span>
                </div>
                <div class="col-auto pointer" style="visibility: hidden">
                  <i class="fa-solid fa-chevron-left"></i>
                </div>
              </div>
            </div>
          </div>

          <!-- 입력폼 -->
          <div class="row mt-5">
            <div class="col-10-md-6 mb-5">
              <div class="d-flex justify-content-center gap-2 flex-wrap">
                <RegistrationButton
                  bgColor="GRAY01"
                  label="수입"
                  :is-active="selectedType === 'income'"
                  @click="onTypeChange('income')"
                />
                <RegistrationButton
                  bgColor="GRAY01"
                  label="지출"
                  :is-active="selectedType === 'expense'"
                  @click="onTypeChange('expense')"
                />
              </div>
            </div>

            <DateInput v-model="selectedDate" :error="errors.date" />
            <TimeInput v-model="selectedTime" :error="errors.time" />
            <AmountInput v-model="inputAmount" :error="errors.amount" />
            <CategorySelector
              v-model="selectedCategory"
              :selected-type="selectedType"
              :error="errors.category"
            />
            <SourceInput
              v-model="depositor"
              :error="errors.depositor"
              :placeholder="getDepositorPlaceholder"
            />
            <PaymentMethodSelector
              v-model="selectedPaymentMethod"
              :selected-type="selectedType"
            />
            <MemoInput v-model="memo" />

            <!-- 버튼 -->
            <div class="row mb-2 mt-3">
              <div class="col-10-md-6 mx-auto">
                <Button
                  type="button"
                  name="수정"
                  bgColor="GREEN02"
                  color="BLACK"
                  :click-handler="handleSubmit"
                  style="font-size: 20px"
                />
              </div>
            </div>

            <div class="row mb-4">
              <div class="col-10-md-6 mx-auto">
                <Button
                  type="button"
                  name="취소"
                  color="WHITE"
                  bgColor="GRAY01"
                  :click-handler="handleCancel"
                  style="font-size: 20px"
                />
              </div>
            </div>
          </div>

          <!-- 모달 메시지 -->
          <ModalMessage
            :visible="modalVisible"
            :message="modalMessage"
            @confirm="handleModalConfirm"
            @cancel="handleModalCancel"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  padding: 20px;
}

.modal-container {
  background: white;
  border-radius: 16px;
  padding: 40px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.registry-title {
  font-size: 20px;
  margin: 0 auto;
}
/* ✅ 여백만 담당하는 껍데기 */
.scroll-padding-wrapper {
  flex: 1;
  padding: 8px 0;
  box-sizing: border-box;
  overflow: hidden; /* 스크롤바가 radius 영역 넘어가지 않도록 잘라줌 */
}

/* ✅ 진짜 스크롤 되는 영역 */
.modal-scroll-wrapper {
  padding: 8px 80px;
  height: 100%;
  overflow-y: auto;
}
.modal-scroll-wrapper::-webkit-scrollbar-track {
  background: transparent; /* ✅ 비활성화 영역 투명하게 */
}
</style>
