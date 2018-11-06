<template class="home">
  <div class="container">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick" stretch>
      <el-tab-pane label="音乐频道" name="first">音乐频道</el-tab-pane>
      <el-tab-pane label="视频频道" name="second">视频频道</el-tab-pane>
      <el-tab-pane label="文章阅读" name="three">文章阅读</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {},
      currentData: 0,
      activeName2: 'first',
      buyaudioList: [
        // {
        //   audioTitle: '21世纪经典成名曲悦享纯与真',
        //   audioNum: '18',
        //   audioTime: '2018.10.02 17:42:35'
        // },
        // {
        //   audioTitle: '21世纪经典成名曲悦享纯与真',
        //   audioNum: '18',
        //   audioTime: '2018.10.02 17:42:35'
        // }
      ],
      buyvedioList: [
        // {
        //   vedioTitle: '商业分析框架讲解《商业分析 框架讲解》',
        //   vedioNum: '28',
        //   vedioTime: '2018.10.02 17:42:35'
        // }
      ],
      articleList: [
        // {
        //   articleTitle: '点石成金',
        //   subTitle: '副标题: 访客至上的网页设计秘笈',
        //   articleNum: '28',
        //   articleTime: '2018.10.02 17:42:35'
        // }
      ]
    }
  },
  onLoad: function () {
    let starData = {
      cat_id: 5,
      userid: this.$getStorage('userId'),
      account_token: this.$getStorage('account_token')
    }
    this.$post('User/purchase_course', starData).then(res => {
      console.log(res.data)
    })
  },
  methods: {
    handleClick (tab, event) {
      // console.log(tab, event)
    },
    bindViewTap () {
      // const url = '../logs/main'
      // wx.navigateTo({ url })
    },
    bindchange: function (e) {
      this.currentData = e.detail.current
    },
    // 点击切换，滑块index赋值
    checkCurrent: function (e) {
      if (this.currentData === e.target.dataset.current) {
        return false
      } else {
        this.currentData = e.target.dataset.current
      }
    },
    getUserInfo () {
      // 调用登录接口
      // wx.login({
      //   success: () => {
      //     wx.getUserInfo({
      //       success: (res) => {
      //         this.userInfo = res.userInfo
      //         console.log(res)
      //       }
      //     })
      //   }
      // })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    }
  },
  created () {
    // 调用应用实例的方法获取全局数据
    // this.getUserInfo()
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  background-color: rgb(250, 250, 250);
  display: block;
}
.tab {
  font-size: 28rpx;
  float: left;
  width: 25.3333%;
  text-align: center;
  padding: 30rpx 0;
  margin: 0 4%;
}

.topTabSwiper {
  zoom: 1;
  background-color: #ffffff;
}
.subtitle {
  color: #999999;
}
.topTabSwiper:after {
  content: "";
  clear: both;
  display: block;
}

.tabBorer {
  border-bottom: 2px solid #ffd100;
  color: #ffd100;
}

.swiper {
  width: 100%;
  min-height: 80vh;
}
swiper-item {
  overflow-x: hidden;
  overflow-y: scroll;
}
.swiper_con {
  text-align: center;
  width: 100%;
  height: 100%;
  padding: 16rpx 0 40rpx 0;
}
.inte-list {
  list-style: none;
  .inte-cell {
    display: flex;
    padding: 26rpx 28rpx;
    box-sizing: border-box;
    color: #262626;
    font-size: 26rpx;
    margin-bottom: 16rpx;
    background-color: #ffffff;
    /*box-shadow:0px 0px 16px rgba(0,0,0,0.08);*/
    image {
      width: 152rpx;
      height: 152rpx;
    }
    .inte-message {
      position: relative;
      width: calc(100% - 152rpx);
      padding-left: 26rpx;
    }
    p {
      text-align: left;
      margin-bottom: 10rpx;
    }
    .rank-item {
      display: flex;
      p {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 0;
      }
      .rankLv {
        width: 50rpx;
        text-align: center;
      }
      .rankImg {
        width: 50rpx;
        height: 53rpx;
      }
    }
    .rankUserImg {
      width: 88rpx;
      height: 88rpx;
      margin: 0 21rpx 0 14rpx;
      border-radius: 50%;
    }
    .inte-time {
      color: #999999;
      font-size: 24rpx;
      margin: 14rpx 0 32rpx 0;
    }
    .product-num {
      color: #999999;
      font-size: 24rpx;
    }

    .inte-consume {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 136rpx;
      line-height: 50rpx;
      color: #432408;
      font-size: 24rpx;
      padding: 0;
      height: 50rpx;
    }
  }
}
</style>
