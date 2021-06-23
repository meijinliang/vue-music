import { getToken } from '@/utils/auth'
import { loginStatus } from '@/api/login'
const user = {
  state: {
    cookie: getToken(),
    name: '',
    avatar: '',
    roles: [],
    userDetail: {}
  },
  mutations: {
    SET_TOKEN: (state, cookie) => {
      state.cookie = cookie
    }
  },
  actions: {
    // 二维码登录获取登录状态
    loginByQrcode (context) {
      console.log(context);
      loginStatus().then(res => {
        console.log(res);
      })
    }
  }
}

export default user