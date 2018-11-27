<template>
  <el-form class="home" ref="form" :model="form" label-width="80px">
    <el-form-item label="收货人">
      <el-input v-model="form.name" placeholder="收货人"></el-input>
    </el-form-item>
    <el-form-item label="手机号码">
      <el-input type="number" v-model="form.phone" placeholder="手机号码">
        <i slot="suffix">+86</i>
      </el-input>
    </el-form-item>
    <el-form-item label="省市区">
      <el-cascader placeholder="省市区" class="item input-item" :options="provinces" @change="change" @active-item-change="handleItemChange" :props="props"></el-cascader>
    </el-form-item>
    <el-form-item label="详细地址">
      <el-input type="textarea" v-model="form.address" placeholder="路道名、门牌号、小区、楼栋号等"></el-input>
    </el-form-item>
    <el-form-item label="设为默认地址" label-width="9rem" sytle="text-align:start;">
      <el-switch v-model="form.default"></el-switch>
    </el-form-item>
    <el-form-item label-width="0">
      <el-button type="primary" @click="submitForm">立即提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import VDistpicker from 'v-distpicker'

export default {
  data () {
    return {
      appid: this.$getStorage('appid'),
      openid: this.$getStorage('openid'),
      mch_id: this.$getStorage('mch_id'),
      mch_key: this.$getStorage('mch_key'),
      // http: new this.$util.Http(),
      form: {
        name: '',
        phone: '',
        address: '',
        default: false
      },
      userInfo: {},
      currentData: 0,
      menuType: 0,
      begin: null,
      status: 1,
      end: null,
      isVisible: false,
      animationData: {},
      animation: {},
      atext: '省市区',
      text: '',
      animationAddressMenu: {},
      addressMenuIsShow: false,
      show: false,
      value: [0, 0, 0],
      provinces: [], // 1
      citys: [], // 2
      areas: [], // 3
      provincesKey: 0,
      citysKey: 36,
      areasKey: 37,
      swipArr: [0, 0, 0],
      prepayId: '',
      totleFee: 0,
      props: {
        label: 'area_name',
        value: 'area_id',
        children: 'cities'
      }
      // animation: {}
    }
  },
  components: {
    VDistpicker
  },
  created () {
    this.$wxJS(location.href.split('#')[0])
    this.$get('Index/province_city_area').then(res => {
      for (const item of res.data.data) {
        let obj = item
        obj['cities'] = []
        this.provinces.push(obj)
      }
      this.provincesKey = this.provinces[0].area_id
    })
    this.totleFee = this.$getStorage('local_postage') * 100
  },
  methods: {
    getIndex (obj, id) {
      // let newObj = {};
      for (let index in obj) {
        if (obj[index]['area_id'] === id) {
          return parseInt(index)
        }
      }
    },
    selAddress (val) {
      let that = this
      let provinceIndex = val[0]
      let cityIndex = this.getIndex(that.provinces[provinceIndex - 1]['cities'], val[1]) || 0
      if (
        that.provinces[provinceIndex - 1]['area_deep'] === 1 &&
        that.provinces[provinceIndex - 1]['cities'].length === 0) {
        console.log(1)
        that.provincesKey = that.provinces[provinceIndex - 1]['area_id']
        let cityData = {
          type: 2,
          area_parent_id: that.provincesKey
        }
        that.$post('Index/province_city_area', cityData).then(res => {
          for (const item of res.data.data) {
            let obj = item
            obj['cities'] = []
            that.provinces[provinceIndex - 1]['cities'].push(obj)
          }
        })
      } else if (
        that.provinces[provinceIndex - 1]['cities'][cityIndex]['area_deep'] === 2 &&
        that.provinces[provinceIndex - 1]['cities'][cityIndex]['cities'].length === 0) {
        console.log(2)
        that.citysKey = that.provinces[provinceIndex - 1]['cities'][cityIndex]['area_id']
        let cityData = {
          type: 3,
          area_parent_id: that.citysKey
        }
        that.$post('Index/province_city_area', cityData).then(res => {
          for (const item of res.data.data) {
            let obj = item
            // obj['cities'] = []
            that.provinces[provinceIndex - 1]['cities'][cityIndex]['cities'].push(obj)
          }
        })
      } else {
        console.log(3)
        let areaIndex = this.getIndex(that.provinces[provinceIndex - 1]['cities'][cityIndex]['cities'], val[2]) || 0
        console.log('hahaha' + areaIndex)
        that.areasKey = that.provinces[provinceIndex - 1]['cities'][cityIndex]['cities'][areaIndex]['area_id']
      }
    },
    change (val) {
      console.log(val)
      this.selAddress(val)
    },
    handleItemChange (val) {
      console.log(val)
      this.selAddress(val)
    },
    // json转义XML
    js2xml (obj) {
      let xml = '<xml>'
      for (let [k, v] of Object.entries(obj)) {
        let el = `<${k}>${v}</${k}>`
        xml += el
      }
      xml += '</xml>'
      return xml
    },
    // 统一下单
    unifiedorder (addId) {
      let spbillCreateIp = '113.91.52.211'
      let nonceStr = this.rand(Math.random() * 13467)
      let outTradeNo = this.createNum(4)
      let notifyUrl = 'https://ysw.54yym.com/admin.php'
      let data = {
        appid: this.appid,
        mch_id: this.mch_id,
        nonce_str: nonceStr,
        body: '利他盈利模式-书籍',
        out_trade_no: outTradeNo,
        total_fee: this.totleFee,
        notify_url: notifyUrl,
        spbill_create_ip: spbillCreateIp,
        trade_type: 'JSAPI',
        openid: this.$getStorage('openid')
      }
      // console.log(this.gobalData.appid, this.gobalData.mch_id, nonceStr, '利他盈利模式-书籍', outTradeNo, 15, spbillCreateIp, 'JSAPI')
      let string1 = `appid=${
        this.appid
      }&body=利他盈利模式-书籍&mch_id=${
        this.mch_id
      }&nonce_str=${nonceStr}&notify_url=${notifyUrl}&openid=${this.$getStorage(
        'openid'
      )}&out_trade_no=${outTradeNo}&spbill_create_ip=${spbillCreateIp}&total_fee=${
        this.totleFee
      }&trade_type=JSAPI`
      string1 += `&key=${this.mch_key}`
      // console.log(string1)
      let sign = this.$md5(string1).toUpperCase()
      // console.log(sign)
      data['sign'] = sign
      // console.log('start')
      // console.log(this.js2xml(data))
      // console.log('end')
      this.$post('Login/wx_unifiedorder', {
        xml: this.$util.js2xml(data)
      }).then(res => {
        // console.log(res.data)
        this.prepayId = res.data
          .split('<prepay_id><![CDATA[')[1]
          .split(']]></prepay_id>')[0]
        this.pay(addId)
      })
    },
    // 调起支付
    pay (addId) {
      let nonceStr = this.rand(Math.random() * 13467).toString()
      let timeStamp = Math.round(new Date().getTime() / 1000).toString()
      let packageVal = 'prepay_id=' + this.prepayId
      let string2 = `appId=${this.appid}&nonceStr=${nonceStr}&package=${packageVal}&signType=MD5&timeStamp=${timeStamp}`
      string2 += `&key=${this.mch_key}`
      let paySign = this.$md5(string2)
        .toUpperCase()
        .toString()
      let that = this
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
            let data = {
              account_token: that.$util.getStorage('account_token'),
              userid: that.$util.getStorage('userid'),
              price: that.totleFee,
              product_id: 0,
              postage: that.totleFee,
              ordernum: that.prepayId,
              status: 1,
              address_id: addId,
              type: 1
            }
            that.$post('user/add_order', data).then(res => {
              that.$Message({
                showClose: true,
                message: res.data.msg,
                type: 'success'
              })
            })
          }
        }
      )
    },
    // 生成订单号
    createNum (index) {
      let random = new Date().getTime().toString()
      let num =
        random + this.rand(Math.random() * random.slice(random.length - index))
      return num
    },
    // 随机数算法
    rnd (seed) {
      seed = (seed * 9301 + 49297) % 233280
      return seed / 233280.0
    },
    rand (number) {
      let today = new Date()
      let seed = today.getTime()
      return Math.ceil(this.rnd(seed) * number)
    },
    // 提交收货地址
    submitForm () {
      let data = {
        userid: this.$getStorage('userid'),
        account_token: this.$getStorage('account_token'),
        truename: this.form.name,
        tel: this.form.phone,
        province: this.provincesKey,
        city: this.citysKey,
        area: this.areasKey,
        detailed: this.form.address
      }
      this.form.default ? data.type = 1 : data.type = 0
      console.log(data)
      this.$post('User/add_mod_address', data).then(res => {
        let addId = res.data.data.address_id
        this.$confirm(`请支付${this.$getStorage('local_postage')}元邮费，领取书籍。`, '地址提交成功', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then((res) => {
          this.unifiedorder(addId)
        }).catch((res) => {
          this.$Message.error('支付邮费后才能领取书籍')
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home{
  padding: 10vw 6vw 10vw 3vw;
}
.container {
  min-height: 100vh;
  font-size: 14px;
  color: #000000;
  background-color: rgb(250, 250, 250);
  display: block;
  .spe-address {
    border: none;
    .address-inp {
      height: 15.996vw;
    }
  }
  .defualtadd {
    border: none;
    margin-top: 2.668vw;
  }
}
.item {
  background-color: #ffffff;
  color: #999;
  .receive {
    display: flex;
    align-items: center;
    .rightspan {
      display: inline-block;
      width: 2.3994vw;
      height: 2.3994vw;
      border-top: 1px solid #999;
      border-right: 1px solid #999;
      transform: rotate(45deg);
    }
  }
  image {
    width: 6.3984vw;
    height: 4.7988vw;
  }
}
.input-item {
  display: flex;
  justify-content: space-between;
  .defaultset {
    color: #262626;
  }
}
.save {
  width: 91.977vw;
  height: 9.331vw;
  margin-top: 9.331vw;
  line-height: 9.331vw;
  font-size: 14px;
  background-color: #ffffff;
  color: #262626;
  border: none;
  border-radius: 8px;
}
.picker-view {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.6);
}
.picker-view > div {
  width: 100%;
  display: flex;
  z-index: 12;
  background-color: #ffffff;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 35vh;
  span {
    display: inline-block;
    padding: 1.0664vw 2.668vw;
    border-radius: 0.7998vw;
  }
  .cancel {
    background-color: #d0d0d0;
  }
  .confirm {
    background-color: limegreen;
    color: #ffffff;
  }
}
.picker-item {
  line-height: 9.331vw;
  margin-left: 0.6665vw;
  margin-right: 0.6665vw;
  text-align: center;
}
</style>
