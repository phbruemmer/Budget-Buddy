<template>
  <h1>Register</h1>
  <InputBar placerholder="Username" />
  <InputBar placerholder="E-Mail" />
  <InputBar placerholder="Password" />
  <DefaultButton @button="handleClick">Register</DefaultButton>
</template>

<script lang="ts" setup>
import InputBar from "../../Default Inputs/InputBar.vue";
import DefaultButton from "../../Default Buttons/DefaultButton.vue";

const handleClick = () => {
  alert("Clicked");
};
</script>

<style scoped>
h1 {
  font-size: 2rem;
  color: #0060518d;
}
</style>
