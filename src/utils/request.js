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
  } else if (
    res.data.code === 800
    || res.data.code === 801
    || res.data.code === 802
    || res.data.code === 803
  ) {
    return res.data
  } else {
    throw new Error(res.data.message)
  }
},
  error => {
    return Promise.reject(error)
  })

export default service