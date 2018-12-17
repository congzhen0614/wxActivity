// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import api from './api/api'
import router from './router'
import * as custom from './common/filter.js'

Vue.config.productionTip = false

Vue.prototype.$axios = api
Vue.prototype.Toast = new window.AuiToast() // 提示组件
Vue.prototype.Dialog = new window.AuiDialog() // 对话框组件
Vue.prototype.isIos = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
Vue.prototype.isWeixin = !!navigator.userAgent.match(/MicroMessenger/i)

// 过滤器
Object.keys(custom).forEach(key => {
  Vue.filter(key, custom[key])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
