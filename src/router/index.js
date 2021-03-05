import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound'
import Regist from '../views/Regist.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Root',
    redirect: '/login'
  },
  {
    path: '/regist',
    name: 'Regist',
    component: Regist
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import('../views/Setting.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/mainpage',
    name: 'MainPage',
    component: () => import('../views/MainPage.vue')
  },
  {
    path: '/reply/:id',
    name: 'ReplyList',
    component: () => import('../views/ReplyList.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin.vue')
  },
  {
    path: '/admin_main',
    name: 'AdminMain',
    component: () => import('../views/AdminMain.vue')
  },
  {
    path: '/admin_users',
    name: 'AdminUsers',
    component: () => import('../views/AdminUsers.vue')
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound,
  },
]

const router = new VueRouter({
  // linkExactActiveClass: 'active',
  routes,
})

export default router
