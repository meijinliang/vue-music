import Cookies from 'js-cookie'
const Cookie = 'Cookie'

export function getToken() {
  return Cookies.get(Cookie)
}

export function setToken(token) {
  return Cookies.set(Cookie, token)
}

export function removeToken() {
  return Cookies.remove(Cookie)
}
