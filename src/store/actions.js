import * as types from './types'
import { setToken, setUserInfo } from '../assets/js/auth'

const actions = {
  createLoginInfo ({commit}, params) {
    setToken(params.id)
    setUserInfo(params.data)
    commit({
      type: types.LOGININFO,
      info: params
    })
  },
  createNavList ({commit}, params) {
    commit({
      type: types.NAVLIST,
      info: params
    })
  },
  // 页面切换loading
  updateLoadingStatus ({commit}, params) {
    commit({
      type: 'loadingStatus',
      info: params
    })
  },
  updateLayoutIndex ({commit}, params) {
    commit({
      type: 'layoutIndex',
      info: params
    })
  }
}

export default actions
