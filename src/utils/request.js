import axios from 'axios'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
console.log(process.env, process.env.VUE_APP_API);
const service = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 10000
})

service.interceptors.request.use(config => {
  return config
}, err => {
  console.log(err);
})

service.interceptors.response.use(res => {
  if (res.data.code === 200) {
    return res.data
  } else {
    throw new Error(res.data.msg)
  }
},
  error => {
    return Promise.reject(error)
  })

export default service