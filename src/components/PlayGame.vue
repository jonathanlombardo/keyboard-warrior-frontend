<script>
// import MyComp from './components/MyComp.vue';
// import {store} from './store/index.js'
import axios from "axios";
import { user, auth, api, store } from "../store/index.js";

export default {
  data() {
    return {
      lions: [],
      global: {},
      plotSinergies: [],
    };
  },

  computed: {
    proPlots() {
      return this.plotSinergies.filter(({ sinergy }) => sinergy > 0);
    },
    neutralPlots() {
      return this.plotSinergies.filter(({ sinergy }) => sinergy == 0);
    },
    againstPlots() {
      return this.plotSinergies.filter(({ sinergy }) => sinergy < 0);
    },
  },

  props: {
    // ...
  },

  methods: {
    recalcAll() {
      axios.defaults.withCredentials = true;
      axios.defaults.withXSRFToken = true;
      axios
        .get(api.uri + api.recalcAll)
        .then((res) => {
          console.log(res.data);
          this.lions = res.data.lions;
          this.global = res.data.global;
          this.plotSinergies = res.data.sinergies;
        })
        .catch((err) => {
          console.warn(err);
        })
        .finally(() => {});
    },
  },

  components: {},

  created() {
    this.recalcAll();
  },
};
</script>

<template>
  <div>
    <button class="debugBtn" @click="recalcAll()">recalcAll</button>
  </div>
  <div class="container">
    <h1 class="text-center">PLAY</h1>
    <div class="row justify-content-center mt-5">
      <div v-for="lion in lions" class="col-2">
        <div class="img-wrapper">
          <img src="/public/KW-lion-TRASP.gif" alt="warrior gif" />
        </div>
      </div>
    </div>
  </div>
  <div class="bottom-bar">
    <div class="container">
      <div class="row">
        <div class="col-auto">
          <div>Supported Plots</div>
          <ul>
            <li v-for="plot in proPlots">
              {{ plot.label }}: <b>{{ plot.sinergy }} sp</b>
            </li>
          </ul>
        </div>
        <div class="col-auto">
          <div>Unsupported Plots</div>
          <ul>
            <li v-for="plot in againstPlots">
              {{ plot.label }}: <b>{{ plot.sinergy * -1 }} sp</b>
            </li>
          </ul>
        </div>
        <div class="col-auto">
          <div>Neutral Plots</div>
          <ul>
            <li v-for="plot in neutralPlots">
              {{ plot.label }}
            </li>
          </ul>
        </div>
        <div class="col text-end">
          <div>Global Sinergy: {{ global.sinergy }}</div>
          <div>Belief: {{ global.belief }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.img-wrapper {
  display: flex;
  justify-content: center;
  height: 150px;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}

.bottom-bar {
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
  color: white;

  background-color: rgb(0, 0, 0);
  min-height: 100px;
}
</style>
