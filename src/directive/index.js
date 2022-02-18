import time from './time'

const install = function(Vue) {
  Vue.directive('time', time)
}

if (window.Vue) {
  window['time'] = time
  Vue.use(install)  // eslint-disable-line
}

export default install