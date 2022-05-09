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

// 获取歌单评论 params {id，limit: 取出评论数量 , 默认为 20}
export function playListComment(params) {
  return request({
    url: '/comment/playlist',
    method: 'get',
    params
  })
}
// 歌曲评论 params {id，limit: 取出评论数量 , 默认为 20}
export function getMusicComment(params) {
  return request({
    url: '/comment/music',
    method: 'get',
    params
  })
}

// 新碟上架
export function getNewAblum () {
  return request({
    url: '/album/newest',
    method: 'get',
  })
}

//所有榜单
export function getTopList () {
  return request({
    url: '/toplist',
    method: 'get',
  })
}

// 热门歌单分类
export function topPlayList() {
  return request({
    url: '/top/playlist'
  })
}

// 获取歌曲详情
/**
 * @params 必传字段为ids
 * */ 
export function getSongDetail(params) {
  return request({
    url: '/song/detail',
    method: 'get',
    params
  })
}