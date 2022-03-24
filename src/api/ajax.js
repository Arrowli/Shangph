/* 
对axios进行二次包装
1. 配置通用的基础路径和超时
2. 显示请求进度条
3. 成功返回的数据不再是response, 而直接是响应体数据response.data
4. 统一处理请求错误, 具体请求也可以选择处理或不处理
*/
import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//在当前模块中引入store
import store from '@/store'

// 配置不显示右上角的旋转进度条, 只显示水平进度条
NProgress.configure({ showSpinner: false }) 

const service = axios.create({
  baseURL: "/api", // 基础路径
  timeout: 5000   // 连接请求超时时间
})

//请求拦截器----在项目中发请求（请求没有发出去）可以做一些事情
service.interceptors.request.use((config) => {
  //现在的问题是config是什么?配置对象
  if(store.state.detail.uuid_token){
    //请求头添加一个字段(userTempId):和后台老师商量好了
    config.headers.userTempId = store.state.detail.uuid_token
  }
  // 需要携带token带给服务器
  if(store.state.user.token){
    config.headers.token = store.state.user.token
  }


  // 显示请求中的水平进度条
  NProgress.start()
  // 必须返回配置对象
  return config
})

//响应拦截器----当服务器手动请求之后，做出响应（相应成功）会执行的
service.interceptors.response.use((response) => {
  // 隐藏进度条
  NProgress.done()
  // 返回响应体数据
  return response.data
}, (error) => {
  // 隐藏进度条
  NProgress.done()

  // 统一处理一下错误
  alert( `请求出错: ${error.message||'未知错误'}`)

  // 后面可以选择不处理或处理
  return Promise.reject(error)
})

export default service
