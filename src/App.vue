<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
@import url('./assets/styles/weui.min.css');
* {
  text-align: start;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
html{
  font-size: 12px;
}
body{
  position: relative;
  margin: 0;
  padding: 0;
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
  font-size: 15px !important;
  line-height: 23px !important;
  float: none !important;
}
.new-detail img {
  max-width: 91.977vw !important;
  margin: 4vw 0 !important;
}
</style>
