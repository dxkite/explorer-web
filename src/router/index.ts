import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/src::path(.*)',
    name: 'Path',
    component: Home
  },
  {
    path: '*',
    name: 'NotFound',
    component: Home
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
