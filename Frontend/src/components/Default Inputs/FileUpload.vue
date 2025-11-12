<template>
  <div class="upload-container">
    <input
      id="file-upload"
      type="file"
      class="hidden-input"
      :accept="props.accept"
      @change="onFileChange"
    />
    <label for="file-upload" class="upload-label">
      <div class="upload-content">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="upload-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12"
          />
        </svg>
        <span>{{ fileName || props.placeholder || "Choose a file" }}</span>
      </div>
    </label>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const props = defineProps<{
  placeholder?: string;
  accept?: string;
}>();

const fileName = ref<string>("");

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  fileName.value = file ? file.name : "";
}
</script>

<style scoped>
.upload-container {
  display: flex;
  justify-content: center;
  margin: 20px auto;
}

.hidden-input {
  display: none;
}

.upload-label {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 320px;
  padding: 14px 16px;
  border: 2px dashed #ccc;
  border-radius: 12px;
  cursor: pointer;
  color: #555;
  font-size: 16px;
  background: #fafafa;
  transition: all 0.25s ease;
}

.upload-label:hover {
  border-color: #006051;
  background-color: #f0fdfa;
  color: #006051;
  box-shadow: 0 3px 10px rgba(0, 96, 81, 0.1);
}

.upload-icon {
  width: 22px;
  height: 22px;
  color: inherit;
}

.upload-content {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
