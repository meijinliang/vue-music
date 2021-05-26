import request from '../utils/request'

// 获取banner
export function getBanner () {
  return request({
    url: '/banner',
    method: 'GET'
  })
}

// 推荐歌单
export function personalized (params) {
  return request({
    url: '/personalized',
    method: 'GET',
    params: {
      limit: params
    }
  })
}

// 获取歌单详情 排行榜也是歌单的一种
export function playListDetail (id) {
  return request({
    url: '/playlist/detail?id=' + id,
    method: 'get',
  })
}
// 新碟上架
export function getNewAblum (params) {
  return request({
    url: '/top/ablum',
    method: 'get',
    params
  })
}

//所有榜单
export function getTopList () {
  return request({
    url: '/toplist',
    method: 'get',
  })
}
