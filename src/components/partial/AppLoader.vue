<script>
// import MyComp from './components/MyComp.vue';
// import {store} from './store/index.js'

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
    // ...
  },
};
</script>

<template>
  <div class="loader"><font-awesome-icon icon="fa-solid fa-spinner" spin />LOADING</div>
</template>

<style lang="scss" scoped>
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;

  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  backdrop-filter: blur(5px);
  background-color: rgba(0, 0, 0, 0.46);

  color: white;
  font-weight: bold;
  font-size: 2rem;
}
</style>
