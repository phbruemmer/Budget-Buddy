<template>
  <div class="editor"></div>

  <transition name="slide-up">
    <div class="tool-box">
      <button
        class="toggle-btn"
        @click="isOpen = !isOpen"
        :class="{ open: isOpen }"
      >
        <span v-if="!isOpen">Tools</span>
        <span v-else>Close</span>
      </button>
      <div class="tools">
        <p>Tool 1</p>
        <p>Tool 2</p>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const isOpen = ref(false);
</script>

<style scoped>
.editor {
  background: #fff;
  height: 100vh;
}

.toggle-btn {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 7rem;
  padding: 12px 16px;
  border-radius: 14px 14px 0 0;
  background: #006051;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.toggle-btn.open {
  bottom: 250px;
  background: #006051;
}

.tool-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 250px;
  background: #006051;
  color: white;
  border-radius: 18px 18px 0 0;
  box-shadow: 0 -4px 14px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.tools {
  padding: 20px;
  font-size: 1.1rem;
  animation: fadeIn 0.1s ease;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.slide-up-enter-to,
.slide-up-leave-from {
  transform: translateY(0);
  opacity: 1;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
