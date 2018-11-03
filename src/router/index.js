import Vue from 'vue'
import Router from 'vue-router'

const init = () => import('@/pages/init/init')
const index = () => import('@/pages/index/index')
const lita = () => import('@/pages/lita/lita')
const home = () => import('@/pages/home/home')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/lita',
      name: 'lita',
      component: lita
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/init',
      name: 'init',
      component: init
    }
  ]
})
