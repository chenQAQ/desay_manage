import Vue from 'vue'
import router from './router/index.js'
import {
    store
} from './js/store.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './app.vue'
import axios from 'axios'
import * as qiniu from 'qiniu-js'
import VueQriously from 'vue-qriously'
import VueClipboard from 'vue-clipboard2'
import './js/mock'
import hash from 'object-hash'
import fecha from 'fecha'
import $ from './js/jquery-3.3.1.min.js'



window.$ = $;
window.fecha = fecha;
window.qiniu = qiniu;
Vue.prototype.$ajax = axios;
window.hash = hash;
Vue.use(VueClipboard)
Vue.use(ElementUI)
Vue.use(VueQriously)
const root = document.createElement('div')
document.body.appendChild(root)
new Vue({
    store,
    router,
    render: (h) => h(App)
}).$mount(root)