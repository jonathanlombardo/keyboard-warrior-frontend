import { createWebHistory, createRouter } from "vue-router";
import { user, store } from "./store";
import AppHome from "./components/AppHome.vue";
import InitGame from "./components/InitGame.vue";
import PlayGame from "./components/PlayGame.vue";
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
    path: "/init",
    component: InitGame,
    name: "initGame",
    meta: {
      requiresFrom: ["home"],
      redirect: "home",
    },
  },
  {
    path: "/play",
    component: PlayGame,
    name: "play",
    meta: {
      requiresFrom: ["home", "initGame"],
      redirect: "home",
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

// redirect conditional routes
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
  } else if (to.matched.some((record) => record.meta.requiresFrom)) {
    // this route requires from home
    // check if is from home and redir if not
    if (!to.meta.requiresFrom.includes(from.name)) {
      next({ name: to.meta.redirect });
    } else {
      next();
    }
  } else {
    next(); // does not require anything
  }
});
