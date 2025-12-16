<template>
  <h1>{{ code }}</h1>
</template>

<script lang="ts" setup>
const code = new URLSearchParams(window.location.search).get("code");

console.log("Auth Code: ", code);
</script>

<style scoped></style>
