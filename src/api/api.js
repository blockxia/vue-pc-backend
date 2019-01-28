/**
 * 接口请求函数
*/
import axios from '@/utils/request'
const DOMAIN = '/api'
// 示例
export const getData = (params) => {
  return axios.request({
    url: DOMAIN + '/get_data',
    params,
    method: 'get'
  })
}
export const postData = (data) => {
  return axios.request({
    url: DOMAIN + '/post_data',
    data,
    method: 'post'
  })
}
// 示例
export const gettableData = (data) => {
  return axios.request({
    url: DOMAIN,
    data,
    method: 'get'
  })
}
