<template>
  <div class="section">
    <div class="box-container">
      <div
        class="info-symbol"
        v-if="selectedTab === 'login'"
        @click="showModal = true"
      >
        <img src="https://www.svgrepo.com/show/509833/circled-info.svg" />
      </div>
      <div class="box-header">
        <a
          :class="{ active: selectedTab === 'login' }"
          @click="selectTab('login')"
          >Login</a
        >
        <a
          :class="{ active: selectedTab === 'register' }"
          @click="selectTab('register')"
          >Register</a
        >
      </div>
      <hr />
      <Login v-if="selectedTab === 'login'" />
      <Register
        v-if="selectedTab === 'register'"
        @go_login="selectedTab = 'login'"
      />
    </div>
  </div>

  <GeneralModal
    :show="showModal"
    title="You forgot your password?"
    @close="showModal = false"
  >
    <template #description>
      No problem! Enter your email address below, and we'll send you a link to
      reset your password.
    </template>

    <template #general>
      <InputBar type="email" placeholder="Email" v-model="userEmail" />
      <DefaultButton @button="resetPassword">Reset password</DefaultButton>
    </template>
  </GeneralModal>

  <HeadMsgBox title="Information" :show="showMsg" @close="showMsg = false">
    {{ err_msg }}
  </HeadMsgBox>
</template>

<script lang="ts" setup>
import Login from "./Login.vue";
import Register from "./Register.vue";

import GeneralModal from "../../Modals/GeneralModal.vue";
import HeadMsgBox from "../../Modals/HeadMsgBox.vue";

import InputBar from "../../Default Inputs/InputBar.vue";
import DefaultButton from "../../Default Buttons/DefaultButton.vue";

import { ref } from "vue";
import { AuthService } from "../../../utils/auth";

const auth = new AuthService();

const showMsg = ref<boolean>(false);
const showModal = ref<boolean>(false);
const userEmail = ref<string>("");

const err_msg = ref<string>("");

const check_email_regex = (email: string) => {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    err_msg.value = "Please enter a valid email address.";
    showMsg.value = true;
    return false;
  }
  return true;
};

const resetPassword = async () => {
  if (!check_email_regex(userEmail.value)) return;
  const response = await auth.requestPasswordReset(userEmail.value);
  showModal.value = false;
  userEmail.value = "";

  setTimeout(() => {
    err_msg.value = "We've send you the link to reset your password.";
    showMsg.value = response.success;
  }, 250);
};

const selectedTab = ref("register");
const selectTab = (tab: string) => {
  selectedTab.value = tab;
};
</script>

<style scoped>
.section {
  display: flex;
  justify-content: center;
  margin: 4vh 0;
  height: 55vh;
}

.box-container {
  background-color: #ffffff;
  margin: 2vh 2vw;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  min-width: 300px;
  width: 50%;
  text-align: center;
}

.box-header {
  display: flex;
  justify-content: space-evenly;
}

.box-header a {
  margin: 0 10px;
  padding: 10px;
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: all 0.2s;
}

.box-header a:hover {
  transform: scale(1.02);
  cursor: pointer;
}

.box-header a.active {
  background: #0060511f;
  border-radius: 12px;
}

.info-symbol {
  position: absolute;
  transition: all 0.3s ease;
}

.info-symbol:hover {
  transform: scale(0.9);
  cursor: pointer;
}

.info-symbol img {
  width: 24px;
  height: auto;
}
</style>
