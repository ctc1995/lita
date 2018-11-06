<template class="home">
  <div class="container">
    <div class="basis">
        <img src="../../assets/images/fund-header.png">
        <span class="balance-title">余额</span>
        <span class="balance">￥{{accountBalance}}</span>
        <button class="putout" @click="tixianFunc()">提现</button>
        <div class="have-putted">
            <div>
                <p>已提现奖金</p>
                <p class="num">￥{{tixian}}</p>
            </div>
            <div>
                <p>已获得奖金</p>
                <p class="num">￥{{bonus}}</p>
            </div>
        </div>
        <div class="bubble">
            <i class="bubble1"></i>
            <i class="bubble2"></i>
            <p class="bubble3"><!-- <i></i> --></p>
        </div>
    </div>
        <div class="fluid-item">
            <ul class="fluid-list">
                <li class="fluid-cell" v-for="(fundItem, index) in fundList" :key="index">
                    <span>￥{{fundItem.num}}</span>
                    <div class="right-cell">
                    <p>{{fundItem.beizhu}}</p>
                    <p class="addtime">{{fundItem.addtime}}</p>
                    </div>
                </li>
            </ul>
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
// import { formatTime } from '@/utils/index'
// import card from '@/components/card'

export default {
  data () {
    return {
      // 账户余额
      accountBalance: 0,
      // 已获得奖金
      bonus: 0,
      // 已提现奖金
      tixian: 0,
      userInfo: {},
      fundList: []
    }
  },
  methods: {
    tixianFunc () {
    //   wx.showToast({
    //     title: '非常抱歉，提现功能正在加急制作，近期上线！',
    //     icon: 'none'
    //   })
    },
    bindViewTap () {
    // const url = '../logs/main'
    //   wx.navigateTo({ url })
    },
    getUserInfo () {
      // this.userInfo.userId = this.$util.getStorage('userid')
      // this.userInfo.accountToken = this.$util.getStorage('account_token')
      let recordData = {
        userid: this.$getStorage('userId'),
        type: 1,
        account_token: this.$getStorage('account_token')
      }
      this.$post('User/commission_record', recordData).then(res => {
        // this.fundList = res.data.data
        for (let item of res.data.data) {
          let obj = {
            num: item.num,
            beizhu: item.beizhu
            // addtime: formatTime(new Date(item.addtime + '000' - 0))
          }
          this.fundList.push(obj)
        }
      })
      let monyData = {
        userid: this.$getStorage('userId'),
        account_token: this.$getStorage('account_token')
      }
      this.$post('user/get_account_info', monyData).then(res => {
        this.bonus = res.data.data.bonus
        this.tixian = res.data.data.tixian
        this.accountBalance = res.data.data.account_balance
      })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    }
  },
  onLoad () {
    this.$getStorage('userId')
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  },
  created () {
    // 调用应用实例的方法获取全局数据
    // this.getUserInfo()
  }
}
</script>

<style lang="scss" scoped>
.basis {
  width: 100%;
  padding-top: 7vw;
  position: relative;
  span {
    display: block;
    color: #ffffff;
    text-align: center;
  }
  img {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 52vw;
  }
  .balance-title {
    font-size: 16px;
  }
  .balance {
    font-size: 8.3vw;
  }
  .putout {
    width: 17.3vw;
    height: 6.67vw;
    line-height: 6.67vw;
    font-size: 16px;
    background: #ffffff;
    color: #432408;
    display: block;
    margin: 2.5vw auto 0;
    border: 0;
    border-radius: 5px;
  }
  .have-putted {
    display: flex;
    box-sizing: border-box;
    margin-top: 1.33vw;
    div {
      flex: 1;
      font-size: 16px;
      text-align: center;
      color: #ffffff;
      .num {
        font-size: 18px;
      }
    }
  }
  .bubble {
    text-align: center;
    margin-top: -10vw;
    i {
      display: block;
      margin: 0 auto;
    }
    .bubble1 {
      width: 2.4vw;
      height: 2.4vw;
      background: rgba(255, 255, 255, 1);
      border-radius: 50%;
      box-shadow: 0px 0px 0.78vw 0px rgba(0, 0, 0, 0.08);
    }
    .bubble2 {
      width: 3.73vw;
      height: 3.73vw;
      margin: 1.067vw auto;
      background: rgba(255, 255, 255, 1);
      border-radius: 50%;
      box-shadow: 0px 0px 1.13vw 0px rgba(0, 0, 0, 0.12);
    }
    .bubble3 {
      width: 6.67vw;
      margin: 0 auto;
      height: 6.67vw;
      background: rgba(255, 255, 255, 1);
      border-radius: 50%;
      box-shadow: 0px 0px 2.13vw 0px rgba(0, 0, 0, 0.28);
      i {
        display: inline-block;
        width: 1.6vw;
        height: 1.6vw;
        border-top: 0.53vw solid #ffd100;
        border-right: 0.53vw solid #ffd100;
        transform: rotate(135deg);
        position: absolute;
        margin: 2.13vw 0 0 -0.53vw;
      }
    }
  }
}
.fluid-item {
  margin: 3.2vw auto 0;
  width: 92vw;
  .fluid-list {
    list-style: none;
    .fluid-cell {
      padding: 1.87vw 2.13vw;
      display: flex;
      justify-content: space-between;
      align-items:center;
      border-bottom: 1px solid #e6e6e6;
      span {
        font-size: 14px;
        color: #262626;
      }
      .right-cell {
        display: flex;
        align-items: center;
        flex-direction: column;
        color: #999;
        font-size: 10px;
        p {
          padding: 1px 0;
        }
        .addtime {
          width: 100%;
          text-align: right;
          margin-top: 5px;
        }
      }
    }
  }
}
</style>
