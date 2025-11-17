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

import { ref } from "vue";
import { useRouter } from "vue-router";

import { AuthService } from "../../../utils/auth";

const auth = new AuthService();
const router = useRouter();

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

const handleLogin = async () => {
  const result = await auth.login(
    userData.value.username,
    userData.value.password
  );

  if (!result.success) {
    userData.value.username = "";
    userData.value.password = "";
    messageType.value = "error";
    message.value = result.message;
    return;
  } else {
    messageType.value = "success";
    message.value = result.message;
  }

  setTimeout(() => {
    router.push("/dashboard/");
  }, 1000);
};

const handleClick = () => {
  handleLogin();
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
