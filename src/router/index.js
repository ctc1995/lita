import Vue from 'vue'
import Router from 'vue-router'

const init = () => import('@/pages/init/init')
const index = () => import('@/pages/index/index')
const lita = () => import('@/pages/lita/lita')
const home = () => import('@/pages/home/home')
const myfund = () => import('@/pages/myfund/myfund')
const extend = () => import('@/pages/extend/extend')
const myintegral = () => import('@/pages/myintegral/myintegral')

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
    },
    {
      path: '/myfund',
      name: 'myfund',
      component: myfund
    },
    {
      path: '/extend',
      name: 'extend',
      component: extend
    },
    {
      path: '/myintegral',
      name: 'myintegral',
      component: myintegral
    }
  ]
})
