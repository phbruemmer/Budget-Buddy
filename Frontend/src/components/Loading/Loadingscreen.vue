<template>
  <Transition name="fade">
    <div v-if="props.load" class="screen-container">
      <div class="loader">
        <div class="spinner"></div>
        <p class="loading-text">Loading...</p>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { onMounted, watch } from "vue";

const props = defineProps<{
  load?: boolean;
  duration?: number;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

watch(
  () => props.load,
  (newValue) => {
    if (newValue) {
      setTimeout(() => {
        emit("close");
      }, props.duration ?? 1500);
    }
  }
);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.screen-container {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(20, 20, 20, 0.65);
  backdrop-filter: blur(6px);
  z-index: 9999;
}

.loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  color: #fff;
  animation: fadeIn 0.6s ease;
}

.spinner {
  width: 60px;
  height: 60px;
  border: 2px solid #ffffff58;
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-text {
  font-size: 1rem;
  letter-spacing: 1px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
