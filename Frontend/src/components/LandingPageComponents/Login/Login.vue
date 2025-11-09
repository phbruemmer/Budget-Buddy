<template>
  <h1>Login</h1>
  <InputBar placerholder="Username" />
  <InputBar placerholder="Password" />
  <DefaultButton @button="handleClick">Login</DefaultButton>
</template>

<script lang="ts" setup>
import InputBar from "../../Default Inputs/InputBar.vue";
import DefaultButton from "../../Default Buttons/DefaultButton.vue";

const handleClick = () => {
  alert("Button was clicked");
};
</script>

<style scoped>
h1 {
  font-size: 2rem;
  color: #0060518d;
}
</style>
