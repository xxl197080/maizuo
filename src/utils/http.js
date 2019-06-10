// 封装axios
import axios from 'axios'
import {Toast} from 'vant'

const http = axios.create()
// 设置开发环境和上线环境的默认地址
http.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'https://m.maizuo.com/' : 'https://m.maizuo.com/'
// 设置请求超时的时间
http.defaults.timeout = 10000

// 做一个响应拦截
http.interceptors.response.use(response => {
  let res = response.data
  if (res.status === 0) {
    // 请求成功
    return res;
  } else {
    Toast('网络异常，请稍后重试！')
  }
},error => {
  Toast('网络异常，请稍后重试！')
  console.log(error)
})

// 暴露
export default http
