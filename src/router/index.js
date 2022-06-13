import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/meseros',
    name: 'Meseros',
    component: () => import('../views/Meseros.vue')
  },

  {
    path: '/ordenes',
    name: 'Ordenes',
    component: () => import('../views/Ordenes.vue')
  },

  {
    path: '/mesas',
    name: 'Mesas',
    component: () => import('../views/Mesas.vue')
  },


  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
