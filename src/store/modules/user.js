import { getToken } from '@/utils/auth'
import { loginStatus } from '@/api/login'
const user = {
  state: {
    cookie: getToken(),
    // 账号信息
    accont: {},
    // 用户信息
    profile: {}
  },
  mutations: {
    SET_TOKEN: (state, cookie) => {
      state.cookie = cookie
    },
    SET_ACCOUNT: (state, accont) => {
      state.accont = accont 
    },
    SET_PROFILE: (state, profile) => {
      state.profile = profile
    }
  },
  actions: { //action函数接收一个与store实例具有相同方法和属性的context对象
    // 二维码登录获取登录状态
    loginByQrcode (context) {
      console.log(context);
      loginStatus().then(res => {
        console.log(res)
        context.commit('SET_ACCOUNT', res.data.accont)
        context.commit('SET_PROFILE', res.data.profile)
      })
    }
  }
}

export default user