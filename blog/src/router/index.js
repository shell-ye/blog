import Vue from 'vue'
import VueRouter from 'vue-router'
import routerTable from './routerTable'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  routes: routerTable,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
export default router
