import { createPinia } from "pinia";
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";

import AOS from "aos";
import "aos/dist/aos.css";

import "./assets/css/supreme.css";

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.mount("#app");

AOS.init({
  duration: 800,
  offset: 100,
  once: true,
});
