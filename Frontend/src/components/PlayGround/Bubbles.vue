<template>
  <div class="bubble-container">
    <div
      class="bubble"
      v-for="bubble in bubbles"
      :style="{
        top: bubble.vertical + '%',
        left: bubble.horizontal + '%',
        height: bubble.size + 'rem',
        width: bubble.size + 'rem',
      }"
      @click="decrease_size(bubble)"
      v-show="bubble.visible"
    >
      <p>{{ bubble.lives }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import pop_sound from "../../assets/sounds/drop_sound.mp3";
import pop_sound_small from "../../assets/sounds/drop_sound_small.mp3";

import { std_api_request } from "../../utils/api";

const popSound = new Audio(pop_sound);
const popSoundSmall = new Audio(pop_sound_small);

interface Bubble {
  visible: boolean;
  size: number;
  vertical: number;
  horizontal: number;
  lives: number;
}

const initial_bubbleCount = 10;
const bubbleCount = ref<number>(initial_bubbleCount);

const bubbles = ref<Bubble[]>([]);

const decrease_size = (bubble: Bubble) => {
  if (bubble.lives !== 1) {
    const new_size = bubble.size / 2;

    bubble.horizontal += (bubble.size - new_size) / 2;
    bubble.vertical += (bubble.size - new_size) / 2;
    bubble.size = new_size;
    bubble.lives -= 1;
    popSoundSmall.currentTime = 0;
    popSoundSmall.play();

    std_api_request("/main/test/", "POST", { test: "Hello world!" });
  } else {
    bubble.visible = false;
    popSound.currentTime = 0;
    popSound.play();
    bubbleCount.value -= 1;
  }

  if (bubbleCount.value === 0) start();
};

const start = () => {
  bubbleCount.value = initial_bubbleCount;
  const container = document.querySelector(".bubble-container");
  if (!container) return;

  for (let i = 0; i < initial_bubbleCount; i++) {
    const size = 5 + Math.random() * 15;

    const horizontal = Math.random() * 90;
    const vertical = Math.random() * 90;

    bubbles.value.push({
      visible: true,
      size: size,
      vertical: vertical,
      horizontal: horizontal,
      lives: 3,
    });
  }
};

onMounted(() => {
  start();
});
</script>

<style>
p {
  color: #fff;
  align-self: center;
}

.bubble-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  width: 90%;
  height: 90%;
  z-index: 0;
}

.bubble {
  position: absolute;
  border-radius: 50%;
  background: #6c58cec6;
  transition: all 0.1s ease;
}

.bubble:hover {
  cursor: pointer;
}
</style>
