import Vue from 'vue'
import Router from 'vue-router'

const init = () => import('@/pages/init/init')
const index = () => import('@/pages/index/index')
const lita = () => import('@/pages/lita/lita')
const songshu = () => import('@/pages/songshu/songshu')
const addition = () => import('@/pages/addition/addition')
const counter = () => import('@/pages/counter/counter')
const shop = () => import('@/pages/shop/shop')
const daili = () => import('@/pages/daili/daili')
const outline = () => import('@/pages/outline/outline')
const audiolist = () => import('@/pages/audiolist/audiolist')
const videodetail = () => import('@/pages/videodetail/videodetail')
const audiodetail = () => import('@/pages/audiodetail/audiodetail')
const newdetail = () => import('@/pages/newdetail/newdetail')
const home = () => import('@/pages/home/home')
const myfund = () => import('@/pages/myfund/myfund')
const extend = () => import('@/pages/extend/extend')
const myintegral = () => import('@/pages/myintegral/myintegral')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: init
    },
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
    },
    {
      path: '/songshu',
      name: 'songshu',
      component: songshu
    },
    {
      path: '/addition',
      name: 'addition',
      component: addition
    },
    {
      path: '/counter',
      name: 'counter',
      component: counter
    },
    {
      path: '/outline',
      name: 'outline',
      component: outline
    },
    {
      path: '/daili',
      name: 'daili',
      component: daili
    },
    {
      path: '/shop',
      name: 'shop',
      component: shop
    },
    {
      path: '/audiolist/:pageId',
      name: 'audiolist',
      component: audiolist,
      props: true
    },
    {
      path: '/videodetail/:projectId',
      name: 'videodetail',
      component: videodetail,
      props: true
    },
    {
      path: '/audiodetail/:projectId',
      name: 'audiodetail',
      component: audiodetail,
      props: true
    },
    {
      path: '/newdetail/:newId',
      name: 'newdetail',
      component: newdetail,
      props: true
    }
  ]
})
