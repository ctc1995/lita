<template>
  <div class="container">
    <div class="top-message">
      <div class="head-message">
        <span class="head-title">头像</span>
        <div class="userinfo-avatar">
          <img :src="headavatar" :alt="nickName">
        </div>
    </div>
    <div>
      <span>昵称</span>
      <p>{{nickName}}</p>
    </div>
  </div>
  <div class="bottom-message">
    <div>
      <span>手机号码</span>
      <span>{{phone}}</span>
    </div>
    <div>
      <span>身份</span>
      <span>客户</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      nickName: this.$getStorage('nickname'),
      headavatar: this.$getStorage('headavatar'),
      phone: '未绑定',
      userInfo: {}
    }
  },
  created () {
    let data = {
      openid: this.$getStorage('openid'),
      account_token: this.$getStorage('account_token')
    }
    let that = this
    this.$post('user/get_info', data).then(res => {
      console.log(res.data.data)
      if (res.data.data.tel === null) {
        that.phone = '未绑定'
      } else {
        that.phone = res.data.data.tel
      }
    })
  }
}
</script>
<style lang="scss" scoped>
.userinfo-avatar {
  width: 10.6664vw;
  height: 10.6664vw;
  border-radius: 50%;
}
.container {
  height: 100vh;
  background-color: rgb(250, 250, 250);
  display: block;
}
.top-message,
.bottom-message {
  background-color: #ffffff;
  margin-bottom: 2.666vw;
  width: 100%;
  span {
    color: #262626;
    font-size: 3.4658vw;
  }
  .head-title {
    line-height: 11.7304vw;
  }
  div {
    display: flex;
    justify-content: space-between;
    padding: 2.666vw 3.4658vw;
  }
  .userinfo-avatar{
    padding: 0;
    img {
      width: 11.7304vw;
      height: 11.7304vw;
      border-radius: 50%;
    }
  }
}
</style>
