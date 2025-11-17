<template>
  <LandingpageNavbar />

  <MainBackground>
    <!-- Add the Landing Page contents in here -->
    <LandingPageBody />
  </MainBackground>

  <SignUpComponent />

  <StandardTripleBoxRow title="# Features #">
    <template #box-1>
      <div class="box" data-aos="fade-up" data-aos-delay="0">
        <h3>Analytics</h3>
        <p>Track performance metrics easily.</p>
      </div>
    </template>

    <template #box-2>
      <div class="box" data-aos="fade-up" data-aos-delay="100">
        <h3>Users</h3>
        <p>Manage users and roles.</p>
      </div>
    </template>

    <template #box-3>
      <div class="box" data-aos="fade-up" data-aos-delay="200">
        <h3>Settings</h3>
        <p>Customize your preferences.</p>
      </div>
    </template>
  </StandardTripleBoxRow>

  <LandingpageFooter />
  <AcceptDeclineModal
    title="Hey! We found an active login."
    :show="show_modal"
    @close="show_modal = false"
    @accept="accept_login"
    @decline="decline_login"
  >
    We've detected that you're already logged in on this device. Would you like
    to continue as your current user or log out?
  </AcceptDeclineModal>
</template>

<script lang="ts" setup>
import LandingpageNavbar from "../components/Navbars/LandingpageNavbar.vue";
import MainBackground from "../components/Backgrounds/MainBackground.vue";

// Body Components
import LandingPageBody from "../components/LandingPageComponents/LandingPageBody.vue";
import SignUpComponent from "../components/LandingPageComponents/Login/SignUpComponent.vue";
import StandardTripleBoxRow from "../components/BoxRows/StandardTripleBoxRow.vue";
import LandingpageFooter from "../components/Footers/LandingpageFooter.vue";

// Modals
import AcceptDeclineModal from "../components/Modals/AcceptDeclineModal.vue";

import { std_api_request } from "../utils/api";
import { onMounted, ref } from "vue";

import { AuthService } from "../utils/auth";

const auth = new AuthService();

// Auto Log In //
const show_modal = ref<boolean>(false);

const decline_login = () => {
  auth.logout();
  show_modal.value = false;
};

const accept_login = () => {
  show_modal.value = false;
  setTimeout(() => {
    window.location.href = "/dashboard/";
  }, 1500);
};

onMounted(async () => {
  const response = await std_api_request(
    "/api/auth/auto-login/",
    "GET",
    {},
    true
  );
  if (response.ok) show_modal.value = true;
});
</script>

<style scoped></style>
