<template>
  <div class="container">
    <!-- 顶部 -->
    <div class="top-item">
        <img src="../../assets/images/header.png" class="header-img"/>
        <!-- <button class="bind-phone" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">绑定手机</button> -->
        <button class="bind-phone" @click="bindPhone(true)">绑定手机</button>
        <a href="../mymessage/main" class="setting"><img src="../../assets/images/setting.png" /></a>
    </div>
    <!-- 个人信息 -->
    <div class="userinfo">
      <img :src="userInfo.headavatar" class="userinfo-avatar"/>
      <!-- <div class="userinfo-avatar">
        <open-data type="userAvatarUrl"></open-data>
      </div> -->
      <div class="userinfo-nickname">
        <!-- <card :text="nickName" :font-size="18"></card> -->
        <!-- <open-data type="userNickName"></open-data> -->
        <p class="card" style="font-size:26px;color:#000;text-align: center;">
          {{userInfo.nickname}}
        </p>
        <p class="card" style="color: #FFD100; font-size:14px;text-align: center;">
          {{userInfo.rank_id == 0 ? '客户' : userInfo.rank_id == 1 ? '会员' : '代理人'}}
        </p>
        <!-- <card :text="'客户'" :textColor="'#FFD100'" :fontSize="14"></card> -->
      </div>
    </div>

    <!-- 列表导航 -->
    <div>
      <ul class="fun-list">
        <li class="fun-list-cell" v-for="(item, index) in funcList" :key="index" @click="bindPage(item.url)">

          <img :class="item.class" class="icon" :src="item.icon" :alt="item.text" />

          <div><span class="list-text">{{item.text}}</span></div>

          <!-- <a class="fun-list-cell-navigate"></a> -->
        </li>
      </ul>
    </div>
    <!-- 绑定手机卡片 -->
    <div class="bind-phone-card" v-if="toggleBindPhone">
      <div class="mask" @click="bindPhone(false)"></div>
      <div class="form">
        <p>绑定手机</p>
        <div class="input-group">
          <label for="phone">手机号：</label>
          <input id="phone" type="number" v-model="phone" placeholder="请输入手机号码" maxlength="11">
        </div>
        <div class="input-group">
          <label for="code">验证码：</label>
          <input id="code" type="text" v-model="code" placeholder="请输入验证码" maxlength="6">
          <a @click="getCode()">{{getCodeValue}}</a>
        </div>
        <a class="submit" @click="submitBindPhone()">提交</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      getCodeValue: '获取验证码',
      getCodeTime: 0,
      toggleBindPhone: false,
      nickName: this.$getStorage('nickName'),
      phone: '',
      userInfo: {},
      countdown: {},
      code: '',
      serverCode: '',
      // 等级名称
      rankName: '',
      funcList: [
        {
          icon: require('../../assets/images/fund.png'),
          text: '奖学金',
          class: 'list-icon-1',
          url: 'myfund'
        },
        {
          icon: require('../../assets/images/extend.png'),
          text: '我的推广',
          class: 'list-icon-2',
          url: 'extend'
        },
        {
          icon: require('../../assets/images/integral.png'),
          text: '我的积分',
          class: 'list-icon-3',
          url: 'myintegral'
        },
        {
          icon: require('../../assets/images/course.png'),
          text: '已购课程',
          class: 'list-icon-4',
          url: 'coursebuy'
        },
        {
          icon: require('../../assets/images/course.png'),
          text: '已购专栏',
          class: 'list-icon-4',
          url: 'home'
        },
        {
          icon: require('../../assets/images/bind.png'),
          text: '我的收藏',
          class: 'list-icon-5',
          url: 'collect'
        },
        {
          icon: require('../../assets/images/address.png'),
          text: '地址管理',
          class: 'list-icon-6',
          url: 'addmanage'
        },
        {
          icon: require('../../assets/images/order.png'),
          text: '意见反馈',
          class: 'list-icon-7',
          url: 'suggest'
        }
      ]
    }
  },
  created () {
    this.userInfo = {
      userid: this.$getStorage('user_id'),
      headavatar: this.$getStorage('headavatar'),
      nickname: this.$getStorage('nickname'),
      openid: this.$getStorage('openid'),
      rank_id: this.$getStorage('rank_id'),
      referee_id: this.$getStorage('referee_id')
    }
    console.log(this.userInfo)
    // this.$get('index/index').then(res => {
    //   console.log(res)
    //   let data = res.data
    //   for (let item of data.banner_list) {
    //     if (item.type === 1) {
    //       let obj = {
    //         src: item.src,
    //         href: item.link
    //       }
    //       this.imgUrls.push(obj)
    //     } else {
    //       let obj = {
    //         href: item.link,
    //         icon: item.src,
    //         text: item.title
    //       }
    //       this.navBars.push(obj)
    //     }
    //   }
    //   this.productList = data.product_list
    //   this.channelList = data.cat_list
    //   this.newsList = data.information
    // }).then(err => {
    //   console.log(err)
    // })
  },
  methods: {
    getPhoneNumber (e) {
      console.log(e)
      // console.log(e.detail.errMsg)
      // console.log(e.detail.iv)
      // console.log(e.detail.encryptedData)
    },
    bindPage (url) {
      this.$router.push({'path': url})
    },
    bindPhone (bol) {
      this.toggleBindPhone = bol
    },
    setInterval () {
      this.getCodeValue = this.getCodeTime + ' S'
      this.getCodeTime -= 1
    },
    setTimeout () {
      this.getCodeValue = '重新获取验证码'
      clearInterval(this.countdown)
      this.getCodeTime = 0
      this.countdown = {}
    },
    getCode () {
      if (this.getCodeTime === 0) {
        this.getCodeTime = 60
        this.countdown = setInterval(this.setInterval, 1000)
        setTimeout(this.setTimeout, 60000)
        let data = {
          mobile: this.phone,
          account_token: this.$getStorage('account_token')
        }
        this.$post('Common/send_sms', data).then(res => {
          console.log(res)
          let resObj = res.data
          if (resObj.code === 1) {
            this.serverCode = resObj.data
          } else {
            this.$Message({//eslint-disable-line
              message: '短信发送失败，联系管理员!' + resObj.msg,
              type: 'error'
            })
          }
        })
      } else {
        this.$Message({//eslint-disable-line
          message: '请勿重复发送验证码!',
          type: 'error'
        })
      }
    },
    submitBindPhone () {
      if (this.serverCode == this.code) {//eslint-disable-line
        //eslint-disable-line
        let data = {
          userid: this.$getStorage('user_id'),
          tel: this.phone
        }
        console.log(data)
        this.$post('user/perfect_information', data)
          .then(res => {
            console.log(res)
            if (res.data.code === 1) {
              this.$Message({//eslint-disable-line
                message: '绑定手机成功!',
                type: 'success'
              })
              this.toggleBindPhone = false
            } else {
              this.$Message({//eslint-disable-line
                message: '绑定手机失败' + res.data.msg,
                type: 'error'
              })
            }
          })
      } else {
        this.$Message({//eslint-disable-line
          message: '验证码错误！',
          type: 'error'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bind-phone-card {
  width: 100vw;
  height: 100vh;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  .mask {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
  .form {
    width: 79.98vw;
    background-color: #ffffff;
    border-radius: 1.0664vw;
    border: 1px solid #ddd;
    padding: 3.7324vw;
    box-sizing: border-box;
    position: relative;
    z-index: 2;
    p {
      color: #ffd100;
      font-size: 20px;
      font-weight: 600;
      text-align: center;
      margin-bottom: 7.998vw;
    }
    .input-group + .input-group {
      border-bottom: 1px solid #ddd;
    }
    .input-group {
      width: 100%;
      height: 11.997vw;
      display: flex;
      align-items: center;
      padding: 0 3.999vw 0 2.3994vw;
      border-top: 1px solid #ddd;
      box-sizing: border-box;
      label {
        width: 15.996vw;
      }
      input {
        border-radius: 1.0664vw;
        position: relative;
        z-index: 1;
        border: 0;
        outline: 0;
        padding: 3px 0;
      }
      a {
        min-width: 21.328vw;
        height: 6.665vw;
        line-height: 6.665vw;
        font-size: 14px;
        color: #fff;
        background-color: #ffd100;
        text-align: center;
        padding: 0 1.1333vw;
        border-radius: 1.0664vw;
        position: absolute;
        right: 5.332vw;
        z-index: 2;
      }
    }
    .submit {
      width: 100%;
      display: inline-block;
      height: 7.998vw;
      line-height: 7.998vw;
      font-size: 4.2656vw;
      color: #fff;
      background-color: #ffd100;
      text-align: center;
      border-radius: 1.0664vw;
      margin-top: 7.998vw;
    }
  }
}
.top-item {
  width: 100vw;
  position: relative;
}
.header-img {
  width: 100vw;
  height: 54.5vw;
  position: relative;
  z-index: 0;
}
.setting {
  position: absolute;
  left: 89vw;
  top: 3vw;
}
.setting img {
  width: 6.3984vw;
  height: 6.1318vw;
}
.bind-phone {
  position: absolute;
  left: 4vw;
  top: 3.5vw;
  width: 20.3vw;
  height: 6.4vw;
  line-height: 6.4vw;
  font-size: 3vw;
  color: #432408;
  background-color: #ffffff;
  border-radius: 1.3vw;
  border: 0;
  outline: 0;
  text-align: center;
}
.bind-phone:after {
  border: 0;
}
.userinfo {
  display: flex;
  margin-top: -30.3924vw;
  flex-direction: column;
  align-items: center;
  z-index: 5;
  text-align: center;
}
.userinfo img{
  z-index: 2;
}
.userinfo-avatar {
  width: 22.3944vw;
  height: 22.3944vw;
  border-radius: 50%;
  overflow: hidden;
  display: block;
}

.userinfo-nickname {
  color: #000;
}

.usermotto {
  margin-top: 150px;
}
.fun-list {
  list-style: none;
  width: 91.977vw;
  margin: 3.999vw auto 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.fun-list-cell {
  width: 30.1258vw;
  height: 22.661vw;
  padding: 0.3999vw 0;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.fun-list-cell:nth-child(1),
.fun-list-cell:nth-child(2),
.fun-list-cell:nth-child(3) {
  border-top: 1px solid #eee;
}
.fun-list-cell:nth-child(3n + 1) {
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
}
.fun-list-cell:nth-child(3n + 2) {
  border-right: 1px solid #eee;
}
.fun-list-cell:nth-child(3n + 3) {
  border-right: 1px solid #eee;
}
.list-icon-1 {
  width: 6.8vw;
  height: 4.7vw;
  /* vertical-align: middle; */
}
.list-icon-2 {
  width: 6.4vw;
  height: 6vw;
  /* vertical-align: middle; */
}
.list-icon-3 {
  width: 5.9vw;
  height: 5.74vw;
  /* vertical-align: middle; */
}
.list-icon-4 {
  width: 6.1vw;
  height: 6vw;
  /* vertical-align: middle; */
}
.list-icon-5 {
  width: 5.3vw;
  height: 5.6vw;
  /* vertical-align: middle; */
}
.list-icon-6 {
  width: 5.87vw;
  height: 5.87vw;
  /* vertical-align: middle; */
}
.list-icon-7 {
  width: 5.87vw;
  height: 6.4vw;
  /* vertical-align: middle; */
}
.icon {
  margin-bottom: 1.3vw;
}
.list-text {
  color: #432408;
  font-size: 3.73vw;
}
.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
