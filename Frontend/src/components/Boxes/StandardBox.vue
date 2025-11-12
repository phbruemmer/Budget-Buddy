<template>
  <div
    class="box-container"
    :style="{
      border: props.dotted ? `2px dotted ${props.color ?? '#000'}` : 'none',
      color: props.color ?? '#000',
      background: props.background ?? '#fff',
    }"
  >
    <h3 v-if="props.title" class="box-title">{{ props.title }}</h3>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  title?: string;
  dotted?: boolean;
  color?: string;
  background?: string;
}>();
</script>

<style scoped>
.box-container {
  width: 16vw;
  height: 16vh;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 6px 12px #00000032;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px;
  box-sizing: border-box;
}

.box-container:hover {
  transform: translateY(-4px);
  cursor: pointer;
}

.box-container:active {
  transform: translateY(1px);
}

.box-title {
  margin: 0;
  font-size: 1rem;
  text-align: center;
}
</style>
