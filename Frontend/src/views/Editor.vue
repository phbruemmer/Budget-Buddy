<template>
  <div
    class="workspace"
    ref="workspace"
    @mousedown="startDrag"
    @mouseup="stopDrag"
    @mouseleave="stopDrag"
    @mousemove="onDrag"
    @wheel.prevent="wheelZoom"
  >
    <div class="editor" ref="editor"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

const workspace = ref<HTMLElement | null>(null);
const editor = ref<HTMLElement | null>(null);

let isDragging = false;
let startX = 0;
let startY = 0;
let scrollLeft = 0;
let scrollTop = 0;
let zoom = 1;

const ZOOM_SPEED = 0.001;

const wheelZoom = (e: WheelEvent) => {
  if (!workspace.value || !editor.value) return;

  const rect = workspace.value.getBoundingClientRect();
  const mouseX = e.clientX - rect.left + workspace.value.scrollLeft;
  const mouseY = e.clientY - rect.top + workspace.value.scrollTop;

  const newZoom = Math.min(Math.max(zoom - e.deltaY * ZOOM_SPEED, 0.8), 5);
  const zoomFactor = newZoom / zoom;
  zoom = newZoom;

  workspace.value.scrollLeft = mouseX * zoomFactor - (e.clientX - rect.left);
  workspace.value.scrollTop = mouseY * zoomFactor - (e.clientY - rect.top);

  editor.value.style.transform = `scale(${zoom})`;
  editor.value.style.transformOrigin = "top left";
};

const startDrag = (e: MouseEvent) => {
  if (!workspace.value) return;
  isDragging = true;
  startX = e.clientX;
  startY = e.clientY;
  scrollLeft = workspace.value.scrollLeft;
  scrollTop = workspace.value.scrollTop;
  workspace.value.style.cursor = "grabbing";
};

const stopDrag = () => {
  isDragging = false;
  if (workspace.value) workspace.value.style.cursor = "default";
};

const onDrag = (e: MouseEvent) => {
  if (!isDragging || !workspace.value || !editor.value) return;

  const deltaX = e.clientX - startX;
  const deltaY = e.clientY - startY;

  let newScrollLeft = scrollLeft - deltaX;
  let newScrollTop = scrollTop - deltaY;

  const maxScrollLeft =
    editor.value.scrollWidth * zoom - workspace.value.clientWidth;
  const maxScrollTop =
    editor.value.scrollHeight * zoom - workspace.value.clientHeight;

  newScrollLeft = Math.max(0, Math.min(newScrollLeft, maxScrollLeft));
  newScrollTop = Math.max(0, Math.min(newScrollTop, maxScrollTop));

  workspace.value.scrollLeft = newScrollLeft;
  workspace.value.scrollTop = newScrollTop;
};

onMounted(() => {
  if (workspace.value && editor.value) {
    workspace.value.scrollLeft =
      (editor.value.scrollWidth - workspace.value.clientWidth) / 2;
    workspace.value.scrollTop =
      (editor.value.scrollHeight - workspace.value.clientHeight) / 2;
  }
});
</script>

<style scoped>
.workspace {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.editor {
  width: 400vw;
  height: 400vh;
  background: radial-gradient(circle, #666 1px, transparent 1px);
  background-size: 60px 60px;
}
</style>
