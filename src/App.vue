<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  created () {
    this.$wxJS(location.href.split('#')[0])
    let that = this
    this.$wx.ready(function () {
      console.log('wx初始化成功！')
      that.$wx.hideAllNonBaseMenuItem()
      // that.$wx.updateAppMessageShareData({
      //   title: '利他盈利', // 分享标题
      //   desc: '利他盈利描述', // 分享描述
      //   link: `http://ysw.arwli.top/?scene=${that.$getStorage('userid')}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      //   imgUrl: '', // 分享图标
      //   success: function () {
      //     // 设置成功
      //     console.log('分享设置成功！')
      //   }
      // })
    })
  }
}
</script>

<style>
@import url('./assets/styles/weui.min.css');
* {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
html{
  font-size: 12px;
}
body{
  position: relative;
  margin: 0;
  padding: 0;
  background-color: #fff;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.new-detail p, .new-detail div {
  max-width: 91.977vw !important;
  text-indent: 30px;
  text-align: start;
  font-size: 15px !important;
  line-height: 23px !important;
  float: none !important;
}
.new-detail img {
  max-width: 91.977vw !important;
  margin: 4vw 0 !important;
}
.el-tabs{
  padding: 0 20px;
}
.el-tabs--card>.el-tabs__header{
  border: none;
}
/* #pane-first,#pane-second,#pane-three{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    box-shadow:0 0 16px rgba(0, 0, 0, 0.08);
    padding: 3.5vw 3.73vw;
    border-radius: 8px;
    box-sizing:border-box;
    color:#262626;
} */
.el-tabs__content{
  overflow: unset;
}
.el-tabs--card>.el-tabs__header .el-tabs__nav{
   border-radius: unset;
   border: 0;
}
.el-tabs--card>.el-tabs__header .el-tabs__item{
  border: none;
}
.el-tabs__item.is-active{
  color:#ffd100 !important;
  border-bottom: 2px solid #ffd100 !important;
}
</style>
