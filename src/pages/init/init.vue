<template>
  <div class="getInfo">
    <div class="mask"></div>
    <div class="getInfo-card" v-if="show">
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
      loading: Object,
      scopeUserInfo: false,
      scene: '',
      show: true,
      userInfo: {}
    }
  },
  methods: {
    getUserInfo () {
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfd8f2476226e8867&redirect_uri=http%3A%2F%2Fysw.arwli.top/&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
    },
    // 注册
    reg () {
      this.userInfo['openid'] = this.$getStorage('openid')
      this.userInfo['headavatar'] = this.$getStorage('headavatar')
      this.userInfo['nickname'] = this.$getStorage('nickname')
      // 用户注册
      this.$post('Login/reg', this.userInfo).then((res) => {
        console.log(res)
        if (res.status === 200) {
          // this.$router.replace({ path: 'index' })
          // 获取用户的系统token
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
                  this.$setStorage('rank_id', res.data.data.rank_id)
                  this.$setStorage('referee_id', res.data.data.referee_id)
                  this.$setStorage('userid', res.data.data.userid)
                  this.userInfo['rank_id'] = this.$getStorage('rank_id')
                  this.userInfo['referee_id'] = this.$getStorage('referee_id')
                  this.userInfo['userid'] = this.$getStorage('userid')
                }
                this.loading.close()
                this.$router.replace({'path': 'index'})
              }).catch(err => {
                console.log(err)
              })
            }
          }).catch(err => {
            console.log(err)
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  created () {
    this.$setStorage('account_token', 'fbb6555fc3268f4f4dc58aa8c87fc37d')
    this.$setStorage('local_postage', 9)
    this.$setStorage('appid', 'wxfd8f2476226e8867')
    this.$setStorage('userid', '73')
    this.$setStorage('rank_id', 1)
    this.$setStorage('daili_fee', 0.01)
    this.$setStorage('member_fee', 0.01)
    this.$setStorage('mch_id', '1516696021')
    this.$setStorage('mch_key', 'taojiamintiandenghui199292408270')
    this.$setStorage('openid', 'odT745nH-xb2dNVrW7SyeFR5ROOI')
    this.$setStorage('nickname', 'ଘଓ')
    this.$setStorage('headavatar', 'http://thirdwx.qlogo.cn/mmopen/vi_32/HwUXX5POm5p8br65x42xEHCvLxuJLAxe3zBAnHjyKEGGEIrLFSeXkaU5h7yWib0GwLKrLQex8EffK7rLLFgMuTA/132')
    this.$router.replace({'path': 'index'})
    // this.wxCode = window.location.search.replace('?', '').split('&')[0].split('=')[1]
    // console.log(this.wxCode)
    // if( this.wxCode == undefined ) {//eslint-disable-line
    //   this.show = true
    //   window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfd8f2476226e8867&redirect_uri=http%3A%2F%2Fysw.arwli.top/&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
    // } else {
    //   this.show = false
    // }
    // // 获取系统参数
    // this.$get('login/get_company').then(res => {
    //   console.log(res.data.data)
    //   let obj = res.data.data
    //   this.$setStorage('local_postage', obj.local_postage)
    //   this.$setStorage('appid', obj.mpappid)
    //   this.$setStorage('mch_id', obj.mch_id)
    //   this.$setStorage('daili_fee', obj.daili_fee)
    //   this.$setStorage('member_fee', obj.member_fee)
    //   this.$setStorage('mch_key', obj.mch_key)
    //   // this.totleFee = 1
    //   this.totleFee = res.data.data.local_postage * 100
    // }).catch(err => {
    //   console.log(err)
    // })
    // // 通过后台获取用户信息
    // this.$get('login/wxmp_token?code=' + this.wxCode).then(res => {
    //   this.loading = this.$loading({
    //     lock: true,
    //     text: '数据加载中',
    //     spinner: 'el-icon-loading',
    //     background: 'rgba(0, 0, 0, 0.7)'
    //   })
    //   this.$setStorage('openid', res.data['openid'])
    //   this.$setStorage('nickname', res.data['nickname'])
    //   this.$setStorage('headavatar', res.data['headimgurl'])
    //   this.reg()
    // })
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
