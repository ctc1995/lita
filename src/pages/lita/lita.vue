<template>
  <div class="container">
    <!-- 个人信息 -->
    <div class="userinfo">
      <!-- <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" /> -->
      <div class="userinfo-avatar">
        <!-- <open-data type="userAvatarUrl"></open-data> -->
      </div>
      <div class="userinfo-nickname">
        <!-- <card :text="nickName"></card> -->
        <!-- <open-data type="userNickName"></open-data> -->
        <!-- <card :text="rankName" :textColor="'#FFD100'" :fontSize="14"></card> -->
        <p class="card" style="color: #FFD100; font-size:14px">
          {{rankName}}
        </p>
      </div>
      <span class="signin" @click="signinFunc()">{{signin}}</span>
    </div>
    <!-- 轮播图 -->
    <!-- <swiper  class="carousel"
      :indicator-dots="indicatorDots"
      :autoplay="autoplay"
      :interval="interval"
      :duration="duration"
      :circular="circular">
      <block v-for="(imgItem,index) in imgUrls" :key="index">
        <swiper-item>
          <image :src="imgItem.src" class="slide-image" width="355" height="150"/>
        </swiper-item>
      </block>
    </swiper> -->
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
      <span class="close" @click="hideCard()">X</span>
    </div>
    <!-- <div class="message" v-if="showCard">
      <div class="mask" @click="showCardFunc(false)"></div>
      <div class="form">
        <input id="name" placeholder="输入您的名字" auto-focus v-model="name"/>
        <input id="phone"  maxlength="11" placeholder="输入您的手机号码"  v-model="phone"/>
        <button type="primary" size="mini" @click="postMsg()">提交信息</button>
      </div>
    </div> -->
    <tab-bars :tabSelectIndex="1"></tab-bars>
  </div>
</template>

<script>
import tabBars from '../../components/footer'

