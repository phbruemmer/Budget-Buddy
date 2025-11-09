<template>
  <div class="main-container">
    <div class="content-container">
      <div class="vertical-title">
        <h1>Get Started</h1>
        <hr />
      </div>
      <div
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-delay="100"
        class="section-content"
      >
        <p>
          Take control of your finances with ease. Our Budget Management System
          helps you track expenses, plan savings, and achieve your financial
          goals - All in one simple, intuitive platform.
        </p>
      </div>
    </div>

    <div
      class="account-buttons"
      data-aos="fade-up"
      data-aos-duration="800"
      data-aos-delay="100"
    >
      <button class="prominent" @click="scroll_to">Sign Up</button>

      <button class="demo">Checkout Demo</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const scroll_to = () => {};
</script>

<style scoped>
.main-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60vh;
  padding: 2rem;
  gap: 4rem;
}

.content-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4rem;
}

.vertical-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: rotate(-90deg);
  position: relative;
  left: -2rem;
}

.vertical-title h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.1em;
  margin: 0;
}

.vertical-title hr {
  width: 120px;
  border: none;
  border-top: 2px solid #ffffff44;
  margin: 1rem 0 0;
}

.section-content {
  color: #fff;
  font-size: 1.2rem;
  line-height: 1.6;
  max-width: 600px;
}

.account-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2vh;
  height: 100%;
  width: 25vw;
}

.account-buttons button {
  min-width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.account-buttons .prominent {
  background: linear-gradient(135deg, #ffc857, #ff9f1c);
  color: #074a40;
  font-size: 1.2rem;
  font-weight: 700;
  border: none;
  height: 60px;
  border-radius: 24px 6px;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
  transition: all 0.3s ease;
}

.account-buttons .prominent:hover {
  background: linear-gradient(135deg, #ffbe5c, #ffa234);
  color: #0b6e5f;
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.3);
}

.account-buttons .prominent:active {
  transform: scale(0.98);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.account-buttons .demo {
  background: transparent;
  color: #fff;
  font-size: 0.8rem;
  height: 40px;
  font-weight: 400;
  border: 2px #fff dotted;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
  transition: all 0.3s ease;
}

.account-buttons .demo:hover {
  background: #ffffff25;
  transform: translateY(-2px);
}

.account-buttons .demo:active {
  transform: scale(0.98);
}
</style>
