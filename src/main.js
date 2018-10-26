// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './routes'
import App from './App'
import store from './store'
import { getToken } from './assets/js/auth'
// 图标字体
import './assets/iconfont/iconfont.css'
import './assets/css/common.css'

import { ToastPlugin, TransferDom, LoadingPlugin } from 'vux'
// Loading
Vue.use(LoadingPlugin)
// toast
Vue.use(ToastPlugin)
Vue.directive('transfer-dom', TransferDom)

// 不重定向白名单
const whiteList = ['/login', '/register']

router.beforeEach(async (to, from, next) => {
  // store.dispatch('updateLoadingStatus', {isLoading: true})
  if (getToken()) { // 判断是否登录，成功登录
    if (whiteList.indexOf(to.path) !== -1 || to.path === '/') { // 包含白名单
      // console.log('next:/')
      console.log('next包含白名单:' + to.path)
      next('/home')
    } else {
      console.log('next:' + to.path)
      next()
    }
  } else { // 非登录
    if (whiteList.indexOf(to.path) !== -1) { // 包含白名单
      next()
    } else {
      next('/login')
    }
  }
})

router.afterEach(() => {
  // store.dispatch('updateLoadingStatus', {isLoading: false})
})

// 移除移动端页面点击延迟
FastClick.attach(document.body)

// window.onbeforeunload = function (event) {
//   return '您可能有数据没有保存'
// }

Vue.config.productionTip = false
// Vue.component('loading', Loading)
/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app-box')
