<template>
  <div class="counter-warp">
    <img mode="widthFix" src="http://54yym.com/edb14201811021554285308.png" alt="298会员">
    <div class="footer">
      <div class="btn price">
        <p>￥298</p>
      </div>
      <div class="btn shop" @click="unifiedorder()">
        <span>成为会员</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      shopType: 0,
      totleFee: 0,
      prepayId: '',
      orderBody: '利他盈利模式-298会员'
    }
  },
  methods: {
    // 统一下单
    // unifiedorder () {
    //   let spbillCreateIp = '113.91.52.211'
    //   this.http.get('ip', 'http://pv.sohu.com/cityjson?ie=utf-8').then(res => {
    //     spbillCreateIp = res.data.cip
    //   })
    //   let nonceStr = this.$util.rand(Math.random() * 13467)
    //   let outTradeNo = this.$util.createNum(4)
    //   let notifyUrl = 'https://ysw.54yym.com/admin.php'
    //   let data = {
    //     'appid': this.gobalData.appid,
    //     'mch_id': this.gobalData.mch_id,
    //     'nonce_str': nonceStr,
    //     'body': this.orderBody,
    //     'out_trade_no': outTradeNo,
    //     'total_fee': this.totleFee,
    //     'notify_url': notifyUrl,
    //     'spbill_create_ip': spbillCreateIp,
    //     'trade_type': 'JSAPI',
    //     'openid': this.$util.getStorage('openid')
    //   }
    //   // console.log(this.gobalData.appid, this.gobalData.mch_id, nonceStr, '利他盈利模式-书籍', outTradeNo, 15, spbillCreateIp, 'JSAPI')
    //   let string1 = `appid=${this.gobalData.appid}&body=${this.orderBody}&mch_id=${this.gobalData.mch_id}&nonce_str=${nonceStr}&notify_url=${notifyUrl}&openid=${this.$util.getStorage('openid')}&out_trade_no=${outTradeNo}&spbill_create_ip=${spbillCreateIp}&total_fee=${this.totleFee}&trade_type=JSAPI`
    //   string1 += `&key=${this.gobalData.key}`
    //   // console.log(string1)
    //   let sign = this.$md5(string1).toUpperCase()
    //   // console.log(sign)
    //   data['sign'] = sign
    //   // console.log('start')
    //   // console.log(this.$util.js2xml(data))
    //   // console.log('end')
    //   this.http.post(undefined, 'Login/wx_unifiedorder', {'xml': this.$util.js2xml(data)}).then(res => {
    //     // console.log(res.data)
    //     this.prepayId = res.data.split('<prepay_id><![CDATA[')[1].split(']]></prepay_id>')[0]
    //     this.pay()
    //   })
    // },
    // // 调起支付
    // pay () {
    //   let that = this
    //   let nonceStr = this.$util.rand(Math.random() * 13467).toString()
    //   let timeStamp = Math.round(new Date().getTime() / 1000).toString()
    //   let packageVal = 'prepay_id=' + this.prepayId
    //   let string2 = `appId=${this.gobalData.appid}&nonceStr=${nonceStr}&package=${packageVal}&signType=MD5&timeStamp=${timeStamp}`
    //   string2 += `&key=${this.gobalData.key}`
    //   let paySign = this.$md5(string2).toUpperCase().toString()
    //   // let that = this
    //   console.log(nonceStr, timeStamp, packageVal, paySign)
    //   console.log(string2)
    //   wx.requestPayment({
    //     // 'appId': this.gobalData.appid,
    //     'timeStamp': timeStamp,
    //     'nonceStr': nonceStr,
    //     'package': packageVal,
    //     'signType': 'MD5',
    //     'paySign': paySign,
    //     'success': function (res) {
    //       console.log(res)
    //       let rankData = {
    //         'userid': that.$util.getStorage('userId'),
    //         'type': '1',
    //         'account_token': that.$util.getStorage('account_token')
    //       }
    //       that.http.post(undefined, 'user/upgrade_member', rankData).then(res => {
    //         if (res.data.code === 1) {
    //           wx.showToast({
    //             title: '请重新进入小程序,以生效身份!',
    //             icon: 'none'
    //           })
    //         } else {
    //           wx.showToast({
    //             title: res.data.msg + ' 请联系管理员',
    //             icon: 'none'
    //           })
    //         }
    //       })
    //     },
    //     'fail': function (res) {
    //       console.log(res)
    //     },
    //     'complete': function (res) {
    //       console.log(res)
    //     }
    //   })
    // }
  },
  created () {
    this.$get('login/get_company').then(res => {
      console.log(res.data.data)
      // this.totleFee = 1
      this.totleFee = res.data.data.member_fee * 100
    })
  }
}
</script>

<style lang="scss">
.counter-warp{
  padding-bottom: 12.4062vw;
  img{
    width: 100vw;
  }
  .footer{
    width: 100vw;
    height: 13.0634vw;
    background-color: #ffffff;
    display: flex;
    position: fixed;
    bottom: 0;
    border-top: 1px solid #E6E6E6;
    z-index: 99;
    .btn{
        height: 100%;
        color: #F73535;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        font-weight: 500;
    }
    .price, .shop{
        flex: 1;
    }
    .shop{
        background-color: #F73535;
        color: #ffffff;
    }
  }
}
</style>
