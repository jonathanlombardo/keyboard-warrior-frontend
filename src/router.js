import { createWebHistory, createRouter } from "vue-router";
import { store } from "./store";
import AppHome from "./components/AppHome.vue";
import AppLogin from "./components/AppLogin.vue";

const routes = [
  {
    path: "/home",
    component: AppHome,
    name: "home",
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    component: AppLogin,
    name: "login",
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// redirect all routes where login is required if user is not logged
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth
    if (!store.authToken) {
      next({ name: "login" });
    } else {
      next();
    }
  } else {
    next(); // does not require auth
  }
});
