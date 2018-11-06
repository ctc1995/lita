<template class="home">
  <div class="container">
      <div class="collet-item">
        <div class="collet" v-for="(collectItem, index) in collectList" :key="index">
            <image :src="collectItem.collectImg"/>
            <div class="collet-message">
              <p class="title">{{collectItem.title}}</p>
              <p class="subtitle">{{collectItem.subTitle}}</p>
            </div>
        </div>
      </div>
    <!-- <div class="audio-list">
       <div class="audio-item" v-for="(audioItem, index) in audioLists" :key="index">
         <img class="audio-img" :src="audioItem.img" :alt="audioItem.text">
         <p class="audio-text">{{audioItem.text}}</p>
       </div>
     </div> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {},
      currentData: 0,
      collectList: [
        // {
        //   title: '点石成金1',
        //   subTitle: '访客至上的网页设计秘笈1',
        //   collectImg: require('../../images/collect.png')
        // },
        // {
        //   title: '点石成金2',
        //   subTitle: '访客至上的网页设计秘笈2',
        //   collectImg: require('../../images/collect.png')
        // },
        // {
        //   title: '点石成金3',
        //   subTitle: '访客至上的网页设计秘笈3',
        //   collectImg: require('../../images/collect.png')
        // }
      ]
    }
  },
  onLoad: function () {
    let starData = {
      userid: this.$util.getStorage('userId'),
      account_token: this.$util.getStorage('account_token')
    }
    this.http.post(undefined, 'user/my_collection', starData).then(res => {
      console.log(res.data)
      // let starList = []
      // for (let item of res.data.data) {
      //   starList.push(item.id)
      // }
      // if (starList.indexOf(this.projectId) !== -1) {
      //   this.isStarImg = require('../../images/star.png')
      //   this.isStar = false
      // } else {
      //   this.isStarImg = require('../../images/star-select.png')
      //   this.isStar = true
      // }
    })
  },
  methods: {
    bindViewTap () {
    //   const url = '../logs/main'
    //   wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
    //   wx.login({
    //     success: () => {
    //       wx.getUserInfo({
    //         success: res => {
    //           this.userInfo = res.userInfo
    //           console.log(res)
    //         }
    //       })
    //     }
    //   })
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

<style lang='scss' scoped>
.collet-item {
  padding-top: 60rpx;
  width: 92%;
  margin: 0 auto;
}
.collet {
  background: rgba(255, 255, 255, 1);
  box-shadow: 6rpx 0px 20rpx rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  width: 100%;
  display: flex;
  padding: 24rpx 0 24rpx;
  margin-bottom: 32rpx;
  box-sizing: border-box;
  image {
    width: 136rpx;
    height: 136rpx;
  }
  .collet-message {
    padding-left: 24rpx;
    .title {
      font-size: 28rpx;
      color: #262626;
      margin-bottom: 20rpx;
    }
    .subtitle {
      font-size: 22rpx;
      color: #999;
    }
  }
}
</style>
