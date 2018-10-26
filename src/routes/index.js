import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/components/Layout'
import Me from '@/components/Me'
import Menu from '@/components/Menu'
import Order from '@/components/Order'
import Login from '@/components/Login'
import Register from '@/components/Register'
import SearchP from '@/components/SearchP'
import Settlement from '@/components/Settlement'
import OrderDetail from '@/components/OrderDetail'
import Table from '@/components/Table'

Vue.use(VueRouter)

export const constantRouterMap = [
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/search',
    name: 'SearchP',
    component: SearchP
  },
  {
    path: '/settlement',
    name: 'Settlement',
    component: Settlement
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Menu
  },
  {
    path: '/orderDetail',
    name: 'OrderDetail',
    component: OrderDetail
  },
  {
    path: '/home',
    name: 'layout',
    component: Layout,
    redirect: '/home/table',
    children: [
      {
        path: 'table',
        name: '首页',
        component: Table
      },
      {
        path: 'order',
        name: '订单',
        component: Order
      },
      {
        path: 'me',
        name: '我的',
        component: Me
      }]
  }
]

export default new VueRouter({
  mode: 'history',
  base: '/static/dist/',
  routes: constantRouterMap
})
