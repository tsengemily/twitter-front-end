import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound'
import Regist from '../views/Regist.vue'
import store from './../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/users/:id',
    name: 'user',
    component: () => import('../views/User'),
    children: [
      {
        path: 'with_replies',
        name: 'user-with-replies',
        component: () => import('../views/UserWithReplies'),
      },
      {
        path: 'likes',
        name: 'user-likes',
        component: () => import('../views/UserLikes'),
      },
    ],
  },
  {
    path: '/users/:id/follower',
    name: 'user-follower',
    component: () => import('../views/UserFollower'),
  },
  {
    path: '/users/:id/following',
    name: 'user-following',
    component: () => import('../views/UserFollowing'),
  },
  {
    path: '/',
    name: 'Root',
    redirect: '/login',
  },
  {
    path: '/regist',
    name: 'Regist',
    component: Regist,
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import('../views/Setting.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/mainpage/:id',
    name: 'MainPage',
    component: () => import('../views/MainPage.vue'),
  },
  {
    path: '/reply/:id',
    name: 'ReplyList',
    component: () => import('../views/ReplyList.vue'),
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin.vue'),
  },
  {
    path: '/admin_main',
    name: 'AdminMain',
    component: () => import('../views/AdminMain.vue'),
  },
  {
    path: '/admin_users',
    name: 'AdminUsers',
    component: () => import('../views/AdminUsers.vue'),
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

router.beforeEach((to, from, next) => {
  store.dispatch('fetchCurrentUser')
  next()
})

export default router
