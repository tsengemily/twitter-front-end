import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound'

Vue.use(VueRouter)

const routes = [
  {
    path: '/user/self',
    name: 'user-self',
    component: () => import('../views/UserSelf'),
  },
  {
    path: '/user/self/follower',
    name: 'user-self-follower',
    component: () => import('../views/UserSelfFollower'),
  },
  {
    path: '/user/self/following',
    name: 'user-self-following',
    component: () => import('../views/UserSelfFollowing'),
  },
  {
    path: '/user/other',
    name: 'user-other',
    component: () => import('../views/UserOther'),
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound,
  },
]

const router = new VueRouter({
  routes,
})

export default router
