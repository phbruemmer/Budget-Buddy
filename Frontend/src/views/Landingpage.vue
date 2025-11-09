<template>
  <LandingpageNavbar />

  <MainBackground>
    <!-- Add the Landing Page contents in here -->
    <LandingPageBody />
  </MainBackground>

  <SignUpComponent />
</template>

<script lang="ts" setup>
import LandingpageNavbar from "../components/Navbars/LandingpageNavbar.vue";
import MainBackground from "../components/Backgrounds/MainBackground.vue";

// Body Components
import LandingPageBody from "../components/LandingPageComponents/LandingPageBody.vue";
import SignUpComponent from "../components/LandingPageComponents/Login/SignUpComponent.vue";
</script>

<style scoped></style>
