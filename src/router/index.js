import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound'

Vue.use(VueRouter)

const routes = [
  {
    path: '/users/:id',
    name: 'user',
    component: () => import('../views/User'),
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
    path: '*',
    name: 'not-found',
    component: NotFound,
  },
]

const router = new VueRouter({
  routes,
})

export default router
