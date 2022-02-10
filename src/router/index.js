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
    children: [{
      path: 'home',
      name: 'home',
      meta: {
        title: '首页'
      },
      // import 异步加载
      component: () => import('@/views/home')
    }]
  },
  {
    path: '',
    name: 'topnav',
    redirect: 'home',
    component: () => import('@/layout'),
    children: HomeRouter
  },
  {
    path: 'playlist',
    name: 'playlist',
    component: () => import('@/views/play-list')
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  console.log(to);
  if (to.path == '/playlist') {
    document.title = to.query.title
  }
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
