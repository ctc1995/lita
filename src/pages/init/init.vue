<template>
  <div class="getInfo">
    <div class="mask"></div>
    <div class="getInfo-card">
      <p class="h1">欢迎登录利他盈利模式</p>
      <p class="h2">使用小程序需要先授权登录获取用户信息</p>
      <button class="weui-btn">授权登录</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      scopeUserInfo: false,
      scene: '',
      show: false
    }
  },
  methods: {}
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
      border-radius: 10rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 4vh;
    }
  }
}
</style>
