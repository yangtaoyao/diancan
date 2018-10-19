import * as types from './types'

const mutations = {
  [types.LOGININFO] (state, payload) {
    state.loginInfo = payload.info
  },
  [types.NAVLIST] (state, payload) {
    state.navList = payload.info
  },
  // 页面切换loading
  loadingStatus (state, payload) {
    state.isLoading = payload.isLoading
  },
  // tabbar底部导航选中
  layoutIndex (state, payload) {
    state.layoutIndex = payload.layoutIndex
  }
}

export default mutations
