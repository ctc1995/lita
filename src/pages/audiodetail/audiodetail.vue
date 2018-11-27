<template>
    <div class="audio">
        <div class="audio-bg">
          <img class="bg" src="../../assets/images/audio-bg.jpg" alt="21世纪经典成名曲悦享纯与真">
          <img class="play" v-if="isPlay" src="../../assets/images/play.png" alt="播放" @click="audioPlay()">
          <img class="pause" v-if="!isPlay" src="../../assets/images/pause.png" alt="暂停" @click="audioPause()">
          <img class="star"  :src="isStarImg" alt="收藏" @click="star(audio.id)">
          <!-- <img class="share" src="../../assets/images/share.png" alt="分享"> -->
          <div class="mask"></div>
        </div>
        <div class="audio-card">
            <div class="audio-title">
              {{audio.name}}
            </div>
            <div class="audio-intro-title">音频介绍</div>
            <div class="audio-intro-value">
              <span v-html="audio.introduce"></span>
            </div>
            <!-- 分割线 -->
            <div class="divide"></div>
            <div class="audio-list-title">音频列表</div>
            <div class="audio-list">
              <div class="audio-item"
              :class="{'active': index == selIndex}"
               v-for="(audioItem, index) in audio.product_sku"
               :key="index"
               @click="changeAudio(audioItem.free, audioItem.link, index)">
                <p :class="audioItem.free == 1 || userLevel != 1 ?'free':''">
                  <span class="audio-item-name">{{audioItem.name}}</span>
                  <!-- <span class="audio-item-name">{{audioItem.audioTime}}</span> -->
                </p>
              </div>
            </div>
        </div>
      <detailFooter :price="audio.price" :shopUrl="'../pages/index/main'"></detailFooter>
      <div class="card-page" v-if='showShopCard'>
        <div class="mask" @click="toggleshopCard()"></div>
        <shopCard v-if='showShopCard'></shopCard>
      </div>
    </div>
</template>
<script>
import 'video.js/dist/video-js.css'
import detailFooter from '../../components/detail-footer'
import shopCard from '../../components/shop-card'
import { videoPlayer } from 'vue-video-player'

