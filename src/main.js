import { createApp } from "vue";
import App from "./App.vue";

// import font awesome icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faHippo } from "@fortawesome/free-solid-svg-icons";
library.add(faHippo);

const app = createApp(App);

// use font awesome global component
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
