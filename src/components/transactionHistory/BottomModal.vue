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

	border-radius: 16px 16px 0 0;
	background-color: white;
	z-index: 1000;

	transform: translateY(100%);
	transition: transform 0.3s ease-in-out;
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
		<div :class="['bottomModal', { active: isOpen }]">
			<div class="modalContent">
				<div class="modalOption">수정하기</div>
				<div class="modalOption">삭제하기</div>
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	isOpen: {
		type: Boolean,
		default: true,
	},
});

const emit = defineEmits(["close"]);

const closeModal = () => {
	isOpen = false;
	emit("close");
};
</script>
