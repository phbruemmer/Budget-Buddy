<template>
  <transition name="fade">
    <div v-if="isVisible" class="modal">
      <h1 v-if="props.title">{{ props.title }}</h1>

      <div class="content">
        <p><slot></slot></p>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

const props = defineProps<{
  title?: string;
  show?: boolean;
  duration?: number;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const isVisible = ref<boolean>(false);

watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      isVisible.value = true;

      setTimeout(() => {
        isVisible.value = false;
        emit("close");
      }, props.duration ?? 3000);
    }
  }
);
</script>

<style scoped>
.modal {
  position: fixed;
  top: 2vh;
  left: 50%;
  transform: translateX(-50%);

  background: #fff;
  padding: 2vh 2vw;
  box-shadow: 0 4px 6px #00000051;
  border-radius: 12px;
  z-index: 999;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.modal h1 {
  font-size: 1.4rem;
}

.content {
  min-width: 300px;
  max-width: 450px;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -10px);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translate(-50%, 0);
}
</style>
