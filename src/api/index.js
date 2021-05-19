import request from '../utils/request'

// 获取banner
export function getBanner() {
  return request({
    url: '/banner',
    method: 'GET'
  })
}

// 推荐歌单
export function personalized(params) {
  return request({
    url: '/personalized',
    method: 'GET',
    params: {
      limit: params
    }
  })
}
// 手机登录
export function loginCellPhone(params) {
  return request({
    url: '/login/cellphone',
    method: 'get',
    params
  })
} 