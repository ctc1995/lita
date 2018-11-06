// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import {get, post, put} from './services/http'
import { setStorage, getStorage } from './services/util'
import {
  Carousel,
  CarouselItem,
  Message
} from 'element-ui'

Vue.use(Carousel)
Vue.use(CarouselItem)
// Vue.use(Message)

Vue.config.productionTip = false
Vue.prototype.$Message = Message
Vue.prototype.$axios = axios
Vue.prototype.$get = get
Vue.prototype.$post = post
Vue.prototype.$put = put
Vue.prototype.$setStorage = setStorage
Vue.prototype.$getStorage = getStorage
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
