<script>
// import MyComp from './components/MyComp.vue';
import axios from "axios";
import { user, auth } from "../store/index.js";

export default {
  data() {
    return {
      user,
      lions: [],
    };
  },

  props: {
    // ...
  },

  methods: {
    async logout() {
      await auth.logout();
      this.$router.push({ name: "login" });
    },
    handleNewGameClick() {
      this.$router.push({ name: "initGame" });
    },
  },

  components: {},

  created() {},
};
</script>

<template>
  <div class="container">
    <div class="text-end">
      <div class="btn btn-danger mt-3" @click="logout()">LOGOUT</div>
    </div>
    <h1 class="text-center mt-3"><font-awesome-icon icon="fa-solid fa-hippo" class="me-3" />HELLO {{ user.name }}, You're Home!</h1>
    <div class="row flex-column align-items-center g-3 mt-3">
      <div @click="handleNewGameClick()" class="col text-center fs-3 menuOpt">New Game</div>
      <div class="col text-center fs-3 menuOpt">Load Game</div>
      <div class="col text-center fs-3 menuOpt">Options</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menuOpt {
  cursor: pointer;
  width: 50%;
  &:hover {
    background-color: black;
    color: white;
  }
}
</style>
