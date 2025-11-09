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
</template>

<script lang="ts" setup>
import LandingpageNavbar from "../components/Navbars/LandingpageNavbar.vue";
import MainBackground from "../components/Backgrounds/MainBackground.vue";

// Body Components
import LandingPageBody from "../components/LandingPageComponents/LandingPageBody.vue";
import SignUpComponent from "../components/LandingPageComponents/Login/SignUpComponent.vue";
import StandardTripleBoxRow from "../components/BoxRows/StandardTripleBoxRow.vue";
import LandingpageFooter from "../components/Footers/LandingpageFooter.vue";
</script>

<style scoped></style>
