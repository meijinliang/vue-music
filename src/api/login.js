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