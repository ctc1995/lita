<template>
  <div class="detail-footer">
    <div class="btn index" @click="getUrl('index')">
      <span>首页</span>
    </div>
    <div class="btn price">
      <!-- <p>￥{{price}}</p> -->
    </div>
    <div class="btn shop" @click="unifiedorder">
      <span>点击购买</span>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'price',
    'shopUrl'
  ],
  data () {
    return {
      appid: this.$getStorage('appid'),
      openid: this.$getStorage('openid'),
      mch_id: this.$getStorage('mch_id'),
      mch_key: this.$getStorage('mch_key'),
      totleFee: this.$getStorage('member_fee') * 100,
      prepayId: '',
      orderBody: '利他盈利模式-会员'
    }
  },
  methods: {
    getUrl (str) {
      this.$router.push({'path': 'index'})
    },
    // 统一下单
    unifiedorder () {
      let spbillCreateIp = '113.91.52.211'
      // this.http.get('ip', 'http://pv.sohu.com/cityjson?ie=utf-8').then(res => {
      //   spbillCreateIp = res.data.cip
      // })
      let nonceStr = this.$util.rand(Math.random() * 13467)
      let outTradeNo = this.$util.createNum(4)
      let notifyUrl = 'https://ysw.54yym.com/admin.php'
      let data = {
        'appid': this.appid,
        'mch_id': this.mch_id,
        'nonce_str': nonceStr,
        'body': this.orderBody,
        'out_trade_no': outTradeNo,
        'total_fee': this.totleFee,
        'notify_url': notifyUrl,
        'spbill_create_ip': spbillCreateIp,
        'trade_type': 'JSAPI',
        'openid': this.$getStorage('openid')
      }
      // console.log(this.appid, this.mch_id, nonceStr, '利他盈利模式-书籍', outTradeNo, 15, spbillCreateIp, 'JSAPI')
      let string1 = `appid=${this.appid}&body=${this.orderBody}&mch_id=${this.mch_id}&nonce_str=${nonceStr}&notify_url=${notifyUrl}&openid=${this.$getStorage('openid')}&out_trade_no=${outTradeNo}&spbill_create_ip=${spbillCreateIp}&total_fee=${this.totleFee}&trade_type=JSAPI`
      string1 += `&key=${this.mch_key}`
      // console.log(string1)
      let sign = this.$md5(string1).toUpperCase()
      // console.log(sign)
      data['sign'] = sign
      // console.log('start')
      // console.log(this.$util.js2xml(data))
      // console.log('end')
      this.$post('Login/wx_unifiedorder', {'xml': this.$util.js2xml(data)}).then(res => {
        // console.log(res.data)
        this.prepayId = res.data.split('<prepay_id><![CDATA[')[1].split(']]></prepay_id>')[0]
        // this.pay()
        if (typeof WeixinJSBridge == "undefined"){//eslint-disable-line
          if ( document.addEventListener ) {//eslint-disable-line
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)//eslint-disable-line
          } else if (document.attachEvent) {//eslint-disable-line
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady)//eslint-disable-line
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)//eslint-disable-line
          }
        } else {
          this.pay()
        }
      })
    },
    // 调起支付
    pay () {
      let that = this
      let nonceStr = this.$util.rand(Math.random() * 13467).toString()
      let timeStamp = Math.round(new Date().getTime() / 1000).toString()
      let packageVal = 'prepay_id=' + this.prepayId
      let string2 = `appId=${this.appid}&nonceStr=${nonceStr}&package=${packageVal}&signType=MD5&timeStamp=${timeStamp}`
      string2 += `&key=${this.mch_key}`
      let paySign = this.$md5(string2).toUpperCase().toString()
      console.log(nonceStr, timeStamp, packageVal, paySign)
      console.log(string2)
      WeixinJSBridge.invoke(//eslint-disable-line
        'getBrandWCPayRequest', {
          'appId': this.appid, // 公众号名称，由商户传入
          'timeStamp': timeStamp, // 时间戳，自1970年以来的秒数
          'nonceStr': nonceStr, // 随机串
          'package': packageVal,
          'signType': 'MD5', // 微信签名方式
          'paySign': paySign // 微信签名
        },
        function (res) {
          if (res.err_msg == 'get_brand_wcpay_request:ok') {//eslint-disable-line
            let rankData = {
              'userid': that.$getStorage('userId'),
              'type': '1',
              'account_token': that.$getStorage('account_token')
            }
            that.http.post(undefined, 'user/upgrade_member', rankData).then(res => {
              if (res.data.code === 1) {
                that.$Message({
                  showClose: true,
                  message: '支付成功！会员身份生效',
                  type: 'success'
                })
                that.$setStorage('rank_id', 2)
                that.$setStorage('rankName', '会员')
              } else {
                that.$Message({
                  showClose: true,
                  message: res.data.msg + ' 请联系管理员',
                  type: 'error'
                })
              }
            })
            // 使用以上方式判断前端返回,微信团队郑重提示：
            // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
          } else {
            console.log(res)
          }
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-footer{
    width: 100vw;
    height: 13.034vw;
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
    .index{
        width: 26.66vw;
        border-right: 1px solid #e6e6e6;
    }
    .price, .shop{
        width: 36.6575vw;
    }
    .shop{
        background-color: #F73535;
        color: #ffffff;
    }
}
</style>
