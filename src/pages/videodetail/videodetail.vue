<template>
    <div class="video">
      <div class="video-bg">
          <!-- <img class="bg" :src="video.cover" alt="21世纪经典成名曲悦享纯与真"> -->
          <!-- <img class="play" src="../../images/play.png" alt="播放"> -->
          <!-- <img class="pause" src="../../images/play.png" alt="暂停"> -->
          <!-- <video class="bg" id="myVideo" :src="videoSrc" enable-danmu controls></video> -->
          <video-player  class="video-player-box"
                ref="videoPlayer"
                :options="playerOptions"
                :playsinline="true">
          </video-player>
          <!-- <img class="star" src="../../images/star.png" alt="收藏">
          <img class="share" src="../../images/share.png" alt="分享"> -->
          <!-- <div class="mask"></div> -->
      </div>
      <div class="video-card">
          <div class="video-title">
              {{video.name}}
          </div>
          <div class="video-intro-title">视频介绍</div>
          <div class="video-intro-value">
            <span v-html="video.introduce"></span>
          </div>
          <div class="video-list">
            <div class="video-item"
              v-for="(videoItem, index) in video.product_sku"
              :key="index"
              @click="changeVideo(videoItem.free, videoItem.link, index)">
              {{videoItem.name}}
              <span class="nofree" v-if="videoItem.free == 1 || userLevel != 1 ? false : true">付费</span>
            </div>
          </div>
      </div>
      <detailFooter :price="video.price" :shopUrl="'../pages/index/main'"></detailFooter>
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
import {videoPlayer} from 'vue-video-player'

export default {
  props: ['projectId'],
  data () {
    return {
      // root: this.root,
      // videoContext: wx.createVideoContext('myVideo'),
      // http: new this.$util.Http(),
      scrollTop: 0,
      video: {},
      videoSrc: '',
      showShopCard: false,
      // 用户身份
      userLevel: 1,
      playerOptions: {}
    }
  },
  computed: {
    player () {
      return this.$refs.videoPlayer.player
    }
  },
  components: {
    detailFooter,
    shopCard,
    videoPlayer
  },
  /* onShareAppMessage () {
    this.$util.getUrl()
    let shareObj = {
      path: `pages/init/main?scene=${this.$util.getStorage('userId')}&type=video&href=${this.$util.getUrl()}&projectId=${this.projectId}`
    }
    return shareObj
  }, */
  methods: {
    changeVideo (free, src, index) {
      // this.videoContext.pause()
      // this.videoContext.stop()
      if (free == 1) {//eslint-disable-line
        this.videoSrc = src
        console.log('谢谢收看！' + this.videoSrc)
      } else {
        if (this.userLevel === 1) {
          this.toggleshopCard()
          console.log('付费视频，请购买！')
        } else {
          this.videoSrc = src
          console.log('谢谢收看！' + this.videoSrc)
        }
      }
    },
    toggleshopCard (index = 9) {
      this.showShopCard = !this.showShopCard
    }
  },
  beforeCreate () {
    // this.userLevel = this.$getStorage('rank_id')
    this.userLevel = 1
  },
  created () {
    // this.projectId = this.$root.$mp.query.projectId
    this.$get('index/product_info?product_id=' + this.projectId).then(res => {
      this.video = res.data.data
      console.log(this.video.product_sku.length)
      if (this.video.product_sku.length !== 0) {
        this.videoSrc = this.video.product_sku[0].link
      }
      this.playerOptions = {
        width: window.innerWidth,
        height: window.innerWidth * 0.57319,
        autoplay: true,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          type: 'video/mp4',
          // mp4
          src: this.videoSrc
          // webm
          // src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm'
        }],
        poster: this.video.cover
      }
    })
  }
}
</script>
<style lang="scss" scoped>
.video-bg {
  width: 100vw;
  height: 57.319vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index:1;
  .mask {
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.5;
    position: absolute;
    z-index: 2;
  }
  .play, .pause, .back, .star, .share{
    position: absolute;
    z-index: 3;
  }
  .play,
  .pause {
    width: 11.7304vw;
    height: 11.7304vw;
  }
  .star{
    width: 5.332vw;
    height: 5.0654vw;
    top: 3.5991vw;
    right: 16.1293vw;
  }
  .share{
    width: 5.5986vw;
    height: 5.5986vw;
    top: 3.5991vw;
    right: 5.332vw;
  }
  .bg {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
  }
}
.video-card{
  color: #262626;
  background-color:#fff;
  margin-bottom: 13.0634vw;
  padding: 4.9321vw 4vw;
  position:relative;
  z-index:1;
  .video-title{
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 4.9321vw;
  }
  .video-intro-title{
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 3.3325vw;
  }
  .video-intro-value{
    font-size: 13px;
    line-height: 18px;
    color: #808080;
    margin-bottom: 0.4vw;
  }
  .video-list{
    display: flex;
    flex-wrap: wrap;
    color: #432408;
    font-size: 12px;
    font-weight:400;
    line-height: 18px;
    .video-item.active{
      background-color:#ffd100;
      color:#fff;
    }
    .video-item{
      min-width: 21.328vw;
      height: 10.1308vw;
      line-height: 10.1308vw;
      text-align: center;
      border-radius: 1.0664vw;
      background-color: #f0f0f0;
      margin-top: 1.66625vw;
      margin-right: 1.66625vw;
      padding: 0 2vw;
      position: relative;
      .nofree{
        width: 6.9316vw;
        height: 3.8657vw;
        line-height: 3.8657vw;
        font-size: 10px;
        color: #fff;
        background-color: #F73535;
        position: absolute;
        top: 0;
        right: 0;
        border-radius: 3px;
      }
    }
    .video-item:last-child{
      margin-right: 0;
    }
  }
}
.card-page{
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999;
  .mask{
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,.2);
    position: fixed;
    top: 0;
    left: 0;
  }
}
</style>
