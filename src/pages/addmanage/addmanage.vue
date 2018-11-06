<template class="home">
  <div class="container">
    <div class="add-item">
      <!-- <span @click="bindPPage('../addition/main')">添加新地址</span> -->
    </div>
    <div>
      <div class="address-item" v-for="(addItem, index) in addressList" :key="index">
        <div>
          <p><span class="addname">{{addItem.addName}}</span><span class="tel">{{addItem.addTel}}</span></p>
          <p class="adressMsg">{{addItem.addRess}}</p>
        </div>
        <span class="edit" @click="bindPPage('../editadd/main')">编辑</span>
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
      addressList: [
        // {
        //   addName: '小敏敏',
        //   addTel: '13562362547',
        //   addRess: '广东省深圳市龙岗区平湖街道平吉大道华南城发展中心1613'
        // },
        // {
        //   addName: '小敏敏1',
        //   addTel: '13562362547',
        //   addRess: '广东省深圳市龙岗区平湖街道平吉大道华南城发展中心1613'
        // },
        // {
        //   addName: '小敏敏2',
        //   addTel: '13562362547',
        //   addRess: '广东省深圳市龙岗区平湖街道平吉大道华南城发展中心1613'
        // },
        // {
        //   addName: '小敏敏3',
        //   addTel: '13562362547',
        //   addRess: '广东省深圳市龙岗区平湖街道平吉大道华南城发展中心1613'
        // }
      ]
    }
  },
  onLoad: function () {
    // userTopRanking({}).then(response => {
    //   this.rankList = response.data
    // })
  },
  methods: {
    bindPPage (url) {
    //   wx.navigateTo({ url })
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
.container {
  min-height: 100vh;
  font-size: 28rpx;
  color: #000000;
  background-color: rgb(250, 250, 250);
  display: block;
  .address-item {
    background-color: #ffffff;
    padding: 30rpx 0 30rpx 4%;
    display: flex;
    justify-content: space-around;
    p {
      .addname {
        font-size: 30rpx;
      }
    }
    .adressMsg {
      font-size: 26rpx;
      margin-top: 12rpx;
    }
    .edit {
      display: inline-block;
      width: 100rpx;
      color: #999;
      display: flex;
      align-items: center;
      margin-left: 40rpx;
      position: relative;
    }
    .edit::before {
      content: "";
      display: inline-block;
      width: 4rpx;
      height: 60rpx;
      position: absolute;
      left: -32rpx;
      line-height: 28rpx;
      background: #f0f0f0;
    }
    .tel {
      margin-left: 8rpx;
      color: #999;
      font-size: 24rpx;
    }
  }
}
.add-item {
  display: flex;
  background-color: #ffffff;
  justify-content: flex-end;
  span {
    display: block;
    margin-right: 30rpx;
    color: #ffd300;
  }
}
</style>
