<template>
  <div class="container">
    <!-- 个人信息 -->
    <div class="userinfo">
      <!-- <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" /> -->
      <div class="userinfo-avatar">
        <img class="userinfo-avatar" :src="userInfo.headavatar" background-size="cover" />
        <!-- <open-data type="userAvatarUrl"></open-data> -->
      </div>
      <div class="userinfo-nickname">
        <!-- <card :text="nickName"></card> -->
        <p class="card">
          {{userInfo.nickname}}
        </p>
        <!-- <open-data type="userNickName"></open-data> -->
        <!-- <card :text="rankName" :textColor="'#FFD100'" :fontSize="14"></card> -->
        <p class="card" style="color: #FFD100; font-size:14px">
          {{userInfo.rank_id == 0 ? '客户' : userInfo.rank_id == 1 ? '会员' : '代理人'}}
        </p>
      </div>
      <span class="signin" @click="signinFunc()">{{signin}}</span>
    </div>
    <!-- 轮播图 -->
    <el-carousel height="100%" class="carousel" :interval="interval">
      <el-carousel-item v-for="(imgItem,index) in imgUrls" :key="index">
        <img :src="imgItem.src" class="slide-image"/>
      </el-carousel-item>
    </el-carousel>
    <!-- 导航 -->
    <div class="navbar">
      <div class="navbar-item" v-for="(navBarItem, index) in navBars" :key="index" @click="getUrl2(navBarItem.href)">
        <div class="navbar-icon">
          <img :src="navBarItem.icon" :alt="navBarItem.text">
        </div>
        <div class="navbar-text">
          {{navBarItem.text}}
        </div>
      </div>
    </div>
    <!-- 分割线 -->
    <div class="divide"></div>
    <!-- 频道 -->
    <div class="channel" v-for="(item, index) in channelList" :key="item.id" v-if="!cardShow | index==0">
      <div class="channel-title">
        <i class="line"></i>
        <span class="new">{{item.name}}</span>
        <span class="get-all" @click="getUrl('channel', item.id)">查看全部</span>
      </div>
      <div class="channel-list">
        <!-- <img :src="item.cover" alt="音频封面" class="cover" @click="getUrl('channel', item.id)"> -->
        <div class="list-item" v-for="(itemItem, itemindex) in productList[item.id]" :key="itemindex" @click="getDetail(item.id, itemItem.id)">
          <img class="item-cover" :src="itemItem.cover" :alt="itemItem.name">
          <p class="title1">{{itemItem.name}}</p>
          <p class="title2">{{itemItem.name}}</p>
        </div>
      </div>
    </div>
    <!-- 新闻 -->
    <div class="news" v-if="!cardShow">
      <div class="news-title">
        <span class="new" style="color:#432408">最新<span style="color:#FFD100">资讯</span></span>
        <span class="change-other" @click="changeNews()">换一换</span>
      </div>
      <ul class="news-list">
        <li class="news-list-cell" v-for="item in newsList" :key="item.newsid" @click="getUrl('news', item.newsid)">
          <a class="news-list-cell-navigate"><span class="circle"></span>{{item.title}}</a>
        </li>
      </ul>
    </div>
    <!-- 专栏 -->
    <div class="column" v-if="!cardShow">
      <div class="column-title">
        <i class="line"></i>
        <span class="new">专栏推荐</span>
        <span class="get-all" @click="getUrl2('../column/main')">查看全部</span>
      </div>
      <!-- <scroll-view class="scroll-view_H column-list"
        scroll-x
        style="width: 100%">
        <div class="scroll-view-item_H column-item"
          :id="index"
          v-for="(item, index) in colList"
          :key="index">
          <div class="left-view">
            <img :src="item.cover" :alt="item.colTitle" class="column-img">
          </div>
          <div class="right-view">
              <p class="item-title">{{item.colTitle}}</p>
              <p class="item-intro">{{item.colIntro}}</p>
              <p class="item-intro">更新{{item.nowCount}}期,共{{item.total}}期</p>
              <span class="play-num">
                <span>{{item.colNum}}</span>人订阅
              </span>
          </div>
        </div>
      </scroll-view> -->
    </div>
    <!-- 弹出卡片 -->
    <!-- <div class="modelCard" v-if="cardShow & allShow"> -->
    <div class="modelCard" v-if="cardShow">
      <div class="mask" @click="hideCard()"></div>
      <img src="../../assets/images/index-online.png" alt="超级活动" @click="showCardFunc(true)">
    </div>
    <tab-bars :tabSelectIndex="0"></tab-bars>
  </div>
