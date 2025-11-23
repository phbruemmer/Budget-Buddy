<template>
  <div v-if="!verificationCodeRequired">
    <h1>Login</h1>
    <InputBar placeholder="Username" type="text" v-model="userData.username" />
    <InputBar
      placeholder="Password"
      type="password"
      v-model="userData.password"
    />
  </div>

  <div v-else>
    <h1>Verify Account</h1>
    <InputBar
      placeholder="Verification Code"
      type="text"
      v-model="verificationCode"
    />
  </div>

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

const verificationCode = ref<string | undefined>();

const messageType = ref<MessageType>("error");
const message = ref<string>("");

const verificationCodeRequired = ref<boolean>(false);

const handleLogin = async () => {
  const result = await auth.login(
    userData.value.username,
    userData.value.password
  );

  if (result.status === 403) {
    message.value = "Check your emails for a verification code.";
    messageType.value = "success";
    verificationCodeRequired.value = true;
    return;
  }

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

const handleVerification = async () => {
  if (!userData.value.username || !userData.value.password) {
    messageType.value = "error";
    message.value = "Missing user credentials! Something went wrong.";
    verificationCodeRequired.value = false;
    return;
  }

  if (!verificationCode.value) {
    messageType.value = "error";
    message.value = "No verification code entered.";
    return;
  }
  const response = await auth.userVerification(
    userData.value.username,
    verificationCode.value
  );
  if (response.success) handleLogin();
};

const handleClick = () => {
  verificationCodeRequired.value ? handleVerification() : handleLogin();
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
