<template>
  <div class="section">
    <div class="box-container">
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
      <Register v-if="selectedTab === 'register'" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Login from "./Login.vue";
import Register from "./Register.vue";

import { ref } from "vue";

const selectedTab = ref("register");

function selectTab(tab: string) {
  selectedTab.value = tab;
}
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
</style>