</template>

<script>
import tabBars from '../../components/footer'

export default {
  data () {
    return {
      allShow: false,
      // 推荐人userid
      scene: null,
      imgData: Object,
      cardShow: true,
      motto: 'Hello World',
      userInfo: {},
      signin: '签到',
      imgUrls: [],
      navBars: [],
      newsList: [],
      channelList: [],
      productList: [],
      indicatorDots: true,
      autoplay: true,
      circular: true,
      interval: 3000,
      duration: 500,
      colList: [
        {
          cover: '../../assets/images/audio-bg.jpg',
          colNum: 980,
          colTitle: '商业分析框架讲解《商业分析 框架讲解》',
          colIntro: '商业模式速成班，十天成为专家',
          nowCount: 60,
          total: 100
        },
        {
          cover: '../../assets/images/audio-bg.jpg',
          colNum: 980,
          colTitle: '商业分析框架讲解《商业分析 框架讲解》',
          colIntro: '逆向招商，现金增长1000倍的新方法',
          nowCount: 8,
          total: 8
        }
      ]
    }
  },
  components: {
    tabBars
  },
  methods: {
    showCardFunc (bol) {
      this.showCard = bol
      // let url = '../outline/main'
      // let that = this
      // wx.navigateTo({
      //   url: url,
      //   success: function () {
      //     that.hideCard()
      //   }
      // })
    },
    hideCard () {
      this.cardShow = false
    },
    signinFunc () {
      this.signin = '已签到'
      let data = {
        userid: this.$getStorage('userid'),
        account_token: this.$getStorage('account_token')
      }
      this.$post('user/qiandao', data).then(res => {
        console.log(res.data)
        if (res.data.code === 0) {
          Message({//eslint-disable-line
            message: `${res.data.msg}`,
            type: 'error'
          })
        } else {
          Message({//eslint-disable-line
            message: `签到成功！获得 ${res.data.data.qiandao_integral} 积分`,
            type: 'success'
          })
        }
      })
    }
  },
  created () {
    this.userInfo = {
      userid: this.$getStorage('userid'),
      headavatar: this.$getStorage('headavatar'),
      nickname: this.$getStorage('nickname'),
      openid: this.$getStorage('openid'),
      rank_id: this.$getStorage('rank_id'),
      referee_id: this.$getStorage('referee_id')
    }
    console.log(this.userInfo)
    this.$get('index/index').then(res => {
      console.log(res)
      let data = res.data
      for (let item of data.banner_list) {
        if (item.type === 1) {
          let obj = {
            src: item.src,
            href: item.link
          }
          this.imgUrls.push(obj)
        } else {
          let obj = {
            href: item.link,
            icon: item.src,
            text: item.title
          }
          this.navBars.push(obj)
        }
      }
      this.productList = data.product_list
      this.channelList = data.cat_list
      this.newsList = data.information
    }).then(err => {
      console.log(err)
    })
  }
}
</script>

