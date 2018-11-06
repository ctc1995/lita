<template>
    <div class="shopCard">
        <div class="card">
            <div class="card-title">
                <p>付费内容需购买</p>
            </div>
            <div class="card-body">
                <!-- <div class="card-item" @click="selectType(0)">
                    <icon type="success" size="20" v-if="shopType == 0"/>
                    <p class="shop-type">
                        <span>购买专辑</span>
                        <span class="price">￥38</span>
                    </p>
                    <p class="tips">
                        注：购买后解锁此专辑下的所有项目
                    </p>
                </div> -->
                <div class="card-item" @click="selectType(1)">
                    <i class="el-icon-circle-check"></i>
                    <p class="shop-type">
                        <span>成为会员</span>
                        <span class="price">￥{{totleFee/100}}</span>
                    </p>
                    <p class="tips">
                        注：所有非特殊专辑均对会员开放
                    </p>
                </div>
            </div>
            <div class="card-pay">
                <img src="../assets/images/wechat.png" alt="微信支付">
                <span>微信支付</span>
                <div class="select">
                    <i class="cricle"></i>
                </div>
            </div>
            <div class="submit-btn" @click="unifiedorder()">
                去支付
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
      orderBody: '利他盈利模式-会员'
    }
  },
  methods: {
    selectType (index) {
      this.shopType = index
    }
    // 统一下单
    /* unifiedorder () {
      let spbillCreateIp = '113.91.52.211'
      let nonceStr = this.$util.rand(Math.random() * 13467)
      let outTradeNo = this.$util.createNum(4)
      let notifyUrl = 'https://ysw.54yym.com/admin.php'
      let data = {
        'appid': this.gobalData.appid,
        'mch_id': this.gobalData.mch_id,
        'nonce_str': nonceStr,
        'body': this.orderBody,
        'out_trade_no': outTradeNo,
        'total_fee': this.totleFee,
        'notify_url': notifyUrl,
        'spbill_create_ip': spbillCreateIp,
        'trade_type': 'JSAPI',
        'openid': this.$util.getStorage('openid')
      }
      // console.log(this.gobalData.appid, this.gobalData.mch_id, nonceStr, '利他盈利模式-书籍', outTradeNo, 15, spbillCreateIp, 'JSAPI')
      let string1 = `appid=${this.gobalData.appid}&body=${this.orderBody}&mch_id=${this.gobalData.mch_id}&nonce_str=${nonceStr}&notify_url=${notifyUrl}&openid=${this.$util.getStorage('openid')}&out_trade_no=${outTradeNo}&spbill_create_ip=${spbillCreateIp}&total_fee=${this.totleFee}&trade_type=JSAPI`
      string1 += `&key=${this.gobalData.key}`
      // console.log(string1)
      let sign = this.$md5(string1).toUpperCase()
      // console.log(sign)
      data['sign'] = sign
      // console.log('start')
      // console.log(this.$util.js2xml(data))
      // console.log('end')
      this.http.post(undefined, 'Login/wx_unifiedorder', {'xml': this.$util.js2xml(data)}).then(res => {
        // console.log(res.data)
        this.prepayId = res.data.split('<prepay_id><![CDATA[')[1].split(']]></prepay_id>')[0]
        this.pay()
      })
    }, */
    // 调起支付
    /* pay () {
      let that = this
      let nonceStr = this.$util.rand(Math.random() * 13467).toString()
      let timeStamp = Math.round(new Date().getTime() / 1000).toString()
      let packageVal = 'prepay_id=' + this.prepayId
      let string2 = `appId=${this.gobalData.appid}&nonceStr=${nonceStr}&package=${packageVal}&signType=MD5&timeStamp=${timeStamp}`
      string2 += `&key=${this.gobalData.key}`
      let paySign = this.$md5(string2).toUpperCase().toString()
      // let that = this
      console.log(nonceStr, timeStamp, packageVal, paySign)
      console.log(string2)
      wx.requestPayment({
        // 'appId': this.gobalData.appid,
        'timeStamp': timeStamp,
        'nonceStr': nonceStr,
        'package': packageVal,
        'signType': 'MD5',
        'paySign': paySign,
        'success': function (res) {
          console.log(res)
          let rankData = {
            'userid': that.$util.getStorage('userId'),
            'type': '1',
            'account_token': that.$util.getStorage('account_token')
          }
          that.http.post(undefined, 'user/upgrade_member', rankData).then(res => {
            if (res.data.code === 1) {
              wx.showToast({
                title: '请重新进入小程序,以生效身份!',
                icon: 'none'
              })
            } else {
              wx.showToast({
                title: res.data.msg + '请联系管理员',
                icon: 'none'
              })
            }
          })
        },
        'fail': function (res) {
          console.log(res)
        },
        'complete': function (res) {
          console.log(res)
        }
      })
    } */
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
<style lang="scss" scoped>
.shopCard {
  .card {
    width: 86.645vw;
    height: 69.316vw;
    background-color: #ffffff;
    border-radius: 1.0664;
    box-shadow: 0 0 18px rgba(0, 0, 0, 0.5);
    position: relative;
    .card-title {
      width: 100%;
      height: 12.1303vw;
      font-size: 19px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #bfbfbf;
      position: relative;
      .close {
        width: 4.5322vw;
        height: 4.5322vw;
        position: absolute;
        left: 4.2656vw;
      }
    }
    .card-body {
      padding: 0 3.7324vw;
      box-sizing: border-box;
      .card-item {
        width: 100%;
        padding-left: 10.664vw;
        margin: 6.665vw 0;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;
        i {
          font-size: 2rem;
          color:rgb(9, 187, 7);
          position: absolute;
          left: 1.333vw;
        }
        .shop-type {
          width: 100%;
          font-size: 16px;
          color: #262626;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          .price {
            color: #f73535;
          }
        }
        .tips {
          width: 100%;
          font-size: 14px;
          color: #808080;
        }
      }
    }
    .card-pay {
      padding: 2.666vw 5.0654vw;
      box-sizing: border-box;
      border-top: 1px solid #e6e6e6;
      border-bottom: 1px solid #e6e6e6;
      display: flex;
      align-items: center;
      position: relative;
      img {
        width: 6.9316vw;
        height: 6.9316vw;
        margin-right: 2.666vw;
      }
      span {
        font-size: 14px;
        color: #595959;
      }
      .select {
        width: 3.7324vw;
        height: 3.7324vw;
        background-color: transparent;
        border: 1px solid #f73535;
        border-radius: 50%;
        position: absolute;
        right: 5.332vw;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .cricle {
        width: 2.666vw;
        height: 2.666vw;
        background-color: #f73535;
        border-radius: 50%;
        position: absolute;
      }
    }
    .submit-btn {
      width: 78.647vw;
      height: 11.7304vw;
      background-color: #ffd100;
      color: #ffffff;
      line-height: 11.7304vw;
      text-align: center;
      border-radius: 4px;
      margin: 16px auto 0;
    }
  }
}
</style>
