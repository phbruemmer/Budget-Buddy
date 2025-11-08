import { createRouter, createWebHistory } from "vue-router";
import Landingpage from "../views/Landingpage.vue";

const routes = [
  {
    path: "",
    name: "Landingpage",
    component: Landingpage,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
