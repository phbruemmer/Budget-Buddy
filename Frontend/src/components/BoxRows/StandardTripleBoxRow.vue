<template>
  <h2>{{ props.title }}</h2>
  <div class="row-container">
    <slot name="box-1"></slot>
    <slot name="box-2"></slot>
    <slot name="box-3"></slot>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  title?: string;
}>();
</script>

<style scoped>
.row-container {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 1.5rem;
  padding: 1.5rem;
  overflow: visible;
  transition: all 0.3s ease;
}

h2 {
  color: #00000092;
}

::v-deep(h3) {
  color: #0060518d;
}

::v-deep(.box) {
  flex: 1;
  background: white;
  border-radius: 0.75rem;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

::v-deep(.box:hover) {
  cursor: pointer;
}
</style>
