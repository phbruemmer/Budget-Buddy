<template>
  <h1>Login</h1>
  <InputBar placerholder="Username" type="text" v-model="userData.username" />
  <InputBar
    placerholder="Password"
    type="password"
    v-model="userData.password"
  />
  <DefaultButton @button="handleClick">Login</DefaultButton>
  <p :class="messageType">{{ message }}</p>
</template>

<script lang="ts" setup>
import InputBar from "../../Default Inputs/InputBar.vue";
import DefaultButton from "../../Default Buttons/DefaultButton.vue";

import { std_api_request } from "../../../utils/api";
import { ref } from "vue";

type MessageType = "success" | "error";

interface UserData {
  username: string;
  password: string;
}

const userData = ref<UserData>({
  username: "",
  password: "",
});

const messageType = ref<MessageType>("error");
const message = ref<string>("");

const login = async () => {
  const response = await std_api_request(
    "/api/auth/login/",
    "POST",
    userData.value
  );
  if (!response.ok) {
    userData.value.username = "";
    userData.value.password = "";
    messageType.value = "error";
    message.value = response.data?.error;
    return;
  } else {
    messageType.value = "success";
    message.value = response.data?.message;
  }
  const access_token = response.data?.access;
  const refresh_token = response.data?.refresh;

  if (access_token && refresh_token) {
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
  }

  setTimeout(() => {
    window.location.href = "/dashboard/";
  }, 1000);
};

const handleClick = () => {
  login();
};
</script>

<style scoped>
h1 {
  font-size: 2rem;
  color: #0060518d;
}

.error {
  color: #6e1515c2;
}

.success {
  color: #006051a7;
}
</style>
