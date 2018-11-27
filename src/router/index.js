import Vue from 'vue'
import Router from 'vue-router'

const init = () => import('../pages/init/init')
const index = () => import('../pages/index/index')
const lita = () => import('../pages/lita/lita')
const songshu = () => import('../pages/songshu/songshu')
const addition = () => import('../pages/addition/addition')
const counter = () => import('../pages/counter/counter')
const shop = () => import('../pages/shop/shop')
const daili = () => import('../pages/daili/daili')
const outline = () => import('../pages/outline/outline')
const audiolist = () => import('../pages/audiolist/audiolist')
const videodetail = () => import('../pages/videodetail/videodetail')
const audiodetail = () => import('../pages/audiodetail/audiodetail')
const newdetail = () => import('../pages/newdetail/newdetail')
const home = () => import('../pages/home/home')
const myfund = () => import('../pages/myfund/myfund')
const extend = () => import('../pages/extend/extend')
const myintegral = () => import('../pages/myintegral/myintegral')
const coursebuy = () => import('../pages/coursebuy/coursebuy')
const collect = () => import('../pages/collect/collect')
const addmanage = () => import('../pages/addmanage/addmanage')
const mymessage = () => import('../pages/mymessage/mymessage')
const suggest = () => import('../pages/suggest/suggest')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: init,
      meta: {
        title: '利他盈利模式'
      }
    },
    {
      path: '/init',
      name: 'init',
      component: init,
      meta: {
        title: '利他盈利模式'
      }
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      meta: {
        title: '利他盈利模式'
      }
    },
    {
      path: '/lita',
      name: 'lita',
      component: lita,
      meta: {
        title: '利他-线下课程'
      }
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      meta: {
        title: '利他-个人中心'
      }
    },
    {
      path: '/myfund',
      name: 'myfund',
      component: myfund,
      meta: {
        title: '利他-我的奖金'
      }
    },
    {
      path: '/extend',
      name: 'extend',
      component: extend,
      meta: {
        title: '利他-我的推广'
      }
    },
    {
      path: '/myintegral',
      name: 'myintegral',
      component: myintegral,
      meta: {
        title: '利他-我的积分'
      }
    },
    {
      path: '/songshu',
      name: 'songshu',
      component: songshu,
      meta: {
        title: '利他-领取书籍'
      }
    },
    {
      path: '/addition',
      name: 'addition',
      component: addition,
      meta: {
        title: '利他-添加收货地址'
      }
    },
    {
      path: '/counter',
      name: 'counter',
      component: counter,
      meta: {
        title: '利他-298会员'
      }
    },
    {
      path: '/outline',
      name: 'outline',
      component: outline,
      meta: {
        title: '利他-线下课程'
      }
    },
    {
      path: '/daili',
      name: 'daili',
      component: daili,
      meta: {
        title: '利他-980代理'
      }
    },
    {
      path: '/shop',
      name: 'shop',
      component: shop,
      meta: {
        title: '利他-书籍商城'
      }
    },
    {
      path: '/audiolist/:pageId',
      name: 'audiolist',
      component: audiolist,
      props: true,
      meta: {
        title: '利他-列表'
      }
    },
    {
      path: '/videodetail/:projectId',
      name: 'videodetail',
      component: videodetail,
      props: true,
      meta: {
        title: '利他-视频'
      }
    },
    {
      path: '/audiodetail/:projectId',
      name: 'audiodetail',
      component: audiodetail,
      props: true,
      meta: {
        title: '利他-音频'
      }
    },
    {
      path: '/newdetail/:newId',
      name: 'newdetail',
      component: newdetail,
      props: true,
      meta: {
        title: '利他-新闻'
      }
    },
    {
      path: '/coursebuy',
      name: 'coursebuy',
      component: coursebuy,
      meta: {
        title: '利他-已购课程'
      }
    },
    {
      path: '/collect',
      name: 'collect',
      component: collect,
      meta: {
        title: '利他-我的收藏'
      }
    },
    {
      path: '/addmanage',
      name: 'addmanage',
      component: addmanage,
      meta: {
        title: '利他-地址管理'
      }
    },
    {
      path: '/suggest',
      name: 'suggest',
      component: suggest,
      meta: {
        title: '利他-意见反馈'
      }
    },
    {
      path: '/mymessage',
      name: 'mymessage',
      component: mymessage,
      meta: {
        title: '利他-个人信息'
      }
    }
  ]
})
