// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import util from './services/util'
import md5 from 'js-md5'
import {get, post, put} from './services/http'
import {
  Carousel,
  CarouselItem,
  Message,
  MessageBox,
  Cascader,
  Loading,
  Tabs,
  TabPane
} from 'element-ui'

Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Cascader)
Vue.use(Tabs)
Vue.use(TabPane)
// Vue.use(MessageBox)

Vue.prototype.$loading = Loading.service
Vue.config.productionTip = false
Vue.prototype.$Message = Message
Vue.prototype.$MessageBox = MessageBox
// Vue.prototype.$Cascader = Cascader
Vue.prototype.$axios = axios
Vue.prototype.$util = util
Vue.prototype.$md5 = md5
Vue.prototype.$get = get
Vue.prototype.$post = post
Vue.prototype.$put = put
Vue.prototype.$setStorage = util.setStorage
Vue.prototype.$getStorage = util.getStorage
Vue.prototype.$gobalData = {
  rootUrl: 'https://ysw.54yym.com/api/'
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
