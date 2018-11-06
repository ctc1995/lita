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
