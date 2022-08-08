import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/icons' // icon
import moment from 'moment'
import lodash from 'loadsh'

// 引入自定义指令
import install from './directive'

Vue.config.productionTip = false
// 引入全局样式
import '@/assets/style/index.scss'

Vue.prototype.$moment = moment
Vue.prototype._ = lodash
// Vue.use(moment)
Vue.use(install)
Vue.use(Element, { size: 'small' })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
