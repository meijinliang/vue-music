import request from '../utils/request'

// 手机登录
export function loginCellPhone (params) {
  return request({
    url: '/login/cellphone',
    method: 'get',
    params
  })
}

// 二维码key生成接口 
export function loginQrKey () {
  return request({
    url: '/login/qr/key',
    method: 'get'
  })
}

// 二维码生成接口
export function loginQrCreate (params) {
  return request({
    url: '/login/qr/create',
    method: 'get',
    params
  })
}

// 二维码检测扫码状态接口
export function loginQrCheck (params) {
  return request({
    url: '/login/qr/check',
    method: 'get',
    params
  })
}

// 刷新登录 可刷新登录状态
export function loginRefresh () {
  return request({
    url: '/login/refresh',
    method: 'get'
  })
}

// 发送验证码 传入手机号码, 可发送验证码 
export function captchaSent (params) {
  return request({
    url: '/captcha/sent',
    method: 'get',
    params
  })
}

// 检测手机号码是否已注册 
export function cellphoneCheck (params) {
  return request({
    url: '/cellphone/existence/check',
    method: 'get',
    params
  })
}

// 退出登录
export function logout () {
  return request({
    url: '/logout',
    method: 'get'
  })
}

// 登录状态
export function loginStatus () {
  return request({
    url: '/login/status',
    method: 'get'
  })
}

// 获取用户详情
export function getUserDetail (params) {
  return request({
    url: '/user/detail',
    method: 'get',
    params
  })
}

// 获取账号信息
export function getUserAccount () {
  return request({
    url: '/user/account',
    method: 'get'
  })
}

// 获取用户信息，歌单，收藏，mv，dj数量
export function getUserSubcount () {
  return request({
    url: '/user/subcount',
    method: 'get'
  })
}

// 获取用户等级
export function getUserLevel () {
  return request({
    url: '/user/level',
    method: 'get'
  })
}

// 获取用户绑定信息
export function getUserBinding () {
  return request({
    url: '/user/binding',
    method: 'get'
  })
}

// 更新用户信息
export function updateUserMessage (params) {
  return request({
    url: '/user/update',
    method: 'get',
    params
  })
}

// 更新头像
export function updateAvatar (params) {
  return request({
    url: '/avatar/upload',
    method: 'get',
    params
  })
}

// 获取用户歌单
export function getUserPlaylist (params) {
  return request({
    url: '/user/playlist',
    method: 'get',
    params
  })
}

// 更新歌单
export function updatePlaylist (params) {
  return request({
    url: '/playlist/update',
    method: 'get',
    params
  })
}
