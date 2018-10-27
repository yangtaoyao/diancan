import axios from 'axios'
// import store from '../store'
import qs from 'qs'
import common from '../assets/js/common'
import {_this} from '../main'

console.info(common.env)

const instance = axios.create({
  baseURL: common.serverUrl,
  timeout: 4000,
    // withCredentials: true, // 跨域请求时是否需要使用凭证
  paramsSerializer: params => {
        // 序列化 GET 请求参数 -> a: [1, 2] => a=1&a=2
    return qs.stringify(params, { arrayFormat: 'repeat' })
  },
  transformRequest: [data => {
        // 在向服务器发送前修改请求数据，只适用于 POST
    return qs.stringify(data, { arrayFormat: 'repeat' })
  }],
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

// http 请求拦截器
instance.interceptors.request.use(config => {
  _this.$vux.loading.show({
    text: '客官请稍后...'
  })
  return config
}, error => {
  _this.$vux.loading.hide()
  _this.$vux.toast.show({
    text: '数据加载超时！',
    position: 'middle',
    type: 'cancel'
  })
  return Promise.reject(error)
})

// http 响应拦截器
instance.interceptors.response.use(response => {
  _this.$vux.loading.hide()
  return response
}, error => {
  _this.$vux.loading.hide()
  _this.$vux.toast.show({
    text: '数据加载失败！',
    position: 'middle',
    type: 'cancel'
  })
  return Promise.reject(error)
})

/**
 * 向后台请求数据的 API 接口
 */

// 登录接口
export const doLogin = params => instance.post('/doLogin', params)
export const doLogout = () => instance.post('/doLogout')
// 注册
export const doRegister = params => instance.post('/doRegister', params)
// 获取菜单
export const getMenu = () => instance.get('/getMenu')
// 获取桌表
export const getTables = () => instance.get('/getTables')
// 下单
export const submitOrder = params => instance.post('/submitOrder', params)
// 获取订单列表
export const getOrder = params => instance.post('/getOrder', params)
// 崔单
export const doReminder = params => instance.post('/doReminder', params)
// 退单
export const doChargeBack = params => instance.post('/doChargeBack', params)
// 搜索
export const doSearch = params => instance.post('/doSearch', params)
