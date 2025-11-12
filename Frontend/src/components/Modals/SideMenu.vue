<template>
  <div class="menu-container" :class="{ 'fade-in-left': props.show }">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  show: boolean;
}>();
</script>

<style scoped>
.menu-container {
  position: fixed;
  top: 20vh;
  left: 0;
  background: #006051;
  width: 12vw;
  border-radius: 0 12px 12px 0;
  display: flex;
  padding: 28px;
  justify-content: left;
  flex-direction: column;
  gap: 24px;
  opacity: 0;
  transform: translateX(-100%);
  transition: all 0.3s ease;
}

.fade-in-left {
  opacity: 1;
  transform: translateX(0);
}
</style>
