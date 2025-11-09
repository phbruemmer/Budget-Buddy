<template>
  <h1>Register</h1>

  <div v-if="registerSteps === 0">
    <InputBar placerholder="Username" />
    <InputBar placerholder="E-Mail" />
    <InputBar placerholder="Password" />
  </div>
  <div v-else-if="registerSteps === 1">
    <InputBar placerholder="Password Check" />
  </div>
  <div v-else-if="registerSteps === 2">
    <InputBar placerholder="Verification Code" />
  </div>
  <div v-else>
    <h3>Hey! Don't change my code! Chaos theory says don't.</h3>
  </div>

  <div class="btn-container">
    <DefaultButton
      v-if="registerSteps !== 0"
      @button="handleReturn"
      :dotted="true"
      >Back</DefaultButton
    >
    <DefaultButton
      @button="handleClick"
      v-if="registerSteps >= 0 && registerSteps <= 2"
      >{{ registerSteps !== 2 ? "Continue" : "Register" }}</DefaultButton
    >
  </div>
</template>

<script lang="ts" setup>
import InputBar from "../../Default Inputs/InputBar.vue";
import DefaultButton from "../../Default Buttons/DefaultButton.vue";
import { ref } from "vue";

const registerSteps = ref<number>(0);

const handleReturn = () => {
  registerSteps.value = 0;
};

const handleClick = () => {
  registerSteps.value += 1;

  if (registerSteps.value < 0 || registerSteps.value > 2)
    registerSteps.value = 0;
};
</script>

<style scoped>
h1 {
  font-size: 2rem;
  color: #0060518d;
}

h3 {
  color: #0000004f;
}

.btn-container {
  display: flex;
  justify-content: center;
  gap: 2rem;
}
</style>
