<script>
// import {store} from './store/index.js'
import AppLoader from "./components/partial/AppLoader.vue";
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

  components: { AppLoader },

  created() {},
};
</script>

<template>
  <router-view />
  <app-loader v-if="store.loading" />
</template>

<style lang="scss">
@use "./assets/app.scss";
</style>
