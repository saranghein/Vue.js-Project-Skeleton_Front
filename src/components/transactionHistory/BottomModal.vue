<style scoped>
.overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 999;
}

.bottomModal {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;

	display: flex;
	flex-direction: column;
	align-items: center;

	border-radius: 16px 16px 0 0;
	background-color: white;
	z-index: 1000;

	transform: translateY(100%);
	transition: transform 0.3s ease-in-out;
}

.modalBar {
	width: 42px;
	height: 4px;

	margin: 16px 0;

	border-radius: 2px;
	cursor: pointer;
}

.bottomModal.active {
	transform: translateY(0);
}

.modalContent {
	display: flex;
	flex-direction: column;
	align-items: center;
}
.modalOption {
	width: 100%;
	padding: 16px 0;
	cursor: pointer;

	text-align: center;
	font-size: 16px;
}
</style>

<template>
	<div>
		<div class="overlay" v-if="isOpen" @click="closeModal"></div>
		<div
			:class="['bottomModal', { active: isOpen }]"
			@touchstart="onTouchStart"
			@touchend="onTouchEnd"
			@mousedown="onMouseDown"
			@mouseup="onMouseUp"
		>
			<div class="modalBar" :style="{ backgroundColor: COLORS.GRAY04 }"></div>
			<div class="modalContent">
				<div class="modalOption">수정하기</div>
				<div class="modalOption">삭제하기</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
import { COLORS } from "@/util/constants";

const props = defineProps({
	isOpen: {
		type: Boolean,
		default: true,
	},
});

const startY = ref(0);

const emit = defineEmits(["close"]);

const closeModal = () => {
	emit("close");
};

const onTouchStart = (event) => {
	startY.value = event.touches[0].clientY;
};

const onTouchEnd = (event) => {
	const modal = event.target.closest(".bottomModal");
	if (!modal) return; // 모달 요소가 아닌 경우 무시
	modal.style.transform = "translateY(100%)"; // 화면 아래로 이동
	setTimeout(() => closeModal(), 300); // 애니메이션 후 모달 닫기
};

// 마우스 이벤트
const onMouseDown = (event) => {
	startY.value = event.clientY;
};

const onMouseUp = (event) => {
	const modal = event.target.closest(".bottomModal");
	if (!modal) return; // 모달 요소가 아닌 경우 무시
	modal.style.transform = "translateY(100%)"; // 화면 아래로 이동
	setTimeout(() => closeModal(), 300); // 애니메이션 후 모달 닫기
};
</script>
