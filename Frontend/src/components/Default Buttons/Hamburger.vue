<template>
  <div class="menu-btn" :class="{ open: isOpen }" @click="toggleMenu">
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const isOpen = ref(false);

const emit = defineEmits<{
  (e: "open"): void;
  (e: "close"): void;
}>();

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) emit("open");
  else emit("close");
};
</script>

<style scoped>
.menu-btn {
  width: 32px;
  height: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.menu-btn span {
  display: block;
  width: 100%;
  height: 3px;
  background: #000;
  filter: contrast(100%);
  border-radius: 5px;
  transition: all 0.3s ease;
}

.menu-btn.open span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.menu-btn.open span:nth-child(2) {
  opacity: 0;
}

.menu-btn.open span:nth-child(3) {
  transform: rotate(-45deg) translate(10px, -10px);
}
</style>
