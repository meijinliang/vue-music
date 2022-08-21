import axios from 'axios'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
console.log(process.env, process.env.VUE_APP_API)
const service = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 10000
})

// 请求拦截器
service.interceptors.request.use(config => {
  return config
}, err => {
  console.log(err)
})

// 响应拦截器
service.interceptors.response.use(res => {
  // [200].includes(res.data.data.code)登入状态的接口又包了一层data
  if ([200, 800, 801, 802, 803].includes(res.data.code) || [200].includes(res.data.data.code)) {
    return res.data
  } else {
    throw new Error(res.data.message)
  }
},
error => {
  return Promise.reject(error)
})

export default service
