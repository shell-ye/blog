import Vue from 'vue'
import VueRouter from 'vue-router'
import routerTable from './routerTable'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: routerTable
})
export default router
