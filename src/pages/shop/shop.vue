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
    <p class="title">热销</p>
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
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
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
    }
  },
  created () {
    console.log(this.swiperImgs)
  }
}
</script>

<style lang="scss">
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
</style>
