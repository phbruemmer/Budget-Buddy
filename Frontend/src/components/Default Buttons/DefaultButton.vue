<template>
  <button
    class="default-button"
    :class="{
      'dotted-border': props.dotted,
    }"
    :style="{
      'border-color': color ? color : !props.dotted ? 'transparent' : '#000',
      color: color ? color : props.dotted ? '#000' : '#fff',
    }"
    @click="$emit('button')"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
const props = defineProps<{
  dotted?: boolean;
  color?: string;
}>();
</script>

<style scoped>
.default-button {
  background-color: #006051;
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  padding: 12px 24px;
  border: solid #006051 2px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.default-button:hover {
  background-color: #004c44;
  transform: translateY(-2px);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

.default-button:active {
  transform: translateY(1px);
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
}

.dotted-border {
  background: transparent;
  color: #000;
  border: dotted #000 2px;
}

.dotted-border:hover {
  background: #0000001a;
}
</style>
