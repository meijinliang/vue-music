import request from '../utils/request'

// 获取歌单详情 排行榜也是歌单的一种
export function playListDetail(id) {
  return request({
    url: '/playlist/detail?id=' + id,
    method: 'get'
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

// 歌曲评论 params {id，limit: 取出评论数量 , 默认为 20}
export function getMusicComment(params) {
  return request({
    url: '/comment/music',
    method: 'get',
    params
  })
}

// 获取歌词
export function getLyric(params) {
  return request({
    url: '/lyric',
    method: 'get',
    params
  })
}

// 获取相似歌曲
export function getSimiSong(params) {
  return request({
    url: '/simi/song',
    method: 'get',
    params
  })
}
