<script>
// import MyComp from './components/MyComp.vue';
import { api } from "../store/index.js";
import axios from "axios";

export default {
  data() {
    return {
      ids: [78, 79, 80],
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
      .post(api.uri + "/api/destroy", { ids: this.ids })
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
  <h1>TEST</h1>
</template>

<style lang="scss" scoped></style>
