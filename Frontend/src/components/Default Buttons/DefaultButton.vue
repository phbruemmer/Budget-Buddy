<template>
  <button class="default-button" @click="$emit('button')"><slot></slot></button>
</template>

<script lang="ts" setup></script>

<style scoped>
.default-button {
  background-color: #006051;
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  padding: 12px 24px;
  border: none;
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
</style>
