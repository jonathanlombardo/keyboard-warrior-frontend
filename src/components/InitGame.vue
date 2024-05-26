<script>
import LionCard from "./partial/LionCard.vue";
import axios from "axios";
import { user, auth, api, store } from "../store/index.js";

export default {
  data() {
    return {
      user,
      lions: [],
      choosedLions: [],
      lionsToChoose: 0,
    };
  },

  props: {
    // ...
  },

  computed: {
    isGameReady() {
      return this.lionsToChoose === this.choosedLions.length;
    },
  },

  methods: {
    async logout() {
      await auth.logout();
      this.$router.push({ name: "login" });
    },

    chooseLion(index) {
      this.choosedLions.push(this.lions[index]);
      this.lions.splice(index, 1);
    },

    unchooseLion(index) {
      this.lions.push(this.choosedLions[index]);
      this.choosedLions.splice(index, 1);
    },

    play() {
      const choosedIds = this.choosedLions.map((lion) => {
        return lion.id;
      });

      axios.defaults.withCredentials = true;
      axios.defaults.withXSRFToken = true;
      store.loading = true;
      axios
        .post(api.uri + api.destroyUnchoosed, { ids: choosedIds })
        .then((res) => {
          store.loading = false;
          if (res.data == "success") {
            this.$router.push({ name: "play" });
          }
        })
        .catch((err) => {
          store.loading = false;
          console.warn(err);
        });
    },
  },

  components: { LionCard },

  created() {
    axios.defaults.withCredentials = true;
    axios.defaults.withXSRFToken = true;
    store.loading = true;
    axios
      .get(api.uri + api.initLions)
      .then((res) => {
        this.lions = res.data.lions;
        this.lionsToChoose = res.data.nLions;
        console.log(this.lions);
      })
      .catch((err) => {
        console.warn(err);
      })
      .finally(() => {
        store.loading = false;
      });
  },
};
</script>

<template>
  <div class="container">
    <div class="text-end">
      <div class="btn btn-danger mt-3" @click="logout()">LOGOUT</div>
    </div>
    <h1 class="text-center mt-3"><font-awesome-icon icon="fa-solid fa-hippo" class="me-3" />Choose your lions, {{ user.name }}</h1>
    <div class="text-center">
      <div class="btn btn-primary mt-3" :class="{ disabled: !isGameReady }" @click="play()">{{ isGameReady ? "Play" : `Choose ${lionsToChoose} lions` }}</div>
    </div>
    <div class="row mt-3 g-3">
      <div class="col-9">
        <div class="row row-cols-4 g-3">
          <div v-for="(lion, index) in lions" :key="index" class="col">
            <lion-card :lion="lion" :index="index" @clicked="chooseLion" />
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="border h-100 p-3">
          <div class="row row-cols-1 g-3">
            <div v-for="(lion, index) in choosedLions" :key="index" class="col">
              <lion-card :lion="lion" :index="index" @clicked="unchooseLion" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
