import { createApp } from 'vue'
import App from './App.vue'
import { store } from "./store"
import globalver from "./globalver"

createApp(App).use(store, globalver).mount('#app')
