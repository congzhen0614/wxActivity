import Vue from 'vue'
import Router from 'vue-router'

import getPacket from '@/pages/getPacket/getPacket.vue'
import freeBooks from '@/pages/freeBooks/freeBooks.vue'
import bookList from '@/pages/freeBooks/bookList/bookList.vue'
import receiveInfo from '@/pages/freeBooks/receiveInfo/receiveInfo.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/activities',
  routes: [{
    path: '/getPacket',
    component: getPacket
  }, {
    path: '/freeBooks',
    component: freeBooks
  }, {
    path: '/freeBooks/bookList',
    component: bookList
  }, {
    path: '/freeBooks/receiveInfo',
    component: receiveInfo
  }]
})
