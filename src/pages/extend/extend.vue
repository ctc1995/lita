<template class="home">
  <div class="container">
      <div class="extend-top">
        <p style="font-size: 3.73vw;text-align: center;">推广人数</p>
        <p style="font-size: 8.8vw;text-align: center;">{{extendList.length}}</p>
        <a class="tuiguang" @click="tuiguang()">生成我的推广链接</a>
      </div>
      <div class='swiper_con'>
        <ul class="inte-list">
          <li  v-for="(extendItem, index) in extendList" :key="index">
            <div class="inte-cell">
                <image :src="extendItem.accountImg"/>
                <div class="inte-message">
                  <p>{{extendItem.exAccount}}</p>
                  <p class="inte-time"><span style="color:#999">用户账号：</span>{{extendItem.account}}</p>
                </div>
            </div>
            <div class="regtime"><span style="color: #999">注册时间：</span>{{extendItem.regTime}}</div>
          </li>
        </ul>
      </div>
      <!-- 弹出卡片 -->
      <div class="modelCard" v-if="cardShow">
        <div class="mask" @click="hideCard()"></div>
        <div class="code">
          <!-- <span class="save" @click="saveImg()">保存到相册</span> -->
          <!-- <img :src="'data:image/png;base64,'+codeImg" alt="公众号码"> -->
          <qrcode-vue class="qrcode" :value="qrcode.value" :size="qrcode.size" level="H"></qrcode-vue>
          <p>「扫描二维码进入利他」</p>
          <div class="avatar">
            <!-- <open-data type="userAvatarUrl"></open-data> -->
            <img :src="headavatar" :alt="nickName">
          </div>
        </div>
        <span class="close" @click="hideCard()">X</span>
      </div>
    </div>
</template>

<script>
import { formatTime } from '../../services/util'
import QrcodeVue from 'qrcode.vue'

export default {
  components: {
    QrcodeVue
  },
  data () {
    return {
      root: this.root,
      codeImg: ``,
      cardShow: false,
      extendList: [],
      nickName: this.$getStorage('nickname'),
      headavatar: this.$getStorage('headavatar'),
      userid: this.$getStorage('userid'),
      qrcode: {
        value: 'http://ysw.arwli.top/',
        size: 200
      }
    }
  },
  created: function () {
    let starData = {
      userid: this.userid,
      account_token: this.$getStorage('account_token')
    }
    this.$post('user/my_extension', starData).then(res => {
      // console.log(res.data.data)
      this.extendList = []
      for (let item of res.data.data) {
        let obj = {
          exAccount: item.nickname,
          account: item.username,
          accountImg: item.headavatar,
          regTime: formatTime(new Date(item.addtime + '000' - 0))
        }
        this.extendList.push(obj)
      }
    })
  },

  methods: {
    saveImg () {
      /* let that = this
      wx.getSetting({
        success (res) {
          if (!res.authSetting['scope.writePhotosAlbum']) {
            wx.authorize({
              scope: 'scope.writePhotosAlbum',
              success () {
                const fileManager = wx.getFileSystemManager()
                fileManager.writeFile({
                  filePath: wx.env.USER_DATA_PATH + '/code.png',
                  data: that.codeImg,
                  encoding: 'base64',
                  success: res => {
                    wx.saveImageToPhotosAlbum({
                      filePath: wx.env.USER_DATA_PATH + '/code.png',
                      success: res => {
                        console.log(res)
                      },
                      fail: err => {
                        console.log(err)
                      }
                    })
                  },
                  fail: err => {
                    console.log(err)
                  }
                })
              }
            })
          } else {
            wx.saveImageToPhotosAlbum({
              filePath: wx.env.USER_DATA_PATH + '/code.png',
              success: res => {
                console.log(res)
              },
              fail: err => {
                console.log(err)
              }
            })
          }
        }
      }) */
    },
    bindViewTap () {
    //   const url = '../logs/main'
    //   wx.navigateTo({ url })
    },
    tuiguang () {
      this.cardShow = true
      this.qrcode.value = 'http://ysw.arwli.top?scene=' + this.userid
      // this.$get(`Login/getwxacodeunlimit?scene=${this.$getStorage('user_id')}&width=430&wxToken=${this.$getStorage('wxToken')}`).then(res => {
      //   this.codeImg = res.data
      // })
    },
    hideCard () {
      this.cardShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
    position: relative;
    height: 100vh;
}
.modelCard {
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  .close {
    width: 6.67vw;
    height: 6.67vw;
    line-height: 6.67vw;
    color: #ffffff;
    background-color: rgba(0, 0, 0, 0.5);
    font-size: 3.73vw;
    border-radius: 50%;
    position: absolute;
    bottom: 21.3vw;
    text-align: center;
    z-index: 2;
  }
  .mask {
    width: 100vw;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    position: absolute;
    z-index: 1;
  }
  .save{
    color:#fff;
    background-color:#ffd100;
    font-size: 12px;
    border-radius: 4px;
    padding: 1.07vw;
    position:absolute;
    top: 1.13vw;
    right: 2.67vw;
  }
  .code {
    width: 84vw;
    height: 60vh;
    border-radius: 6px;
    background-color: #ffffff;
    position: absolute;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
      text-align: center;
      font-size: 4.27vw;
      margin-top: 1.33vw;
      margin-bottom: 4vw;
    }
    .qrcode{
      margin-top: 20px;
    }
    .avatar {
      overflow: hidden;
      display: block;
      width: 10.7vw;
      height: 10.7vw;
      display: flex;
      justify-content: center;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
}
.extend-top {
  height: 30vw;
  padding-top: 4.3vw;
  color: #ffffff;
  text-align: center !important;
  width: 100%;
  background: rgba(255, 209, 0, 1);
  .tuiguang {
    width: 35vw;
    border: 1px solid #ffffff;
    padding: 1vw 3vw;
    font-size: 3.73vw;
    border-radius: 5px;
    margin: 2.67vw auto 0;
  }
}
.swiper_con {
  text-align: center;
  margin: 10px auto 0;
  width: 94%;
}
.regtime {
  text-align: left;
  padding: 1.87vw 2vw 0;
  font-size: 3.2vw;
  border-top: 1px solid #e6e6e6;
}
.inte-list {
  list-style: none;
  li {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.18);
    border-radius: 8px;
    margin-bottom: 19px;
    padding: 3.47vw 0;
  }
  .inte-cell {
    display: flex;
    box-sizing: border-box;
    color: #262626;
    padding: 0 2vw 1.9vw;
    font-size: 3.5vw;
    image {
      width: 11.7vw;
      height: 11.7vw;
      border-radius: 50%;
    }
    .inte-message {
      position: relative;
      width: calc(100% - 20.3vw);
      padding-left: 3.5vw;
    }
    p {
      text-align: left;
      margin-bottom: 0.67vw;
    }
  }
}
</style>
