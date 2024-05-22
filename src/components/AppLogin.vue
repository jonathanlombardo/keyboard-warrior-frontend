<script>
// import MyComp from './components/MyComp.vue';
import { store } from "../store/index.js";

export default {
  data() {
    return {
      // store,
      isLogin: true,
      mail: null,
      confirmMail: null,
      password: null,
      confirmPassword: null,
    };
  },

  props: {
    // ...
  },

  methods: {
    async handleSubmit() {
      if (this.isLogin) {
        await store.signIn(this.mail, this.password);
        this.$router.push({ name: "home" });
      } else {
        await store.signUp(this.mail, this.password);
        this.$router.push({ name: "home" });
      }
      // this.$router.go(-1);
    },
  },

  components: {},

  created() {
    // ...
  },
};
</script>

<template>
  <div class="container">
    <h1 class="text-center"><font-awesome-icon icon="fa-solid fa-hippo" class="me-3" />LOGIN my little lion!</h1>
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a class="nav-link" :class="{ active: isLogin }" aria-current="page" href="#" @click="isLogin = true">Login</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{ active: !isLogin }" href="#" @click="isLogin = false">Register</a>
      </li>
    </ul>
    <div class="form-wrapper border border-top-0 pt-3 px-3">
      <div class="mb-3">
        <label for="mail" class="form-label">Mail</label>
        <input v-model="mail" type="email" class="form-control" id="mail" placeholder="name@example.com" />
      </div>
      <div v-if="!isLogin" class="mb-3">
        <label for="confirm-mail" class="form-label">Confirm mail</label>
        <input v-model="confirmMail" type="email" class="form-control" id="confirm-mail" />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input v-model="password" type="password" class="form-control" id="password" />
      </div>
      <div v-if="!isLogin" class="mb-3">
        <label for="confirm-password" class="form-label">Confirm password</label>
        <input v-model="confirmPassword" type="password" class="form-control" id="confirm-password" />
      </div>
      <div class="text-center">
        <button class="btn btn-primary mb-3" @click="handleSubmit()">
          <span v-if="isLogin">Login</span>
          <span v-else>Register</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
