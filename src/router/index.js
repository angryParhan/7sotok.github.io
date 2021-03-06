import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Goods from '../views/Goods'
import Basket from '../views/Basket'
import ProductPage from '../views/ProductPage'
import aboutUs from '../views/About'
import Contacts from '../views/Contacts'
import Categories from '../views/Categories'

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
  },
  {
    path: '/product/:id',
    name: 'productPage',
    props: true,
    component: ProductPage
  },
  {
    path: '/about',
    name: 'About',
    component: aboutUs
  },
  {
    path: '/contacts',
    name: 'Contacts',
    component: Contacts
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories
  }


]

const router = new VueRouter({
  routes
})

export default router
