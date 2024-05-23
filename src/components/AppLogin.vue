<script>
// import MyComp from './components/MyComp.vue';
import { auth } from "../store/index.js";

export default {
  data() {
    return {
      auth,
      isLogin: true,
      name: null,
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
      this.name = null;
      this.mail = null;
      this.confirmMail = null;
      this.password = null;
      this.confirmPassword = null;
    },

    async handleSubmit() {
      if (this.isLogin) {
        await auth.login(this.mail, this.password);
        this.$router.push({ name: "home" });
      } else {
        await auth.register(this.name, this.mail, this.password, this.confirmPassword);
        this.$router.push({ name: "home" });
      }
      // this.$router.go(-1);
    },

    clearError(attr) {
      if (auth.loginError) {
        if (attr == "all") {
          auth.loginError = null;
          return;
        }
        auth.loginError[attr] = null;
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
        <a class="nav-link" :class="{ active: isLogin }" aria-current="page" @click="handleTabClick(true)">Login</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{ active: !isLogin }" @click="handleTabClick(false)">Register</a>
      </li>
    </ul>
    <div class="form-wrapper border border-top-0 pt-3 px-3">
      <div v-if="!isLogin" class="mb-3">
        <label for="name" class="form-label">Nickname</label>
        <input @input="clearError('name')" v-model="name" type="text" :class="['form-control', { 'is-invalid': auth.loginError?.name }]" id="name" placeholder="nickname" />
        <div class="invalid-feedback">
          <span v-for="error in auth.loginError?.name">
            {{ error }}
          </span>
        </div>
      </div>
      <div class="mb-3">
        <label for="mail" class="form-label">Mail</label>
        <input @input="clearError('email')" v-model="mail" type="email" :class="['form-control', { 'is-invalid': auth.loginError?.email }]" id="mail" placeholder="name@example.com" />
        <div class="invalid-feedback">
          <span v-for="error in auth.loginError?.email">
            {{ error }}
          </span>
        </div>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input @input="clearError('password')" v-model="password" type="password" :class="['form-control', { 'is-invalid': auth.loginError?.password }]" id="password" />
        <div class="invalid-feedback">
          <span v-for="error in auth.loginError?.password">
            {{ error }}
          </span>
        </div>
      </div>
      <div v-if="!isLogin" class="mb-3">
        <label for="confirm-password" class="form-label">Confirm password</label>
        <input @input="clearError('confirmPassword')" v-model="confirmPassword" type="password" :class="['form-control', { 'is-invalid': auth.loginError?.confirmPassword }]" id="confirm-password" />
        <div class="invalid-feedback">
          <span v-for="error in auth.loginError?.confirmPassword">
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

<style lang="scss" scoped>
.nav-tabs {
  a {
    cursor: pointer;
  }
}
</style>
