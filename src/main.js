import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { store } from "./store"
import axios from 'axios';

import "./assets/main.css";

const app = createApp(App);

app.config.globalProperties.axios = axios;
app.config.globalProperties.router = router;

app.use(createPinia());
app.use(router);
app.use(store);


app.mount("#app");
