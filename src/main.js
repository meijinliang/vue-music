import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/icons' // icon 

Vue.config.productionTip = false
// 引入全局样式
import '@/assets/style/index.scss'

Vue.use(Element, { size: 'small' })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
