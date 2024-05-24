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
    lion: Object,
    index: Number,
  },

  computed: {
    isInit() {
      return this.$route.name == "initGame";
    },
  },

  emits: ["clicked"],

  methods: {
    handleLionClick() {
      this.$emit("clicked", this.index);
    },
  },

  components: {},

  created() {
    // ...
  },
};
</script>

<template>
  <div @click="handleLionClick()" class="card h-100">
    <div class="card-header">
      <div>{{ lion.name }}</div>
    </div>
    <ul class="list-group list-group-flush p-2">
      <li class="list-group-item text-center h-50">
        <strong>Supported Plots</strong>
        <div class="row row-cols-3">
          <div v-for="plot in lion.supportedPlots" class="col text-start" :style="`order: ${plot.id}`">
            {{ plot.label }}
          </div>
        </div>
      </li>
      <li class="list-group-item text-center h-50">
        <strong>Unsupported Plots</strong>
        <div class="row row-cols-3">
          <div v-for="plot in lion.unsupportedPlots" class="col text-start" :style="`order: ${plot.id}`">
            {{ plot.label }}
          </div>
        </div>
      </li>
    </ul>
    <div class="card-footer">Damage: {{ isInit ? "--" : lion.modifier + 100 }}</div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  cursor: pointer;

  &:hover {
    border-color: black;
  }
}
ul {
  min-height: 200px;
}
</style>