export default {
  props: ['projectId'],
  data () {
    return {
      scrollTop: 0,
      innerAudioContext: new Audio(),
      audio: {},
      audioSrc: '',
      showShopCard: false,
      isStar: false,
      isPlay: true,
      isStarImg: require('../../assets/images/star.png'),
      // 用户身份
      userLevel: 1,
      selIndex: 0
    }
  },
  components: {
    detailFooter,
    shopCard,
    videoPlayer
  },
  methods: {
    toggleshopCard (index = 9) {
      this.showShopCard = !this.showShopCard
    },
    // 收藏
    star (productId) {
      let data = {
        userid: this.$getStorage('userId'),
        product_id: productId,
        account_token: this.$getStorage('account_token')
      }
      this.$post('user/collection_product', data).then(res => {
        console.log(res)
        this.isStar = !this.isStar
        if (this.isStar) {
          this.isStarImg = require('../../assets/images/star-select.png')
        } else {
          this.isStarImg = require('../../assets/images/star.png')
        }
        this.$Message({//eslint-disable-line
          message: res.data.msg,
          type: 'success'
        })
      })
    },
    // 切换音频
    changeAudio (free, src, index) {
      if (free == 1) { //eslint-disable-line
        this.creatAudio(src)
        this.innerAudioContext.autoplay = true
        this.isPlay = false
        this.selIndex = index
        console.log('谢谢收听！', src)
      } else {
        if (this.userLevel === 1) {
          this.toggleshopCard()
          console.log('付费音频，请购买！')
        } else {
          this.creatAudio(src)
          this.innerAudioContext.autoplay = true
          this.isPlay = false
          this.selIndex = index
          console.log('谢谢收听！', src)
        }
      }
    },
    // 播放音频
    audioPlay () {
      this.innerAudioContext.play()
      this.isPlay = !this.isPlay
    },
    // 暂停音频
    audioPause () {
      this.innerAudioContext.pause()
      this.isPlay = !this.isPlay
    },
    // 创建音频实例
    creatAudio (src) {
      // // 设置音频自动播放
      this.innerAudioContext.src = src
    }
  },
  // onShareAppMessage() {
  //   this.$util.getUrl()
  //   let shareObj = {
  //     path: `pages/init/main?scene=${this.$getStorage(
  //       'userId'
  //     )}&type=audio&href=${this.$util.getUrl()}&projectId=${this.projectId}`
  //   }
  //   return shareObj
  // },
  beforeCreate () {
    this.userLevel = this.$getStorage('rankId')
    this.userLevel = 1
  },
  created () {
    // wx.showShareMenu({})
    // 获取专辑信息
    this.$get('index/product_info?product_id=' + this.projectId)
      .then(res => {
        this.audio = res.data.data
        this.isPlay = true
        // 设置音频文件地址
        this.creatAudio(this.audio['product_sku'][0].link)
      })
    // 检查收藏
    // let starData = {
    //   userid: this.$getStorage('userId'),
    //   account_token: this.$getStorage('account_token')
    // }
    // this.$post('user/my_collection', starData).then(res => {
    //   let starList = []
    //   for (let item of res.data.data) {
    //     starList.push(item.id)
    //   }
    //   if (starList.indexOf(this.projectId) !== -1) {
    //     this.isStarImg = require('../../assets/images/star.png')
    //     this.isStar = false
    //   } else {
    //     this.isStarImg = require('../../assets/images/star-select.png')
    //     this.isStar = true
    //   }
    // })
    // const innerAudioContext = wx.createInnerAudioContext()
    // innerAudioContext.autoplay = true
    // innerAudioContext.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'
  },
  destroyed () {
    this.innerAudioContext.pause()
  }
  // onUnload: function () {
  //   this.innerAudioContext.destroy()
  // }
}
</script>
<style lang="scss" scoped>
.audio-bg {
  width: 100vw;
  height: 57.319vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .mask {
    width: 100%;
    height: 100%;
    background-color: #000000;
    opacity: 0.5;
    position: absolute;
    z-index: 2;
  }
  .play,
  .pause,
  .back,
  .star,
  .share {
    position: absolute;
    z-index: 3;
  }
  .play,
  .pause {
    width: 10.664vw;
    height: 10.664vw;
  }
  .star {
    width: 5.332vw;
    height: 5.0654vw;
    top: 3.5991vw;
    right: 5.332vw;
  }
  // .share{
  //   width: 42rpx;
  //   height: 42rpx;
  //   top: 3.5991vw;
  //   right: 40rpx;
  // }
  .bg {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
  }
}
.audio-card {
  color: #262626;
  background-color: #ffffff;
  margin-bottom: 13.0634vw;
  padding: 4.9321vw 4vw;
  position: relative;
  z-index: 1;
  text-align: start;
  .audio-title,
  .audio-list-title {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 4.9321vw;
  }
  .audio-intro-title {
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 3.3325vw;
  }
  .audio-intro-value {
    font-size: 13px;
    line-height: 18px;
    color: #808080;
    margin-bottom: 4vw;
  }
  .divide {
    width: 100vw;
    height: 2.3994vw;
    background-color: #fafafa;
    margin-bottom: 5.0654vw;
  }
  .audio-list {
    .audio-item + .audio-item {
      margin-top: 2.3994vw;
    }
    .audio-item {
      p {
        font-size: 14px;
        font-weight: 500;
        color: #f73535;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      p.free {
        color: #262626;
      }
    }
  }
}

.card-page {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  .mask {
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.2);
    position: fixed;
    top: 0;
    left: 0;
  }
}
</style>
