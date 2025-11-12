<template>
  <div class="protected" v-if="show_page">
    <h1>Hello world!</h1>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { std_api_request } from "../utils/api";

const show_page = ref<boolean>(false);

onMounted(async () => {
  const access_token = localStorage.getItem("access_token");
  if (!access_token) window.location.href = "/";

  const response = await std_api_request(
    "/api/auth/auto-login/",
    "GET",
    {},
    true
  );
  if (response.ok) show_page.value = true;
  else window.location.href = "/";
});
</script>

<style scoped></style>
