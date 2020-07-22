const config = require('./../../config.json')
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import { setCookie } from './utils/cookie'
import './utils/element-ui'
import './utils/filter'


import './assets/css/element-ui.css'
import './assets/iconfont/iconfont.css'
import './assets/css/reset.css'
import './assets/css/animate.css'
import './assets/css/prism.css'
import './assets/js/prism.js'

Vue.config.productionTip = false

axios.get(`${ config.server_URL }/user/token`).then(data => {
  setCookie('token', data.data.data)
  new Vue({
    router,
    store,
    render: function (h) { return h(App) }
  }).$mount('#app')
})
