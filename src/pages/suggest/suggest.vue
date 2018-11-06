<template class="home">
  <div class="container">
      <div class="suggest-item">
        <div>
          <span class="suggest-title">意见反馈</span>
          <p>尊敬的用户，您对我们平台有什么不满意的地方，可以提出反馈
            我们后台人员会及时处理，多谢您宝贵的意见！</p>
        </div>
        <div class="pleased">
          <span class="suggest-title please">您对我们平台满意吗？</span>
          <div class="choose">
            <span v-for="(pleaseItem, index) in pleaseList" :key="index" @click="addClass(index, pleaseItem)" v-bind:class="{ color:index==current}">{{pleaseItem.title}}</span>
          </div>
        </div>
        <div>
          <span class="suggest-title please">您给我们提出的意见是</span>
          <div>
            <textarea name="suggest" class="suggest" v-model="msg">

            </textarea>
          </div>
          <button class="weui-btn submit" @click="submitMsg()">提交</button>
        </div>
      </div>
    <!-- <div class="audio-list">
       <div class="audio-item" v-for="(audioItem, index) in audioLists" :key="index">
         <img class="audio-img" :src="audioItem.img" :alt="audioItem.text">
         <p class="audio-text">{{audioItem.text}}</p>
       </div>
     </div> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      current: 0,
      // 客户留言
      msg: '',
      // 客户评价等级
      level: '非常满意',
      pleaseList: [
        {
          title: '非常满意'
        },
        {
          title: '满意'
        },
        {
          title: '一般'
        },
        {
          title: '不满意'
        },
        {
          title: '非常不满意'
        }
      ]
    }
  },
  methods: {
    addClass: function (index, value) {
      this.current = index
      this.level = value.title
    },
    submitMsg: function () {
      let data = {
        userid: this.$getStorage('user_id'),
        content: `客户评价：${this.level}, 客户留言:${this.msg}`,
        account_token: this.$getStorage('account_token')
      }
      console.log(data)
      this.$post('user/feedback', data).then(res => {
        this.$Message({//eslint-disable-line
          message: `谢谢留言!`,
          type: 'success'
        })
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.suggest-item {
  width: 92%;
  font-size: 1.17rem;
  margin: 0 auto;
  padding-top: 4vw;
  p {
    line-height: 5.6vw;
    font-size: 1.2rem;
  }
  .suggest-title {
    display: inline-block;
    color: #ffd100;
    margin-bottom: 2.93vw;
  }
  .pleased {
    margin-top: 8.8vw;
  }
  .please::before {
    content: "";
    display: inline-block;
    width: 0.8vw;
    height: 3.5vw;
    margin-right: 2.13vw;
    line-height: 3.73vw;
    background: rgba(255, 209, 0, 1);
  }
  .choose {
    display: flex;
    flex-wrap: wrap;
    span {
      display: inline-block;
      width: 21.6vw;
      text-align: center;
      line-height: 6.93vw;
      height: 6.93vw;
      border-radius: 4.27vw;
      color: #8c8c8c;
      margin-right: 5.3vw;
      margin-bottom: 5.1vw;
      border: 1px solid rgb(230, 230, 230);
    }
    .color {
      color: #ffd100;
      border: 1px solid #ffd100;
    }
  }
  .suggest {
    height: 36vw;
    width: 100%;
    border-radius: 8px;
    border: 1px solid #fdd300;
    padding: 2.13vw;
    box-sizing: border-box;
    outline: 0;
  }
  .submit {
    margin-top: 8.53vw;
    height: 9.6vw;
    font-size: 1.17rem;
    line-height: 9.6vw;
    color: #fff;
    background-color: #ffd100;
    text-align: center;
    border-radius: 1.07vw;
  }
}
</style>
