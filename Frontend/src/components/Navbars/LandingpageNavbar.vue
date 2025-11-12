<template>
  <div class="main-container">
    <nav class="navbar">
      <ul class="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">Features</a></li>
        <li><a href="#">Pricing</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
.main-container {
  display: flex;
  justify-content: center;
  margin: 2vh;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
  height: 70px;
  background-color: #00605111;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  font-family: "Inter", sans-serif;
  position: sticky;
  max-width: 60vw;
  border-radius: 48px;
  top: 0;
  z-index: 100;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 24px;
  margin: 0;
  padding: 0;
}

.nav-links a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  font-family: "Supreme-Regular";
  padding: 8px 12px;
  border-radius: 8px;
  display: inline-block;
  transition: all 0.2s ease;
}

.nav-links a:hover {
  transform: scale(1.08);
}
</style>
