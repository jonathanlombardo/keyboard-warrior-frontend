import { createWebHistory, createRouter } from "vue-router";
import { user, store } from "./store";
import AppHome from "./components/AppHome.vue";
import AppLogin from "./components/AppLogin.vue";
import AppTest from "./components/AppTest.vue";

const routes = [
  {
    path: "/test",
    component: AppTest,
    name: "test",
  },
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
    meta: {
      requiresNoAuth: true,
    },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// redirect routes where auth doesn't match
router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth
    // check if is logged
    if (!user.isLogged) {
      store.loading = true;
      await user.fillUser();
      store.loading = false;
    }

    // redirect if not logged
    if (!user.isLogged) {
      next({ name: "login" });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresNoAuth)) {
    // this route requires NOauth
    // check if is logged
    if (!user.isLogged) {
      store.loading = true;
      await user.fillUser();
      store.loading = false;
    }

    // redirect if logged
    if (user.isLogged) {
      next({ name: "home" });
    } else {
      next();
    }
  } else {
    next(); // does not require auth
  }
});