<style lang="scss" scoped>
$navColors: (#FEE13F, #89F7FE, #FF5858, #FF9A9E,  #74EBD5);
.getInfo{
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,.2);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  .getInfo-card{
    width:66.667vw;
    height:35vh;
    background-color:#ffffff;
    border-radius:4px;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    align-items:center;
    .title{
      width: 100%;
      color: #000000;
      font-size: 16px;
      text-align: center;
      padding: 2.667vw 0;
      border-bottom: 1px solid #eee;
    }
    img{
      width: 10.667vw;
      height: 10.667vw;
      border-radius: 50%;
    }
    .content{
      width: 100%;
      font-size:14px;
      // text-align: center;
      padding: 0 2.667vw;
      color: #595959;
      box-sizing: border-box;
    }
    .comfi{
      // margin-top: 2.667vw;
      width: 100%;
      text-align: center;
      border-top: 1px solid #eee;
      display: flex;
      a{
        color: #000000;
        flex: 1;
        font-size:14px;
        padding: 2.4vw 0;
      }
      a+a{
        border-left: 1px solid #eee;
        color: #1AAD16
      }
    }
  }
}
.modelCard{
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 8;
  .close{
    width: 6.667vw;
    height: 6.667vw;
    line-height: 6.667vw;
    color: #ffffff;
    background-color: rgba(0,0,0,.5);
    font-size: 14px;
    border-radius: 50%;
    position: absolute;
    bottom: 21.334vw;
    text-align: center;
  }
  .mask{
    width: 100vw;
    height: 100%;
    background-color: rgba(0,0,0,.2);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  img{
    width: 70.667vw;
    height: 111.6vw;
    border-radius: 6px;
    position: relative;
    z-index: 2;
  }
}
.container{
  overflow: hidden;
  position: relative;
}
.userinfo{
  width:100vw;
  height:18.4vw;
  display:flex;
  align-items:center;
  box-shadow:0px 0px 8px 0px rgba(0,0,0,0.12);
  padding:0.667vw 5.6028vw 1.334vw 4.1354vw;
  box-sizing: border-box;
  margin-bottom: 4vw;
  position: relative;
  .userinfo-avatar{
    width:13.0732vw;
    height:13.0732vw;
    overflow:hidden;
    display: block;
    border-radius:50%;
    margin-right:2.5346vw;
  }
  .userinfo-nickname{
    font-size:14px;
    .card{
      text-align: start;
    }
  }
  .signin{
    height:6.667vw;
    line-height:6.667vw;
    font-size:14px;
    color: #ffffff;
    background-color:#FFD100;
    border-radius: 5px;
    padding:0.667vw 2vw;
    display:block;
    position:absolute;
    right:5.6028vw;
  }
}
.carousel{
  width:92.046vw;
  height:39.4864vw;
  background:rgba(211,205,180,1);
  margin: 0 auto;
  border-radius:8px;
  .slide-image{
    width:100%;
    height:100%;
    border-radius: 5px;
  }
}
.navbar{
  width: 100vw;
  // height: 27.7472vw;
  padding: 4.2688vw 5.6028vw;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  .navbar-item{
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content:space-between;
    .navbar-icon{
      width: 11.7392vw;
      height: 11.7392vw;
      margin-bottom: 2vw;
      border-radius: 5px;
      img{
        width: 80%;
        height: 80%;
        margin-top:10%;
      }
    }
    .navbar-text{
      font-size: 12px;
      color: #262626;
    }
  }
  @for $i from 1 through 5{
    $item: nth($navColors, $i);
    .navbar-item:nth-child(#{$i}){
      .navbar-icon{
        background-color: $item;
      }
    }
  }
}
.divide{
  width: 100vw;
  height: 2.4vw;
  background-color: #fafafa;
  margin-bottom: 4.2688vw;
}
.channel{
  width: 100vw;
  height: auto;
  padding: 0 4vw;
  box-sizing: border-box;
  .channel-title{
    width: 100%;
    // height: 3.7352vw;
    font-size: 16px;
    padding-left: 4vw;
    margin-bottom: 4.2688vw;
    position: relative;
    display:flex;
    justify-content:space-between;
    align-items: center;
    box-sizing: border-box;
    .line{
      height: 100%;
      width: 0.8vw;
      background-color: #FFD100;
      position: absolute;
      top: 0;
      left: 0.5332vw;
    }
    .get-all{
      font-size: 12px;
      color:#999;
    }
  }
  .channel-list{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .list-item:nth-child(2n+2){
      margin-left: 4vw;
    }
    .list-item{
      width: 44vw;
      .item-cover{
        width: 44vw;
        height: 24.6605vw;
        border-radius: 4px;
      }
      p{
        width: 100%;
        text-align: start;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 0 0.5332vw;
        box-sizing: border-box;
      }
      .title1{
        height:4.8024vw;
        font-size: 3.7352vw;
        color: #262626;
      }
      .title2{
        height:3.7352vw;
        font-size: 11px;
        color: #888;
        margin: 0.5332vw 0 5.336vw;
      }
    }
    // .cover{
    //   width:100%;
    //   height:298rpx;
    //   background-color: #FF9A9E;
    // }
  }
}
.channel + .channel{margin-top: 8vw;}
.news{
  width: 100vw;
  margin-top: 8vw;
  padding: 0 2.667vw;
  box-sizing: border-box;
  .news-title{
    width: 100%;
    // height: 3.7352vw;
    padding:0 2.667vw;
    margin-bottom: 4.2688vw;
    position: relative;
    display:flex;
    justify-content:space-between;
    align-items: center;
    box-sizing: border-box;
    .new{
      font-size: 4.2688vw;
      color: #262626;
    }
    .change-other{
      color:#595959;
      font-size:3.7352vw;
    }
  }
  .news-list{
    margin-bottom: 4.2688vw;
    .news-list-cell{
      padding: 1.0672vw 0;
      margin-left: 2.667vw;
      list-style: none;
      text-align: start;
      .news-list-cell-navigate{
        color:#595959;
        font-size:12px;
        max-width: 100%;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        .circle{
          display: inline-block;
          width:1.6vw;
          height:1.6vw;
          margin-right: 1.6vw;
          background:rgba(89,89,89,1);
          border-radius:50%;
        }
      }
    }
  }
}
.column{
  margin: 4vw 0;
  .column-title{
    width:100%;
    color: #262626;
    font-size: 4.2688vw;
    padding-left: 4vw;
    margin-bottom: 4.2688vw;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    .line{
      height: 100%;
      width: 0.08vw;
      background-color: #FFD100;
      position: absolute;
      top: 0;
      left: 0.5332vw;
    }
    .get-all{
      font-size: 12px;
      color: #999;
    }
  }
  .column-item{
    width:92.046vw;
    max-height: 37.0852vw;
    padding: 2.667vw 0;
    margin: 0 auto 2.667vw;
    display: flex;
    box-shadow:0 0.08vw 2vw 2px #eee;
    border-radius: 1.0672vw;
    box-sizing: border-box;
    overflow: hidden;
    .left-view{
      padding: 1.2vw;
      box-sizing: border-box;
      position: relative;
      .column-img{
        width: 26.68vw;
        height:26.68vw;
      }
      .play-column{
        display: block;
        position: absolute;
        top:50%;
        left:50%;
        margin: -3.6018vw 0 0 -3.6018vw;
        img{
          width: 7.2036vw;
          height:7.2036vw;
        }
      }
    }
    .right-view{
      width: 56.667vw;
      position: relative;
      display: flex;
      flex-direction: column;
      padding: 1.0672vw 2.4vw;
      .item-title{
        max-height: 10.2718vw;
        color:#262626;
        font-size: 14px;
        margin-bottom: 1.6vw;
        overflow: hidden;
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .item-intro{
        max-height: 8.671vw;
        font-size: 12px;
        color: #999;
        overflow: hidden;
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .item-intro+.item-intro{
        margin-top: 1.334vw
      }
      .play-num{
        font-size: 12px;
        color:#999999;
        position: absolute;
        right: 4vw;
        display: flex;
        align-items: center;
        bottom: 0;
        line-height: 3.7352vw;
        img{
          width: 3.7352vw;
          height: 3.7352vw;
          margin-right: 1.0672vw;
        }
      }
    }
  }
}
.message{
    width: 100vw;
    height: 100vh;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    position:fixed;
    top:0;
    left:0;
    z-index: 9;
    .mask{
      width: 100vw;
      height: 100vh;
      background-color: rgba(0,0,0,.3);
      position: absolute;
      z-index: 1;
    }
    .form{
      background-color: #ffffff;
      border: 1px solid #eee;
      border-radius: 5px;
      padding: 2.667vw;
      box-sizing: border-box;
      width:46.667vw;
      text-align:center;
      z-index: 2;
      input{
        margin:2.4vw 0;
        border-radius:3px;
        border:1px solid #eee;
        padding:1.334vw 2.667vw;
        font-size:14px;
      }
    }
  }
</style>
