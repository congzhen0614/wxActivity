/**
 * Created by abc on 2018/10/25.
 */
/**
 * name: 二维码增订系统
 * creator: congzhen
 * creationTime: 2018/10/25
 */
import axios from 'axios'
import qs from 'qs'

export default {
  // 领取优惠券
  getPacket (params) {
    return axios.post('/api/v1/user/register', params)
  },
  get (params) {
    let param = qs.stringify(params)
    return axios.get(`/qrzd/v1/user/register?${param}`)
  },
  freeBook () {
    return axios.get('/api/anobuy/books')
  },
  schoolsList (regionId) {
    return axios.get(`/api/school/regionId/${regionId}`)
  },
  gradesList () {
    return axios.get('/api/school/grades')
  },
  classesList () {
    return axios.get('/api/school/classes')
  },
  freeBookConfirm (params) {
    return axios.post('/api/anobuy/confirm', params)
  }
}
