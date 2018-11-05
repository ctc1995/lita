<template>
  <div class="getInfo">
    <div class="mask"></div>
    <div class="getInfo-card">
      <p class="h1">欢迎登录利他盈利模式</p>
      <p class="h2">使用小程序需要先授权登录获取用户信息</p>
      <button class="weui-btn" @click="getUserInfo()">授权登录</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      scopeUserInfo: false,
      scene: '',
      show: false,
      userInfo: {
        'nickname': 'ଘଓ',
        'headavatar': 'https://wx.qlogo.cn/mmopen/vi_32/pQQ67e6ZXHlic5BjnDgERvsDicMI0INZPTIhCgWshkB03xgNCmRSnZMXoRtjdpA7uXAUt7JnUs3765gIcIQniaC5Q/132',
        'openid': 'o5u4f5U1jpK30tm8zbkqNlILBQyE'
      }
    }
  },
  methods: {
    getUserInfo () {
      this.reg()
    },
    // 注册
    reg () {
      // let rootUrl = this.$gobalData.rootUrl
      // 用户注册
      this.$post('Login/reg', this.userInfo).then((res) => {
        console.log(res)
        if (res.status === 200) {
          // this.$router.replace({ path: 'index' })
        }
      }).catch((err) => {
        console.log(err)
      })
      // 获取用户token
      this.$post('Login/account_token', { openid: this.userInfo.openid }).then(res => {
        if (res.data.code === 1) {
          this.$setStorage('account_token', res.data.data['account_token'])
          // 获取用户信息
          let getUsrtInfoData = {
            'openid': this.userInfo.openid,
            'account_token': res.data.data['account_token']
          }
          // 获取用户信息
          this.$post('user/get_info', getUsrtInfoData).then(res => {
            console.log(res.data.data)
            if (res.data.code === 1) {
              this.$setStorage('headavatar', res.data.data.headavatar)
              this.$setStorage('nickname', res.data.data.nickname)
              this.$setStorage('openid', res.data.data.openid)
              this.$setStorage('rank_id', res.data.data.rank_id)
              this.$setStorage('referee_id', res.data.data.referee_id)
              this.$setStorage('userid', res.data.data.userid)
              this.$router.push({ path: 'index' })
            }
          }).catch(err => {
            console.log(err)
          })
        }
      }).catch(err => {
        console.log(err)
      })
      // this.$http.get('Login/reg', this.userInfo).then()
    }
  }
}
</script>

<style lang="scss" scoped>
.getInfo {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .mask {
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.1);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
  }
  .getInfo-card {
    width: 93.33vw;
    height: 35vh;
    background-color: #ffffff;
    border-radius: 16rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 2;
    .h1 {
      font-size: 20px;
      color: #262626;
    }
    .h2 {
      font-size: 16px;
      color: #999;
      margin-top: 2vh;
    }
    button {
      width: 60vw;
      height: 12vw;
      font-size: 16px;
      color: #fff;
      background-color: #ffd100;
      border-radius: 1.334vw;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 4vh;
    }
  }
}
</style>
