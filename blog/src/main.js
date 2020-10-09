import 'babel-polyfill'
import babel from 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import { setCookie } from './utils/cookie'
import './element-ui'
import './filter'

// 公用样式
import '@/assets/css/common.scss'
import '@/assets/css/theme.scss'
import './assets/iconfont/iconfont.css'
import './assets/css/reset.css'
import './assets/css/animate.css'

// element-ui
import './assets/css/element-ui.css'

// markdown 编辑器
import 'mavon-editor/dist/css/index.css'

// 彩带背景
import "@/assets/js/colorLine"

// 代码高亮 
import './assets/js/prism.js'
import './assets/css/prism.css'
import './assets/css/hljs.css'

// markdown
import './assets/css/markdown.css'

Vue.config.productionTip = false
Vue.use(babel)

axios.get(`${ AXIOS_URL }/user/token`).then(data => {
  setCookie('token', data.data.data)
  new Vue({
    router,
    store,
    render: function (h) { return h(App) }
  }).$mount('#app')
})
