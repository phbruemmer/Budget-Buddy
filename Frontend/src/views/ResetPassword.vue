<template>
  <div class="section">
    <div class="box-container">
      <div class="box-header">
        <h2>Reset password</h2>
      </div>
      <hr />
      <br />
      <InputBar placeholder="Enter your email" type="email" v-model="email" />
      <InputBar
        placeholder="Enter new password"
        type="password"
        v-model="new_password_1"
      />
      <InputBar
        placeholder="Confirm new password"
        type="password"
        v-model="new_password_2"
      />
      <DefaultButton @button="changePassword">Change password</DefaultButton>

      <p :class="messageType" v-show="err_show" :style="{ marginTop: '40px' }">
        {{ err_msg }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import InputBar from "../components/Default Inputs/InputBar.vue";
import DefaultButton from "../components/Default Buttons/DefaultButton.vue";

import { ref } from "vue";
import { AuthService } from "../utils/auth";
import router from "../router";

const auth = new AuthService();

const props = defineProps<{
  token: string;
}>();

const messageType = ref<"success" | "error">("error");

const err_msg = ref<string>("");
const err_show = ref<boolean>(false);

const email = ref<string>("");

const new_password_1 = ref<string>("");
const new_password_2 = ref<string>("");

const check_email_regex = (email: string) => {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    err_msg.value =
      "Please enter a valid email address (e.g., name@example.com).";
    err_show.value = true;
    return false;
  }
  return true;
};

const check_password_regex = (password: string): boolean => {
  if (password.length <= 6 || password.length >= 255) {
    err_msg.value = "Your password must be between 6 and 255 characters long.";
    err_show.value = true;
    messageType.value = "error";
    return false;
  }
  if (!/[A-Z]/.test(password)) {
    err_msg.value = "Password must contain at least one uppercase letter.";
    err_show.value = true;
    messageType.value = "error";
    return false;
  }

  if (!/\d/.test(password)) {
    err_msg.value = "Password must contain at least one number.";
    err_show.value = true;
    messageType.value = "error";
    return false;
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    err_msg.value = "Password must contain at least one special character.";
    err_show.value = true;
    messageType.value = "error";
    return false;
  }
  return true;
};

const sendPasswordChangeRequest = async () => {
  const response = await auth.resetPassword(
    props.token,
    email.value,
    new_password_1.value,
    new_password_2.value
  );
  err_msg.value = response.message;
  err_show.value = true;

  if (!response.success) {
    messageType.value = "error";
  } else {
    messageType.value = "success";

    setTimeout(() => {
      router.push("/");
    }, 1000);
  }
};

const changePassword = () => {
  if (
    new_password_1.value == "" ||
    new_password_2.value == "" ||
    email.value == ""
  )
    return;
  if (!check_email_regex(email.value)) return;
  if (new_password_1.value !== new_password_2.value) {
    err_msg.value = "Passwords do not match.";
    err_show.value = true;
    return;
  }
  if (!check_password_regex(new_password_1.value)) return;
  err_show.value = false;
  sendPasswordChangeRequest();
};
</script>

<style scoped>
.section {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4vh 2vw;
  min-height: 60vh;
}

.box-container {
  background-color: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 450px;
  text-align: center;
}

.box-header {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.error {
  color: #a20808;
  font-weight: 500;
}

.success {
  color: #0e6f57;
  font-weight: 500;
}

@media (max-width: 600px) {
  .box-container {
    padding: 20px 15px;
  }
}
</style>
