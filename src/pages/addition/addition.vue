<template class="home">
  <div class="container">
    <div class="input-item item">
      <input class="weui-input" type="text" placeholder="收货人" v-model="name">
      <div class="receive"><img src="../../assets/images/receive.png" alt=""></div>
    </div>
    <div class="input-item item">
      <input class="weui-input" type="number" placeholder="手机号码" v-model="phone">
      <div class="receive"><span>+86</span></div>
    </div>
    <!-- <div class="item input-item" @click="statusChange()">
      <span >{{atext}}</span>
      <div class="receive"><span class="rightspan"></span></div>
    </div> -->
    <el-cascader class="item input-item" :options="provinces" @active-item-change="handleItemChange" :props="props"></el-cascader>
    <div class="spe-address item">
      <!--<input class="weui-input" type="text" placeholder="详细地址：如路道号、门牌号、小区、楼栋号等" class="address-inp">-->
      <textarea placeholder="详细地址：如路道号、门牌号、小区、楼栋号等" class="weui-textarea address-inp" style="color:#000000" v-model="address"></textarea>
    </div>
    <div class="item input-item defualtadd" >
       <div class="receive"><span class="defaultset">设为默认地址</span></div>
       <switch class="weui-switch"> </switch>
    </div>
    <button class="weui-btn save" @click="submitForm()">确认添加</button>
    <div class="picker-view"  v-if="show" style="">
      <div >
      <div style="height:10% ;width:95%;margin-top:-12%">
        <span @click="cityCancel" class="cancel">取消</span>
        <span style="float: right" @click="citySure" class="confirm">确定</span>
      </div>
      <!--"可示默认的城市，使用后级联选择城市反应很慢就不使用了-->
      <!-- <picker-view style="width: 100%; height:26.68vw;margin-top:2.668vw" @change="cityChange">
        <picker-view-column >
          <div class="picker-item" v-for="(item, index) in provinces" :key="index">
            {{ item.area_name }}
          </div>
        </picker-view-column>
        <picker-view-column >
          <div class="picker-item" v-for="(item, index) in citys" :key="index">
            {{ item.area_name }}
          </div>
        </picker-view-column>
        <picker-view-column >
          <div class="picker-item" v-for="(item, index) in areas" :key="index">
            {{ item.area_name }}
          </div>
        </picker-view-column>
      </picker-view> -->
    </div>
    </div>
   </div>

</template>

<script>
import VDistpicker from 'v-distpicker'

