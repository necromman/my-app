import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { store } from "./store"
import axios from 'axios';

import "./assets/main.css";
import "./assets/font-awesome-4.7.0/css/font-awesome.min.css";
import "./assets/font-awesome-4.7.0/css/bulma.min.css";

const app = createApp(App);

app.config.globalProperties.axios = axios;
app.config.globalProperties.router = router;

app.use(createPinia());
app.use(router);
app.use(store);


app.mount("#app");
