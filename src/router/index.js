import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound'
import Regist from '../views/Regist.vue'
import store from './../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Root',
    redirect: '/login',
  },
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

router.beforeEach(async (to, from, next) => {
  // 從 localStorage 取出 token
  const token = localStorage.getItem('token')
  // 預設是尚未驗證
  let isAuthenticated = false
  // 如果有 token 的話才驗證
  if (token) {
    // 取得驗證成功與否
    isAuthenticated = store.dispatch('fetchCurrentUser')
  }
  // 對於不需要驗證 token 的頁面
  const pathsWithoutAuthentication = ['Login', 'Regist', 'Admin']
  // 如果 token 無效則轉址到登入頁
  if (!isAuthenticated && !pathsWithoutAuthentication.includes(to.name)) {
    next('/login')
    return
  }
  // 如果 token 有效則轉址到首頁
  if (isAuthenticated && pathsWithoutAuthentication.includes(to.name)) {
    const userId = localStorage.getItem('userId')
    console.log(userId)
    next(`/mainpage/${userId}`)
    return
  }
  next()
})

export default router
