<template>
  <div class="audio">
      <!-- <scroll-view class="scroll-view_H audio-list"
        scroll-x
        style="width: 100%"> -->
    <div class="scroll-view-item_H audio-item"
      :id="index"
      v-for="(item, index) in pageList"
      :key="index"
      @click="getUrl(item.title, item.id)">
      <div class="left-view">
        <img :src="item.img" :alt="item.title" class="audio-img">
        <a href="" class="play-audio" v-if="pageId!=='written'">
          <!-- <img src="../../assets/images/left-play.png"> -->
        </a>
      </div>
      <div class="right-view">
          <p class="item-title">{{item.title}}</p>
          <p class="item-intro" v-if="pageId==='written'">{{item.intro}}</p>
          <span class="play-num">
            <img src="../../assets/images/playing.png">
            <span>{{item.playNum}}</span>人播放
          </span>
      </div>
    </div>
      <!-- </scroll-view> -->
  </div>
</template>
<script>
export default {
  props: ['pageId'],
  data () {
    return {
      // root: this.root,
      // http: new this.$util.Http(),
      scrollTop: 0,
      // pageId: 0,
      pageList: []
    }
  },
  methods: {
    getUrl (str, projectId) {
      console.log('id: ' + this.pageId)
      let route = {
        'path': ''
      }
      if (this.pageId == 5) {//eslint-disable-line
        route.path = '/audiodetail/' + projectId
      } else if (this.pageId == 3) {//eslint-disable-line
        route.path = '/videodetail/' + projectId
      } else {
        route.path = '/writtendetail/' + projectId
      }
      console.log(route)
      this.$router.push(route)
      // wx.navigateTo({ url })
    }
  },
  // 页面初始化
  created () {
    // 设置Bar头部颜色
    // this.pageId = this.$root.$mp.query.pageId
    console.log(this.pageId)
    if (this.pageId == 5) {//eslint-disable-line
    //   wx.setNavigationBarTitle({
    //     title: '音频频道'
    //   })
    } else if (this.pageId == 3) {//eslint-disable-line
    //   wx.setNavigationBarTitle({
    //     title: '视频频道'
    //   })
    } else {
    //   wx.setNavigationBarTitle({
    //     title: '文章阅读'
    //   })
    }
    this.$get(`index/product_list?cat_id=${this.pageId}&page=0`).then(res => {
      console.log(res.data)
      this.pageList = []
      for (let item of res.data.data) {
        let obj = {
          id: item.id,
          img: item.cover,
          title: item.name,
          playNum: item.browse_num,
          intro: Object.keys(item).indexOf('intro') === -1 ? item.intro : ''
        }
        this.pageList.push(obj)
      }
    })
  }
}
</script>
<style lang="scss" scoped>
  .audio-item{
    width:91.799vw;
    max-height: 37.0574vw;
    padding: 2.666vw 0;
    margin: 0 auto 2.666vw;
    display: flex;
    box-shadow:0 0.8vw 1.995vw 2px #eee;
    border-radius: 1.0664vw;
    box-sizing: border-box;
    overflow: hidden;
    .left-view{
      padding: 9rpx;
      box-sizing: border-box;
      position: relative;
      .audio-img{
        width:40.2566vw;
        height:22.661vw;
      }
      .play-audio{
        display: block;
        position: absolute;
        top:50%;
        left:50%;
        margin: -3.5991vw 0 0 -3.5991vw;
        img{
          width: 7.1982vw;
          height:7.1982vw;
        }
      }
    }
    .right-view{
      width: 73.315vw;
      position: relative;
      display: flex;
      flex-direction: column;
      padding: 1.8vw 3.7324vw 2.3994vw;
      .item-title{
        max-height: 10.2641vw;
        color:#262626;
        font-size: 14px;
        text-align: start;
        margin-bottom: 1.5996vw;
        overflow: hidden;
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .item-intro{
        max-height: 8.6645vw;
        font-size: 11px;
        color: #999;
        overflow: hidden;
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .play-num{
        font-size: 1rem;
        color:#999999;
        position: absolute;
        right: 3.99vw;
        display: flex;
        align-items: center;
        bottom: 0;
        line-height: 3.7324vw;
        img{
          width: 3.7324vw;
          height: 3.7324vw;
          margin-right: 1.0664vw;
        }
      }
    }
  }
</style>
