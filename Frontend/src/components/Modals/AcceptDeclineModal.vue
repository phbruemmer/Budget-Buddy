<template>
  <div class="bg-container" v-if="props.show" @click="emit('close')">
    <div class="modal" @click.stop>
      <h1>{{ props.title }}</h1>
      <div class="text-container">
        <p><slot></slot></p>
      </div>

      <div class="btn-container">
        <DefaultButton :dotted="true" @button="emit('decline')">
          Decline
        </DefaultButton>
        <DefaultButton @button="emit('accept')"> Accept </DefaultButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import DefaultButton from "../Default Buttons/DefaultButton.vue";

const props = defineProps<{
  title: string;
  show?: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "accept"): void;
  (e: "decline"): void;
}>();
</script>

<style scoped>
.bg-container {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #00000050;
}

.modal {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  max-width: fit-content;

  background-color: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  z-index: 999;
}

.modal h1 {
  font-size: 1.6rem;
}

.text-container {
  max-width: 450px;
  text-align: center;
}

.btn-container {
  margin-top: 5px;
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>
