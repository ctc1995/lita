<template>
  <div class="outline">
    <img mode="widthFix" src="http://54yym.com/2775b201811011835048115.png" alt="线下活动">
    <!-- <div class="click" @click="showCardFunc(true)" v-if="!showCard"></div> -->
    <div class="footer">
      <div class="btn index" @click="showCardFunc(true, false)">
        <span>预约参加</span>
      </div>
      <div class="btn price">
        <p>￥2980</p>
      </div>
      <div class="btn shop" @click="showCardFunc(true, true)">
        <span>预订座位</span>
      </div>
    </div>
    <div class="message" v-if="showCard">
      <div class="mask" @click="showCardFunc(false)"></div>
      <div class="form">
        <input id="name" placeholder="输入您的名字" auto-focus v-model="name"/>
        <input id="phone"  maxlength="11" placeholder="输入您的手机号码"  v-model="phone"/>
        <p class="tip" v-if="tag">活动火爆，预约可能存在无座情况，推荐预订座位！</p>
        <button type="primary" size="mini" @click="postMsg()">提交信息</button>
      </div>
    </div>
  </div>
</template>
<script>
import { formatTime } from '../../services/util'

export default {
  data () {
    return {
      prepayId: '',
      totleFee: 298000,
      orderBody: '利他盈利模式-线下课程',
      tag: false,
      showCard: false,
      name: '',
      phone: '',
      colList: [
        {
          cover: '../../images/audio-bg.jpg',
          colStatus: false,
          colNum: 980,
          colTitle: '商业分析框架讲解《商业分析 框架讲解》',
          colPrice: 99,
          colCtime: formatTime(new Date(1539655200000)),
          colAddress: '平湖华南发展大厦'
        },
        {
          cover: '../../images/audio-bg.jpg',
          colStatus: false,
          colNum: 980,
          colTitle: '商业分析框架讲解《商业分析 框架讲解》',
          colPrice: 99,
          colCtime: formatTime(new Date(1539655200000)),
          colAddress: '平湖华南发展大厦'
        }
      ]
    }
  },
  methods: {
    showCardFunc (bol, tag) {
      this.showCard = bol
      this.tag = tag
    },
    postMsg () {
      // if (this.tag) {
      //   this.unifiedorder()
      // } else {
      let msg = `线下课程意向客户---姓名：${this.phone} 电话：${this.name}`
      let data = {
        'content': msg,
        'account_token': this.$util.getStorage('account_token'),
        'userid': this.$util.getStorage('userId')
      }
      this.$post('user/feedback', JSON.parse(JSON.stringify(data))).then(res => {
        console.log(res.data)
        if (res.data.code === 1) {
          this.showCard = false
          this.$Message({//eslint-disable-line
            message: `我们将与您联系`,
            type: 'success'
          })
        }
      })
      // }
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
      })
    }
    // 调起支付
    /* pay () {
      let that = this
      let nonceStr = this.$util.rand(Math.random() * 13467).toString()
      let timeStamp = Math.round(new Date().getTime() / 1000).toString()
      let packageVal = 'prepay_id=' + this.prepayId
      let string2 = `appId=${this.gobalData.appid}&nonceStr=${nonceStr}&package=${packageVal}&signType=MD5&timeStamp=${timeStamp}`
      string2 += `&key=${this.gobalData.key}`
      let paySign = this.$md5(string2).toUpperCase().toString()
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
          let msg = `线下课程已付款客户---订单号：${that.prepayId} 姓名：${that.phone} 电话：${that.name}`
          let data = {
            'content': msg,
            'account_token': that.$util.getStorage('account_token'),
            'userid': that.$util.getStorage('userId')
          }
          that.http.post(undefined, 'user/feedback', JSON.parse(JSON.stringify(data))).then(res => {
            console.log(res.data)
            if (res.data.code === 1) {
              that.showCard = false
              wx.showToast({
                title: '我们将与您联系'
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
  }
}
</script>
<style lang="scss" scoped>
.outline{
  width: 100vw;
  img{
    width: 100vw;
    margin-bottom:96rpx;
  }
  .click{
    width: 100vw;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
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
  .message{
    width: 100vw;
    height: 100vh;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    position:fixed;
    top:0;
    left:0;
    .mask{
      width: 100vw;
      height: 100vh;
      background-color: rgba(0,0,0,.3);
      position: absolute;
      z-index: 1;
    }
    .form{
      background-color: #ffffff;
      border: 1px solid #eee;
      border-radius: 5px;
      padding: 2.6666vw;
      box-sizing: border-box;
      width:59.985vw;
      text-align:center;
      z-index: 2;
      .tip{
        font-size:12px;
        text-align:start;
        color:red;
      }
      input{
        margin:18rpx 0;
        border-radius:3px;
        border:1px solid #eee;
        padding:1.3333vw 2.6666vw;
        font-size:14px;
      }
    }
  }
}

.cloumn-container{
  width: 100vw;
  padding: 24rpx 30rpx 30rpx;
  box-sizing: border-box;
  .cloumn-list{
    .cloumn-item{
      width: 690rpx;
      margin-bottom: 50rpx;
      .item-img{
        width: 690rpx;
        height: 460rpx;
        position: relative;
        img{
          width: 100%;
          height: 100%;
        }
        .col-info{
          width: 100%;
          height: 60rpx;
          line-height: 60rpx;
          color: #fff;
          font-size: 14px;
          background-color: rgba(0,0,0,.3);
          padding: 0 34rpx;
          display: flex;
          justify-content: space-between;
          box-sizing: border-box;
          position: absolute;
          bottom: 0;
          left: 0;
        }
      }
      .item-title{
        font-size: 16px;
        color: #262626;
        margin: 24rpx 0 8rpx;
      }
      .item-info{
        height: 44rpx;
        line-height: 44rpx;
        font-size: 12px;
        color: #999;
        display: flex;
        justify-content: space-between;
        .item-price{
          font-size: 16px;
          color: #F73535;
        }
      }
    }
    .cloumn-item:last-child{
      margin-bottom: 0;
    }
  }
}
</style>
