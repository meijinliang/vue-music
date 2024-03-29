import Vue from 'vue'
import VueRouter from 'vue-router'
import { HomeRouter } from './home-router'
import { getPageTitle } from '@/utils/getTitle.js'

Vue.use(VueRouter)
// 解决路由重复跳转，控制台报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) { return originalPush.call(this, location, onResolve, onReject) }
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'topnav',
    redirect: 'home',
    component: () => import('@/layout'),
    children: [{
      path: 'home',
      name: 'home',
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
    path: '/icons',
    component: (resolve) => require(['@/views/components/icons'], resolve), // 如果用import引入的话，当项目打包时路由里的所有component都会打包到一个js中，造成进入首页需要加载的内容过多，时间相对比较长
    hidden: true, // 使用require这种方式引入的时候，会将component组件打包在不同的js中，加载的时候也是按需加载，只有访问这个路由的时候才会加载对应的js
    meta: {
      title: 'icons'
    }
  }
  // {
  //   path: 'demo',
  //   name: 'demo',
  //   component: () => import('@/demo')
  // }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.params.pageTitle) { // 页面跳转带的参数展示到浏览器标题中
    let title = ''
    title = to?.meta?.title ? `${to.params.pageTitle} - ${to.meta.title}` : to.params.pageTitle
    document.title = getPageTitle(title)
  } else {
    // 设置浏览器的标题
    document.title = getPageTitle(to?.meta?.title)
  }
  next()
})

export default router
