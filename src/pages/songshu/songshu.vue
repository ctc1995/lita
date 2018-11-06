<template>
  <div class="outline">
    <img src="http://54yym.com/6817a201811020954008977.png" alt="线下活动" @click="getUrl()">
  </div>
</template>

<script>
export default {
  data () {
    return {
      // showCard: false,
      totleFee: 0,
      prepayId: '',
      orderBody: '利他书籍--邮费'
    }
  },
  methods: {
    getUrl () {
      this.$MessageBox.confirm('填写收货地址，支付邮费领取书籍', '提交信息', {
        customClass: 'box',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info',
        center: true
      }).then(() => {
        this.$router.push({'path': 'addition'})
      }).catch(() => {
        this.$Message({
          message: `领取书籍需要提交信息支付邮费`,
          type: 'error'
        })
      })
    }
  },
  created () {}
}
</script>
<style lang="scss">
.outline {
  width: 100vw;
  img {
    width: 100vw;
    min-height: 100vh;
    position: relative;
    z-index: 1;
  }
}
.box {
  width: 90vw;
  position: fixed;
  left: 5vw;
  top: 30vw;
}
</style>