export default {
  data () {
    return {
      // http: new this.$util.Http(),
      name: '',
      phone: '',
      address: '',
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
        value: 'area_name',
        children: 'cities'
      }
      // animation: {}
    }
  },
  components: {
    VDistpicker
  },
  created () {
    // this.scene = res.userId
    // wx.showToast({title: res.userId})
    // this.areas = city.areas
    // this.citys = city.citys
    // this.provinces = city.provinces
    let provinceData = {
      type: 1,
      area_parent_id: 0
    }
    this.$post('Index/province_city_area', provinceData).then(res => {
      this.provinces = res.data.data
      this.provincesKey = this.provinces[0].area_id
      let cityData = {
        type: 2,
        area_parent_id: this.provinces[0].area_id
      }
      this.$post('Index/province_city_area', cityData).then(res => {
        this.provinces['cities'] = res.data.data
        // this.citys = res.data.data
        let areasData = {
          type: 3,
          area_parent_id: this.provinces.cities[0].area_id
        }
        this.$post('Index/province_city_area', areasData).then(res => {
          this.provinces['cities'][0]['cities'] = res.data.data
          console.log(this.provinces)
        })
      })
    })
    // console.log(city)
    // this.animation = wx.createAnimation({
    //   duration: 500,
    //   transformOrigin: '50% 50%',
    //   timingFunction: 'ease'
    // })
    // this.totleFee = 1
    this.totleFee = this.$getStorage('local_postage')
    // userTopRanking({}).then(response => {
    //   this.rankList = response.data
    // })
  },
  methods: {
    handleItemChange (val) {
      console.log(val)
      // let value = val
      // this.swipArr = value
      // let that = this
      // if (
      //   that.citys.length <= 0 ||
      //   that.provincesKey !== that.provinces[value[0]].area_id
      // ) {
      //   that.citys = []
      //   that.provincesKey = that.provinces[value[0]].area_id
      //   let cityData = {
      //     type: 2,
      //     area_parent_id: that.provincesKey
      //   }
      //   that.$post('Index/province_city_area', cityData).then(res => {
      //     that.citys = res.data.data
      //     that.citysKey = that.citys[0].area_id
      //     let areasData = {
      //       type: 3,
      //       area_parent_id: that.citys[0].area_id
      //     }
      //     that.$post('Index/province_city_area', areasData).then(res => {
      //       that.areas = res.data.data
      //     })
      //   })
      // } else if (
      //   that.areas.length <= 0 ||
      //   that.citysKey !== that.citys[value[1]].area_id
      // ) {
      //   that.areas = []
      //   that.citysKey = that.citys[value[1]].area_id
      //   let areasData = {
      //     type: 3,
      //     area_parent_id: that.citysKey
      //   }
      //   that.$post('Index/province_city_area', areasData).then(res => {
      //     that.areas = res.data.data
      //   })
      // } else {
      //   that.areasKey = that.areas[value[2]].area_id
      // }
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
      this.http.get('ip', 'http://pv.sohu.com/cityjson?ie=utf-8').then(res => {
        spbillCreateIp = res.data.cip
      })
      let nonceStr = this.rand(Math.random() * 13467)
      let outTradeNo = this.createNum(4)
      let notifyUrl = 'https://ysw.54yym.com/admin.php'
      let data = {
        appid: this.gobalData.appid,
        mch_id: this.gobalData.mch_id,
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
        this.gobalData.appid
      }&body=利他盈利模式-书籍&mch_id=${
        this.gobalData.mch_id
      }&nonce_str=${nonceStr}&notify_url=${notifyUrl}&openid=${this.$getStorage(
        'openid'
      )}&out_trade_no=${outTradeNo}&spbill_create_ip=${spbillCreateIp}&total_fee=${
        this.totleFee
      }&trade_type=JSAPI`
      string1 += `&key=${this.gobalData.key}`
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
      let string2 = `appId=${
        this.gobalData.appid
      }&nonceStr=${nonceStr}&package=${packageVal}&signType=MD5&timeStamp=${timeStamp}`
      string2 += `&key=${this.gobalData.key}`
      let paySign = this.$md5(string2)
        .toUpperCase()
        .toString()
      // let that = this
      console.log(nonceStr, timeStamp, packageVal, paySign)
      console.log(string2)
      // wx.requestPayment({
      //   // 'appId': this.gobalData.appid,
      //   timeStamp: timeStamp,
      //   nonceStr: nonceStr,
      //   package: packageVal,
      //   signType: 'MD5',
      //   paySign: paySign,
      //   success (res) {
      //     console.log(res)
      //     let data = {
      //       account_token: that.$util.getStorage('account_token'),
      //       userid: that.$util.getStorage('userId'),
      //       price: that.totleFee,
      //       product_id: 0,
      //       postage: that.totleFee,
      //       ordernum: that.prepayId,
      //       status: 1,
      //       address_id: addId,
      //       type: 1
      //     }
      //     that.$post('user/add_order', data).then(res => {
      //       // wx.showToast({
      //       //   title: res.data.msg
      //       // })
      //     })
      //   },
      //   fail (res) {
      //     console.log(res)
      //   },
      //   complete (res) {
      //     console.log(res)
      //   }
      // })
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
        truename: this.name,
        tel: this.phone,
        province: this.provincesKey,
        city: this.citysKey,
        area: this.areasKey,
        detailed: this.address,
        type: 1
      }
      // let that = this
      this.$post('User/add_mod_address', data).then(res => {
        console.log(res.data)
        // let addId = res.data.data.address_id
        // wx.showModal({
        //   title: '地址提交成功',
        //   content: '请支付邮费',
        //   success (res) {
        //     console.log(res)
        //     if (res.confirm) {
        //       that.unifiedorder(addId)
        //     } else {
        //       wx.showToast({
        //         title: '支付邮费后才能领取书籍'
        //       })
        //     }
        //   }
        // })
      })
    },
    selectCitys (obj) {
      console.log(obj)
    },
    statusChange () {
      this.show = true
    },
    selectAreas (obj) {
      console.log(obj)
    },
    cityCancel (e) {
      this.show = false
    },
    // 点击地区选择确定按钮
    citySure (e) {
      this.show = false
      this.atext =
        this.provinces[this.swipArr[0]].area_name +
        this.citys[this.swipArr[1]].area_name +
        this.areas[this.swipArr[2]].area_name
      let provinceData = {
        type: 1,
        area_parent_id: 0
      }
      let that = this
      that.$post('Index/province_city_area', provinceData).then(res => {
        that.provinces = res.data.data
        that.provincesKey = that.provinces[0].area_id
        let cityData = {
          type: 2,
          area_parent_id: that.provinces[0].area_id
        }
        that.$post('Index/province_city_area', cityData).then(res => {
          that.citys = res.data.data
          let areasData = {
            type: 3,
            area_parent_id: that.citys[0].area_id
          }
          that.$post('Index/province_city_area', areasData).then(res => {
            that.areas = res.data.data
          })
        })
      })
      this.swipArr = [0, 0, 0]
    },
    cityChange (e) {
      let value = e.mp.detail.value
      this.swipArr = value
      let that = this
      if (
        that.citys.length <= 0 ||
        that.provincesKey !== that.provinces[value[0]].area_id
      ) {
        that.citys = []
        that.provincesKey = that.provinces[value[0]].area_id
        let cityData = {
          type: 2,
          area_parent_id: that.provincesKey
        }
        that.$post('Index/province_city_area', cityData).then(res => {
          that.citys = res.data.data
          that.citysKey = that.citys[0].area_id
          let areasData = {
            type: 3,
            area_parent_id: that.citys[0].area_id
          }
          that.$post('Index/province_city_area', areasData).then(res => {
            that.areas = res.data.data
          })
        })
      } else if (
        that.areas.length <= 0 ||
        that.citysKey !== that.citys[value[1]].area_id
      ) {
        that.areas = []
        that.citysKey = that.citys[value[1]].area_id
        let areasData = {
          type: 3,
          area_parent_id: that.citysKey
        }
        that.$post('Index/province_city_area', areasData).then(res => {
          that.areas = res.data.data
        })
      } else {
        that.areasKey = that.areas[value[2]].area_id
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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
  padding: 4vw;
  background-color: #ffffff;
  color: #999;
  border-bottom: 1px solid #e6e6e6;
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
