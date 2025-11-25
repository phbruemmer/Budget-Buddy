<template>
  <h1>Register</h1>

  <div v-if="registerSteps === 0">
    <InputBar placeholder="Username" type="text" v-model="userData.username" />
    <InputBar placeholder="E-Mail" type="email" v-model="userData.email" />
    <InputBar
      placeholder="Password"
      type="password"
      v-model="userData.password_1"
    />
  </div>
  <div v-else-if="registerSteps === 1">
    <InputBar
      placeholder="Password Check"
      type="password"
      v-model="userData.password_2"
    />
  </div>
  <div v-else-if="registerSteps === 2">
    <InputBar placeholder="Verification Code" v-model="verification_code" />
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

  <HeadMsgBox
    :show="show_msg_box"
    title="Information"
    @close="show_msg_box = false"
  >
    {{ msg_box_text }}
  </HeadMsgBox>
</template>

<script lang="ts" setup>
import InputBar from "../../Default Inputs/InputBar.vue";
import DefaultButton from "../../Default Buttons/DefaultButton.vue";

// Modals
import HeadMsgBox from "../../Modals/HeadMsgBox.vue";

import { ref } from "vue";
import { AuthService } from "../../../utils/auth";

const auth = new AuthService();

const emits = defineEmits<{
  (e: "go_login"): void;
}>();

interface UserData {
  username: string | undefined;
  email: string | undefined;
  password_1: string | undefined;
  password_2: string | undefined;
}

const msg_box_text = ref<string>("");
const show_msg_box = ref<boolean>(false);

const userData = ref<UserData>({
  username: "",
  email: "",
  password_1: "",
  password_2: "",
});

const verification_code = ref<string>("");

const registerSteps = ref<number>(0);

const handleMsgBox = (content: string) => {
  msg_box_text.value = content;
  show_msg_box.value = true;
};

const handleReturn = () => {
  userData.value = { username: "", email: "", password_1: "", password_2: "" };
  registerSteps.value = 0;
};

const handleVerification = async () => {
  if (
    !userData.value.username ||
    !userData.value.email ||
    !verification_code.value
  )
    return;
  const response = await auth.userVerification(
    userData.value.username,
    verification_code.value
  );
  verification_code.value = "";

  if (response.success) emits("go_login");
  else handleMsgBox("Invalid verification code.");
};

const handleRegister = async () => {
  if (!userData.value.username || !userData.value.email) {
    handleMsgBox("Username or email is not valid anymore.");
    return;
  }

  if (!userData.value?.password_1 || !userData.value.password_2) {
    handleMsgBox("You need to enter your password twice.");
    return;
  }
  if (userData.value?.password_1 !== userData.value?.password_2) {
    handleMsgBox("Your passwords must match to continue.");
    return;
  }
  registerSteps.value += 1;

  const response = await auth.register(
    userData.value.username,
    userData.value.email,
    userData.value.password_1,
    userData.value.password_2
  );

  if (!response.success) {
    handleMsgBox(response.message);
    registerSteps.value = 0;
  }
};

const check_password_regex = (password: string): boolean => {
  if (password.length <= 6 || password.length >= 255) {
    handleMsgBox("Your password must be between 6 and 255 characters long.");
    return false;
  }
  if (!/[A-Z]/.test(password)) {
    handleMsgBox("Password must contain at least one uppercase letter.");
    return false;
  }

  if (!/\d/.test(password)) {
    handleMsgBox("Password must contain at least one number.");
    return false;
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    handleMsgBox("Password must contain at least one special character.");
    return false;
  }
  return true;
};

const check_email_regex = (email: string) => {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    handleMsgBox(
      "Please enter a valid email address (e.g., name@example.com)."
    );
    return false;
  }
  return true;
};

const check_username_regex = (username: string): boolean => {
  if (!/^[A-Za-z0-9_]+$/.test(username)) {
    handleMsgBox(
      "Username can only contain letters, numbers, and underscores."
    );
    return false;
  }
  return true;
};

const handleFormValidation = () => {
  if (!userData.value?.username) {
    handleMsgBox("You need a username.");
    return;
  }
  if (!userData.value?.email) {
    handleMsgBox("You need a to enter an email address.");
    return;
  }
  if (!userData.value?.password_1) {
    handleMsgBox("You need a valid password.");
    return;
  }

  if (!check_username_regex) return;
  if (!check_email_regex) return;
  if (!check_password_regex) return;

  registerSteps.value += 1;
};

const handleClick = () => {
  if (registerSteps.value === 0) handleFormValidation();
  else if (registerSteps.value === 1) handleRegister();
  else if (registerSteps.value === 2) handleVerification();
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
