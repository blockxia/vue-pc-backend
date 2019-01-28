import HttpRequest from '@/utils/axios'
const axiosRequest = new HttpRequest()
export const axios = (options) => {
  return axiosRequest.request(options)
}
