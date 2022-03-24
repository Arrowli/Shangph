/* 
专门请求mock接口的axios封装
*/
import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 配置不显示右上角的旋转进度条, 只显示水平进度条
NProgress.configure({ showSpinner: false }) 

const requests = axios.create({
  baseURL: "/mock", // 基础路径
  timeout: 5000   // 连接请求超时时间
})

requests.interceptors.request.use((config) => {
  // 显示请求中的水平进度条
  NProgress.start()

  // 必须返回配置对象
  return config
})

requests.interceptors.response.use((res) => {
  // 隐藏进度条
  NProgress.done()
  // 返回响应体数据
  return res.data
}, (err) => {
  alert( '服务器响应数据失败')
})

//最终需要对外暴露（不对外暴露外面模块没办法使用）
//这里的代码是暴露一个axios实例
export default requests

