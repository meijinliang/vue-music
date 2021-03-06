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
export function getNewAblum() {
  return request({
    url: '/album/newest',
    method: 'get'
  })
}

// 所有榜单
export function getTopList() {
  return request({
    url: '/toplist',
    method: 'get'
  })
}

// 热门歌单分类
export function topPlayList() {
  return request({
    url: '/top/playlist'
  })
}

