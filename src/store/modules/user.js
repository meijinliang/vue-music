import { getToken, removeToken } from '@/utils/auth'
import { loginStatus, logout } from '@/api/login'
const user = {
  state: {
    cookie: getToken(),
    // 账号信息
    account: JSON.parse(localStorage.getItem('account')) || {},
    // 用户信息
    profile: JSON.parse(localStorage.getItem('profile')) || {}
  },
  mutations: {
    SET_TOKEN: (state, cookie) => {
      state.cookie = cookie
    },
    SET_ACCOUNT: (state, account) => {
      state.account = account
    },
    SET_PROFILE: (state, profile) => {
      state.profile = profile
    }
  },
  actions: { // action函数接收一个与store实例具有相同方法和属性的context对象
    // 二维码登录获取登录状态
    loginByQrcode(context) {
      loginStatus().then(res => {
        context.commit('SET_ACCOUNT', res.data.account)
        context.commit('SET_PROFILE', res.data.profile)
        localStorage.setItem('account', JSON.stringify(res.data.account))
        localStorage.setItem('profile', JSON.stringify(res.data.profile))
      })
    },
    // 退出
    logout(context) {
      logout().then(res => {
        if (res.code === 200) {
          context.commit('SET_TOKEN', '')
          context.commit('SET_ACCOUNT', {})
          context.commit('SET_PROFILE', {})
          removeToken()
          localStorage.removeItem('account')
          localStorage.removeItem('profile')
        }
      })
    }
  }
}

export default user
