import { createRouter, createWebHistory } from "vue-router";
import Landingpage from "../views/Landingpage.vue";

const routes = [
  {
    path: "",
    name: "Landingpage",
    component: Landingpage,
  },
  {
    path: "/dashboard/",
    name: "Dashboard",
    component: () => import("../views/Dashboard.vue"),
  },
  {
    path: "/project-editor/",
    name: "ProjectEditor",
    component: () => import("../views/Editor.vue"),
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: () => import("../views/ResetPassword.vue"),
    props: (route: any) => ({
      token: route.query.token,
    }),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
