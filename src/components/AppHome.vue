<script>
// import MyComp from './components/MyComp.vue';
import axios from "axios";
import { user, auth } from "../store/index.js";

export default {
  data() {
    return {
      user,
      // ...
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
  },

  components: {},

  created() {
    axios.defaults.withCredentials = true;
    axios.defaults.withXSRFToken = true;
    axios
      .get("http://localhost:8000/api/lions")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<template>
  <h1 class="text-center"><font-awesome-icon icon="fa-solid fa-hippo" class="me-3" />HELLO {{ user.name }}, You're Home!</h1>
  <div class="btn btn-danger" @click="logout()">LOGOUT</div>
</template>

<style lang="scss" scoped></style>
