<script>
// import MyComp from './components/MyComp.vue';
import { store } from "../store/index.js";

export default {
  data() {
    return {
      store,
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
    handleTabClick(isLogin) {
      this.isLogin = isLogin;
      this.clearError("all");
      this.clearFields();
    },

    clearFields() {
      this.mail = null;
      this.confirmMail = null;
      this.password = null;
      this.confirmPassword = null;
    },

    async handleSubmit() {
      if (this.isLogin) {
        await store.signIn(this.mail, this.password);
        this.$router.push({ name: "home" });
      } else {
        await store.signUp(this.mail, this.password, this.confirmMail, this.confirmPassword);
        this.$router.push({ name: "home" });
      }
      // this.$router.go(-1);
    },

    clearError(attr) {
      if (store.loginError) {
        if (attr == "all") {
          store.loginError = null;
          return;
        }
        store.loginError[attr] = null;
      }
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
        <a class="nav-link" :class="{ active: isLogin }" aria-current="page" href="#" @click="handleTabClick(true)">Login</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{ active: !isLogin }" href="#" @click="handleTabClick(false)">Register</a>
      </li>
    </ul>
    <div class="form-wrapper border border-top-0 pt-3 px-3">
      <div class="mb-3">
        <label for="mail" class="form-label">Mail</label>
        <input @input="clearError('email')" v-model="mail" type="email" :class="['form-control', { 'is-invalid': store.loginError?.email }]" id="mail" placeholder="name@example.com" />
        <div class="invalid-feedback">
          <span v-for="error in store.loginError?.email">
            {{ error }}
          </span>
        </div>
      </div>
      <div v-if="!isLogin" class="mb-3">
        <label for="confirm-mail" class="form-label">Confirm mail</label>
        <input @input="clearError('confirmEmail')" v-model="confirmMail" type="email" :class="['form-control', { 'is-invalid': store.loginError?.confirmEmail }]" id="confirm-mail" />
        <div class="invalid-feedback">
          <span v-for="error in store.loginError?.confirmEmail">
            {{ error }}
          </span>
        </div>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input @input="clearError('password')" v-model="password" type="password" :class="['form-control', { 'is-invalid': store.loginError?.password }]" id="password" />
      </div>
      <div class="invalid-feedback">
        <span v-for="error in store.loginError?.password">
          {{ error }}
        </span>
      </div>
      <div v-if="!isLogin" class="mb-3">
        <label for="confirm-password" class="form-label">Confirm password</label>
        <input @input="clearError('confirmPassword')" v-model="confirmPassword" type="password" :class="['form-control', { 'is-invalid': store.loginError?.confirmPassword }]" id="confirm-password" />
        <div class="invalid-feedback">
          <span v-for="error in store.loginError?.confirmPassword">
            {{ error }}
          </span>
        </div>
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
