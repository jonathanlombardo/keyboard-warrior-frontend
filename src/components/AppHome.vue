<script>
// import MyComp from './components/MyComp.vue';
import { user, store } from "../store/index.js";

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
    // ...
  },

  components: {},

  created() {
    // ...
  },
};
</script>

<template>
  <h1 class="text-center"><font-awesome-icon icon="fa-solid fa-hippo" class="me-3" />HELLO {{ user.name }}, You're Home!</h1>
</template>

<style lang="scss" scoped></style>
