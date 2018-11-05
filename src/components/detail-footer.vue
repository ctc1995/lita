<template>
  <div class="detail-footer">
    <div class="btn index" @click="getUrl('index')">
      <span>首页</span>
    </div>
    <div class="btn price">
      <!-- <p>￥{{price}}</p> -->
    </div>
    <div class="btn shop" @click="getUrl(shopUrl)">
      <span>点击购买</span>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'price',
    'shopUrl'
  ],
  methods: {
    getUrl (str) {
      this.$router.push({'path': 'index'})
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-footer{
    width: 100vw;
    height: 13.034vw;
    background-color: #ffffff;
    display: flex;
    position: fixed;
    bottom: 0;
    border-top: 1px solid #E6E6E6;
    z-index: 99;
    .btn{
        height: 100%;
        color: #F73535;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        font-weight: 500;
    }
    .index{
        width: 26.66vw;
        border-right: 1px solid #e6e6e6;
    }
    .price, .shop{
        width: 36.6575vw;
    }
    .shop{
        background-color: #F73535;
        color: #ffffff;
    }
}
</style>
