import Vue from 'vue'
import VueRouter from 'vue-router'
import { HomeRouter } from './home-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'topnav',
    redirect: 'home',
    component: () => import('@/layout'),
    children: HomeRouter
  },
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
