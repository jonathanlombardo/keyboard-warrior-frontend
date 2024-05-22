<script>
// import MyComp from './components/MyComp.vue';
// import {store} from './store/index.js'
import axios from "axios";
import { store } from "./store";

export default {
  data() {
    return {
      store,
      // ...
    };
  },

  props: {
    // ...
  },

  methods: {
    // ...
  },

  components: {},

  created() {},
};
</script>

<template>
  <h1 class="text-center"><font-awesome-icon icon="fa-solid fa-hippo" class="me-3" />HELLO LIONS!</h1>
  <!-- <p>{{ store.authToken }}</p> -->
</template>

<style lang="scss">
@use "./assets/app.scss";
</style>
