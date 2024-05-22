<script>
// import MyComp from './components/MyComp.vue';
// import {store} from './store/index.js'

export default {
  data() {
    return {
      // store,
      isLogin: true,
    };
  },

  props: {
    // ...
  },

  methods: {
    // ...
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
        <input type="email" class="form-control" id="mail" placeholder="name@example.com" />
      </div>
      <div v-if="!isLogin" class="mb-3">
        <label for="confirm-mail" class="form-label">Confirm mail</label>
        <input type="email" class="form-control" id="confirm-mail" />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" />
      </div>
      <div v-if="!isLogin" class="mb-3">
        <label for="confirm-password" class="form-label">Confirm password</label>
        <input type="password" class="form-control" id="confirm-password" />
      </div>
      <div class="text-center">
        <button class="btn btn-primary mb-3">
          <span v-if="isLogin">Login</span>
          <span v-else>Register</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
