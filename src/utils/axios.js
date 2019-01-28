import Axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'
import store from '../store'
import { clearOneLocal } from './storage'
class httpRequest {
  interceptors (service) {
    //  let user = getLocal('user') || ''
    // 请求拦截器
    service.interceptors.request.use(
      config => {
        // const url = config.url
        const token = store.state.user.token
        if (config.timeout === 0) {
          config.timeout = 20000
        }
        // 头部请求添加token
        if (token !== '') {
          config.headers.token = token
        }
        //  config.headers.logUuid = httpUuid
        // 安全策略配置
        // config.withCredentials = true
        // 拼接请求主域名
        // config.url = DOMAIN + config.url
        // config.responseType = 'json'
        return config
      },
      err => {
        // console.log(err)
        return Promise.reject(err)
      })
    // 响应拦截器
    service.interceptors.response.use(
      response => {
        // console.log(response)
        // 响应处理 如果响应code码为token失效那么返回至登录页
        if (response.status === 200) {
          switch (response.data.resultCode) {
            case '4': // 文件错误
              return response.data
            case '600': // token过期执行退出操作
              clearOneLocal('user')
              clearOneLocal('btnStatus')
              localStorage.clear()
              router.replace({path: '/login'})
              break
            case '500':
              Message('服务器未知错误')
              return response.data
            case '200':
              return response.data
            default:
              if (response.data.resultMessage) {
                Message(response.data.resultMessage)
              }
              return response.data
          }
        }
      },
      error => {
        if (error && error.response) {
          switch (error.response.status) {
            case 400: error.message = '请求错误(400)'; break
            case 500: error.message = '服务器错误(500)'; break
            /* case 501: error.message = '服务未实现(501)'; break
            case 502: error.message = '网络错误(502)'; break
            case 503: error.message = '服务不可用(503)'; break
            case 504: error.message = '网络超时(504)'; break
            case 505: error.message = 'HTTP版本不受支持(505)'; break */
          }
        } else {
          error.message = '网络异常，请稍后重试'
        }
        Message.error(error.message)
        // 响应错误拦截
        return Promise.reject(error) // 返回接口返回的错误信息
      })
  }
  request (options) {
    const service = Axios.create()
    this.interceptors(service)
    return service(options)
  }
}

export default httpRequest
