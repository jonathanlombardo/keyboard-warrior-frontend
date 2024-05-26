<script>
// import MyComp from './components/MyComp.vue';
// import {store} from './store/index.js'
import axios from "axios";
import { user, auth, api, store } from "../store/index.js";

export default {
  data() {
    return {
      // store,
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

  created() {
    axios.defaults.withCredentials = true;
    axios.defaults.withXSRFToken = true;
    axios
      .get(api.uri + api.recalcAll)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.warn(err);
      })
      .finally(() => {});
  },
};
</script>

<template>
  <h1>PLAY</h1>
</template>

<style lang="scss" scoped></style>