export default {
  data () {
    return {
      showCard: false,
      allShow: false,
      // 推荐人userid
      scene: null,
      // 用户等级
      rankId: 1,
      // 等级名称
      rankName: '',
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
  methods: {}
}
</script>

<style lang="scss" scoped>
$navColors: (#FEE13F, #89F7FE, #FF5858, #FF9A9E,  #74EBD5);
.getInfo{
  width: 750rpx;
  height: 100vh;
  background-color: rgba(0,0,0,.2);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  .getInfo-card{
    width:500rpx;
    height:35vh;
    background-color:#ffffff;
    border-radius:8rpx;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    align-items:center;
    .title{
      width: 100%;
      color: #000000;
      font-size: 16px;
      text-align: center;
      padding: 20rpx 0;
      border-bottom: 1px solid #eee;
    }
    img{
      width: 80rpx;
      height: 80rpx;
      border-radius: 50%;
    }
    .content{
      width: 100%;
      font-size:14px;
      // text-align: center;
      padding: 0 20rpx;
      color: #595959;
      box-sizing: border-box;
    }
    .comfi{
      // margin-top: 20rpx;
      width: 100%;
      text-align: center;
      border-top: 1px solid #eee;
      display: flex;
      a{
        color: #000000;
        flex: 1;
        font-size:14px;
        padding: 18rpx 0;
      }
      a+a{
        border-left: 1px solid #eee;
        color: #1AAD16
      }
    }
  }
}
.modelCard{
  width: 750rpx;
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
    width: 50rpx;
    height: 50rpx;
    line-height: 50rpx;
    color: #ffffff;
    background-color: rgba(0,0,0,.5);
    font-size: 14px;
    border-radius: 50%;
    position: absolute;
    bottom: 160rpx;
    text-align: center;
  }
  .mask{
    width: 750rpx;
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
    width: 530rpx;
    height: 837rpx;
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
  width:750rpx;
  height:138rpx;
  display:flex;
  align-items:center;
  box-shadow:0px 0px 8px 0px rgba(0,0,0,0.12);
  padding:5rpx 42rpx 10rpx 31rpx;
  box-sizing: border-box;
  margin-bottom: 30rpx;
  position: relative;
  .userinfo-avatar{
    width:98rpx;
    height:98rpx;
    overflow:hidden;
    display: block;
    border-radius:50%;
    margin-right:19rpx;
  }
  .userinfo-nickname{
    font-size:14px;
  }
  .signin{
    height:50rpx;
    line-height:50rpx;
    font-size:14px;
    color: #ffffff;
    background-color:#FFD100;
    border-radius: 5px;
    padding:5rpx 15rpx;
    display:block;
    position:absolute;
    right:42rpx;
  }
}
.carousel{
  width:690rpx;
  height:296rpx;
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
  width: 750rpx;
  height: 208rpx;
  padding: 32rpx 42rpx;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  .navbar-item{
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content:space-between;
    .navbar-icon{
      width: 88rpx;
      height: 88rpx;
      border-radius: 5px;
      img{
        width: 80%;
        height: 80%;
        margin-top:10%;
        margin-left:10%;
      }
    }
    .navbar-text{
      font-size: 24rpx;
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
  width: 750rpx;
  height: 18rpx;
  background-color: #fafafa;
  margin-bottom: 32rpx;
}
.channel{
  width: 750rpx;
  height: auto;
  padding: 0 30rpx;
  box-sizing: border-box;
  .channel-title{
    width: 100%;
    // height: 28rpx;
    font-size: 16px;
    padding-left: 30rpx;
    margin-bottom: 32rpx;
    position: relative;
    display:flex;
    justify-content:space-between;
    align-items: center;
    box-sizing: border-box;
    .line{
      height: 100%;
      width: 6rpx;
      background-color: #FFD100;
      position: absolute;
      top: 0;
      left: 4rpx;
    }
    .get-all{
      font-size:24rpx;
      color:#999;
    }
  }
  .channel-list{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .list-item:nth-child(2n+2){
      margin-left: 30rpx;
    }
    .list-item{
      width: 330rpx;
      .item-cover{
        width: 330rpx;
        height: 185rpx;
        border-radius: 4px;
      }
      p{
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 0 4rpx;
        box-sizing: border-box;
      }
      .title1{
        height:36rpx;
        font-size: 28rpx;
        color: #262626;
      }
      .title2{
        height:28rpx;
        font-size: 22rpx;
        color: #888;
        margin: 4rpx 0 40rpx;
      }
    }
    // .cover{
    //   width:100%;
    //   height:298rpx;
    //   background-color: #FF9A9E;
    // }
  }
}
.channel + .channel{margin-top: 60rpx;}
.news{
  width: 750rpx;
  margin-top: 60rpx;
  padding: 0 20rpx;
  box-sizing: border-box;
  .news-title{
    width: 100%;
    // height: 28rpx;
    padding:0 20rpx;
    margin-bottom: 32rpx;
    position: relative;
    display:flex;
    justify-content:space-between;
    align-items: center;
    box-sizing: border-box;
    .new{
      font-size: 32rpx;
      color: #262626;
    }
    .change-other{
      color:#595959;
      font-size:28rpx;
    }
  }
  .news-list{
    margin-bottom: 32rpx;
    .news-list-cell{
      padding: 8rpx 0;
      margin-left: 20rpx;
      .news-list-cell-navigate{
        color:#595959;
        font-size:24rpx;
        max-width: 100%;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        .circle{
          display: inline-block;
          width:12rpx;
          height:12rpx;
          margin-right: 12rpx;
          background:rgba(89,89,89,1);
          border-radius:50%;
        }
      }
    }
  }
}
.column{
  margin: 30rpx 0;
  .column-title{
    width:100%;
    color: #262626;
    font-size: 32rpx;
    padding-left: 30rpx;
    margin-bottom: 32rpx;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    .line{
      height: 100%;
      width: 6rpx;
      background-color: #FFD100;
      position: absolute;
      top: 0;
      left: 4rpx;
    }
    .get-all{
      font-size: 12px;
      color: #999;
    }
  }
  .column-item{
    width:690rpx;
    max-height: 278rpx;
    padding: 20rpx 0;
    margin: 0 auto 20rpx;
    display: flex;
    box-shadow:0 6rpx 15rpx 2px #eee;
    border-radius: 8rpx;
    box-sizing: border-box;
    overflow: hidden;
    .left-view{
      padding: 9rpx;
      box-sizing: border-box;
      position: relative;
      .column-img{
        width: 200rpx;
        height:200rpx;
      }
      .play-column{
        display: block;
        position: absolute;
        top:50%;
        left:50%;
        margin: -27rpx 0 0 -27rpx;
        img{
          width: 54rpx;
          height:54rpx;
        }
      }
    }
    .right-view{
      width: 550rpx;
      position: relative;
      display: flex;
      flex-direction: column;
      padding: 8rpx 18rpx;
      .item-title{
        max-height: 77rpx;
        color:#262626;
        font-size: 14px;
        margin-bottom: 12rpx;
        overflow: hidden;
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .item-intro{
        max-height: 65rpx;
        font-size: 12px;
        color: #999;
        overflow: hidden;
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .item-intro+.item-intro{
        margin-top: 10rpx
      }
      .play-num{
        font-size: 24rpx;
        color:#999999;
        position: absolute;
        right: 30rpx;
        display: flex;
        align-items: center;
        bottom: 0;
        line-height: 28rpx;
        img{
          width: 28rpx;
          height: 28rpx;
          margin-right: 8rpx;
        }
      }
    }
  }
}
.message{
    width: 750rpx;
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
      width: 750rpx;
      height: 100vh;
      background-color: rgba(0,0,0,.3);
      position: absolute;
      z-index: 1;
    }
    .form{
      background-color: #ffffff;
      border: 1px solid #eee;
      border-radius: 5px;
      padding: 20rpx;
      box-sizing: border-box;
      width:450rpx;
      text-align:center;
      z-index: 2;
      input{
        margin:18rpx 0;
        border-radius:3px;
        border:1px solid #eee;
        padding:10rpx 20rpx;
        font-size:14px;
      }
    }
  }
</style>
