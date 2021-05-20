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
// 新碟上架
export function getNewAblum(params) {
  return {
    url: '/top/ablum',
    method: 'get',
    params
  }
}

//所有榜单
export function getTopList() {
  return {
    url: '/toplist',
    method: 'get',
  }
}
// 手机登录
export function loginCellPhone(params) {
  return request({
    url: '/login/cellphone',
    method: 'get',
    params
  })
} 