import { createApp } from 'vue'
import App from './App.vue'
import { store } from "./store"
import axios from 'axios';
import globalver from "./globalver"

import "./assets/main.css";

// createApp(App).use(store, globalver).mount('#app')

const app = createApp(App)
app.config.globalProperties.axios = axios;
app.use(store).use(globalver).mount('#app')