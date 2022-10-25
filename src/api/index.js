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

// 获取歌单分类 中文名称
export function getCatList() {
  return request({
    url: '/playlist/catlist'
  })
}

/**
 *
 * 热门歌单分类
 * order: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
 * cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
 * limit: 取出歌单数量 , 默认为 50
 * offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值
 * @param {*} params
 *
 */
export function topPlayList(params) {
  return request({
    url: '/top/playlist',
    method: 'get',
    params
  })
}

