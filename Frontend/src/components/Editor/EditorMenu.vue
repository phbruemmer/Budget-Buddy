<template>
  <div class="menu" :class="hideMenu ? 'hidden' : ''">
    <StdNavbar
      :nav_links="[
        { display: 'Home', destination: '/' },
        { display: 'Features', destination: '/' },
        { display: 'Pricing', destination: '/' },
        { display: 'Contact', destination: '/' },
      ]"
    />
    <!-- Navbar -->

    <!-- Sidebar -->
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";

import StdNavbar from "../Navbars/StdNavbar.vue";

const hideMenu = ref<boolean>(false);

const toggleMenu = (e: KeyboardEvent) => {
  if (e.key === "h") {
    hideMenu.value = !hideMenu.value;
  }
};

onMounted(() => {
  window.addEventListener("keydown", toggleMenu);
});

onUnmounted(() => {
  window.removeEventListener("keydown", toggleMenu);
});
</script>

<style scoped>
.menu {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 0;
  transition: all 0.1s ease;
}

.hidden {
  opacity: 0;
  pointer-events: none;
}
</style>
