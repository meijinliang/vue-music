import request from '../utils/request'

// 获取banner
export function getBanner() {
  return request({
    url: '/banner',
    method: 'GET'
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