import {store} from "./store";
import JSZip from 'jszip'



export default {
    install(Vue) {
        Vue.config.globalProperties.$store = store
        Vue.config.globalProperties.$JSZip = JSZip
    }
}