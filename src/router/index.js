import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Goods from '../views/Goods'
import Basket from '../views/Basket'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/goods',
    name: 'Goods',
    component: Goods
  },
  {
    path: '/basket',
    name: 'Basket',
    component: Basket
  }
]

const router = new VueRouter({
  routes
})

export default router
