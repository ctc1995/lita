<template>
  <div class="shop">
    <!-- <swiper indicator-dots autoplay>
      <block v-for="(item, index) of swiperImgs" :key="index">
        <swiper-item>
          <image :src="item.src" class="slide-image" width="355" height="150"/>
        </swiper-item>
      </block>
    </swiper> -->
    <el-carousel height="40vw" class="carousel">
      <el-carousel-item v-for="(imgItem,index) in swiperImgs" :key="index">
        <img :src="imgItem.src" class="slide-image"/>
      </el-carousel-item>
    </el-carousel>
    <!-- <p class="title">热销</p>
    <div class="product-list">
      <div class="product-item" v-for="(item, index) in productLists" :key="index" @click="getDetail()">
        <div class="product-image">
          <img :src="item.cover" :alt="item.title">
        </div>
        <p class="product-title">{{item.title}}</p>
        <p class="product-price">
          <span>￥{{item.price}}</span>
          <span>原价 ￥{{item.priceD}}</span>
        </p>
      </div>
    </div> -->
    <img src="http://54yym.com/lsfazrhrvbth4lt.jpg" class="shop-bg" alt="线下活动" @click="showCardFunc(true)">
    <div class="message" v-if="showCard">
      <div class="mask" @click="showCardFunc(false)"></div>
      <div class="form">
        <input id="name" placeholder="输入您的名字" auto-focus v-model="name"/>
        <input id="phone"  maxlength="11" placeholder="输入您的手机号码"  v-model="phone"/>
        <p class="tip">在线支付功能由于受限，暂不支持，请提供您的信息，我们将联系您！</p>
        <!-- <button type="primary" size="mini" @click="postMsg()">提交信息</button> -->
        <el-button type="primary" size="mini" @click="postMsg()">提交信息</el-button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      name: '',
      phone: '',
      showCard: false,
      swiperImgs: JSON.parse(this.$getStorage('bannerList')),
      productLists: [
        {
          cover: require('../../assets/images/product1.jpg'),
          title: '胡适谈哲学与人生',
          price: 17.5,
          priceD: 30
        },
        {
          cover: require('../../assets/images/product2.jpg'),
          title: '地狱变：芥川龙之介代表作，人生比地狱更像地狱！',
          price: 23.6,
          priceD: 35
        },
        {
          cover: require('../../assets/images/product3.jpg'),
          title: '万物有灵（诗经全文朗诵美图版）礼盒装',
          price: 59.9,
          priceD: 82
        },
        {
          cover: require('../../assets/images/product4.jpg'),
          title: '猫和银行家  一个投资启蒙的故事',
          price: 34.1,
          priceD: 58
        },
        {
          cover: require('../../assets/images/product5.jpg'),
          title: '七大王牌指标必杀技（胡斐最新力作)',
          price: 66,
          priceD: 87
        },
        {
          cover: require('../../assets/images/product6.jpg'),
          title: '经营者养成笔记  优衣库',
          price: 52.7,
          priceD: 92
        },
        {
          cover: require('../../assets/images/product7.jpg'),
          title: '智能商业20讲',
          price: 64.8,
          priceD: 108
        },
        {
          cover: require('../../assets/images/product8.jpg'),
          title: '心智力  商业奇迹的底层思维',
          price: 58,
          priceD: 78
        }
      ]
    }
  },
  methods: {
    getDetail () {
      // let url = '../product-detail/main'
      // wx.navigateTo({ url })
    },
    showCardFunc (bol, tag) {
      this.showCard = bol
      this.tag = tag
    },
    postMsg () {
      if (this.tag) {
        this.unifiedorder()
      } else {
        let msg = `购买书籍意向客户---姓名：${this.phone} 电话：${this.name}`
        let data = {
          'content': msg,
          'account_token': this.$util.getStorage('account_token'),
          'userid': this.$util.getStorage('userId')
        }
        this.http.post(undefined, 'user/feedback', JSON.parse(JSON.stringify(data))).then(res => {
          console.log(res.data)
          if (res.data.code === 1) {
            this.showCard = false
            this.$Message({
              message: '恭喜你，这是一条成功消息',
              type: 'success'
            })
          }
        })
      }
    }
  },
  created () {
    console.log(this.swiperImgs)
  }
}
</script>

<style lang="scss">
.shop-bg{
  width: 100vw;
}
.slide-image{
  width: 100%;
  height: 100%;
}
.title{
  width: 100vw;
  font-size: 1.5rem;
  text-align: center;
  color: #F73535;
  margin: 1.333vw 0;
}
.product-list{
  display:flex;
  flex-wrap:wrap;
  padding:0 4vw;
  box-sizing:border-box;
  justify-content:center;
  align-items:center;
  .product-item:nth-child(2n+2){
    margin-left: 4vw;
  }
  .product-item{
    width: 43.4vw;
    margin-bottom:4vw;
    border:1px solid #ddd;
    .product-image{
      width: 43.4vw;
      height: 46.655vw;
      background-color: #666;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .product-title{
      width: 100%;
      font-size: 14px;
      padding: 1.0664vw;
      border-top:1px solid #eee;
      box-sizing: border-box;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .product-price{
      width: 100%;
      font-size: 12px;
      padding: 1.0664vw;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span:first-child{
        color: #F73535;
      }
      span:last-child{
        color: #999;
        text-decoration: line-through;
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
    padding: 2.666vw;
    box-sizing: border-box;
    width:60vw;
    text-align:center;
    z-index: 2;
    .tip{
      font-size:12px;
      text-align:start;
      color:red;
    }
    input{
      margin:2.4vw 0;
      border-radius:3px;
      border:1px solid #eee;
      padding:1.333vw 2.666vw;
      font-size:14px;
    }
  }
}
</style>
