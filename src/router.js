import { createWebHistory, createRouter } from "vue-router";

import AppHome from "./components/AppHome.vue";

const routes = [
  {
    path: "/",
    component: AppHome,
    name: "home",
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
