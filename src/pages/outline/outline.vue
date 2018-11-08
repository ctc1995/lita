<template>
  <div class="outline">
    <img mode="widthFix" src="http://54yym.com/2775b201811011835048115.png" alt="线下活动">
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
    <!-- <div class="message" v-if="showCard">
      <div class="mask" @click="showCardFunc(false)"></div>
      <div class="form">
        <input id="name" placeholder="输入您的名字" auto-focus v-model="name"/>
        <input id="phone"  maxlength="11" placeholder="输入您的手机号码"  v-model="phone"/>
        <p class="tip" v-if="tag">活动火爆，预约可能存在无座情况，推荐预订座位！</p>
        <button type="primary" size="mini" @click="postMsg()">提交信息</button>
      </div>
    </div> -->
    <el-dialog width="75%" title="线下活动报名" :visible.sync="showCard">
      <el-form :inline="true" :model="form" class="form">
        <el-form-item>
          <el-input v-model="form.name" placeholder="名字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.phone" placeholder="手机号码"></el-input>
        </el-form-item>
        <p class="tip" v-if="!tag">活动火爆，预约可能存在无座情况，推荐预订座位！</p>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="postMsg()">提交信息</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { formatTime } from '../../services/util'

export default {
  data () {
    return {
      appid: this.$getStorage('appid'),
      openid: this.$getStorage('openid'),
      mch_id: this.$getStorage('mch_id'),
      mch_key: this.$getStorage('mch_key'),
      prepayId: '',
      totleFee: 1,
      orderBody: '利他盈利模式-线下课程',
      tag: false,
      showCard: false,
      form: {
        name: '',
        phone: ''
      },
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
      if (this.tag) {
        this.unifiedorder()
      } else {
        let msg = `线下课程意向客户---姓名：${this.form.phone} 电话：${this.form.name}`
        let data = {
          'content': msg,
          'account_token': this.$getStorage('account_token'),
          'userid': this.$getStorage('userid')
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
      }
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
        this.pay()
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
            console.log(res)
            let msg = `线下课程已付款客户---订单号：${that.prepayId} 姓名：${that.form.phone} 电话：${that.form.name}`
            let data = {
              'content': msg,
              'account_token': that.$getStorage('account_token'),
              'userid': that.$getStorage('userid')
            }
            that.$post('user/feedback', JSON.parse(JSON.stringify(data))).then(res => {
              console.log(res.data)
              if (res.data.code === 1) {
                that.showCard = false
                that.$Message({
                  showClose: true,
                  message: '抢座成功，我们将与您联系！',
                  type: 'success'
                })
              }
            })
          }
        }
      )
    }
  }
}
</script>
<style lang="scss" scoped>

.tip{
  font-size:12px;
  text-align:start;
  color:red;
  margin-top: 10px;
}
.el-form-item+.el-form-item {
  margin-bottom: 0;
}
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
</style>
