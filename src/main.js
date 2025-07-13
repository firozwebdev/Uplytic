import { createPinia } from "pinia";
import { createApp } from "vue";
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
import "leaflet/dist/leaflet.css";
import App from "./App.vue";
import router from "./router";
import "./style.css";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(Toast, { position: POSITION.TOP_RIGHT });
app.mount("#app");
