function setStorage (key, data) {
  sessionStorage.setItem(key, data)
}
function getStorage (key) {
  return sessionStorage.getItem(key)
}
function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

// json转义XML
function js2xml (obj) {
  let xml = '<xml>'
  for (let [k, v] of Object.entries(obj)) {
    let el = `<${k}>${v}</${k}>`
    xml += el
  }
  xml += '</xml>'
  return xml
}

// 生成订单号
function createNum (index) {
  let random = new Date().getTime().toString()
  let num = random + this.rand(Math.random() * random.slice(random.length - index))
  return num
}
// 随机数算法
function rnd (seed) {
  seed = (seed * 9301 + 49297) % 233280
  return seed / (233280.0)
}
function rand (number) {
  let today = new Date()
  let seed = today.getTime()
  return Math.ceil(rnd(seed) * number)
}

// WXJS授权

function wxJS (url) {
  const data = {
    url: url
  }
  // if(this.$getStorage('signature') == undefined) {//eslint-disable-line
  this.$get('login/wxmp_access_token', data).then(res => {
    this.$setStorage('timestamp', res.data.data.timestamp)
    this.$setStorage('nonceStr', res.data.data.noncestr)
    this.$setStorage('signature', res.data.data.signature)
    this.$wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: this.$getStorage('appid'), // 必填，公众号的唯一标识
      timestamp: this.$getStorage('timestamp'), // 必填，生成签名的时间戳
      nonceStr: this.$getStorage('nonceStr'), // 必填，生成签名的随机串
      signature: this.$getStorage('signature'), // 必填，签名
      jsApiList: ['chooseWXPay', 'hideAllNonBaseMenuItem', 'updateAppMessageShareData', 'updateTimelineShareData'] // 必填，需要使用的JS接口列表
    })
  })
  // } else {
  //   this.$wx.config({
  //     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
  //     appId: this.$getStorage('appid'), // 必填，公众号的唯一标识
  //     timestamp: this.$getStorage('timestamp'), // 必填，生成签名的时间戳
  //     nonceStr: this.$getStorage('nonceStr'), // 必填，生成签名的随机串
  //     signature: this.$getStorage('signature'), // 必填，签名
  //     jsApiList: ['chooseWXPay', 'updateAppMessageShareData', 'updateTimelineShareData'] // 必填，需要使用的JS接口列表
  //   })
  // }
  // this.$wx.ready(function () {
  //   console.log('wx初始化成功！')
  //   this.$wx.updateAppMessageShareData({
  //     title: '', // 分享标题
  //     desc: '', // 分享描述
  //     link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
  //     imgUrl: '', // 分享图标
  //     success: function () {
  //       // 设置成功
  //     }
  //   })
  // })
  this.$wx.error(function (res) {
    console.log('wx初始化失败！')
    console.log(res)
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
  })
}

export default {
  js2xml,
  createNum,
  rand,
  setStorage,
  getStorage,
  wxJS
}
