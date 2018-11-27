<template class="home">
  <div class="container">
    <div class="inte-num">
      可用积分：{{jifen}}
    </div>
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick" stretch>
      <el-tab-pane label="积分明细" name="first">
        <div v-for="(item, index) in integralList" :key="index">
          <div class="infomation">
            <div>
              <p>{{item.beizhu}}</p>
              <p>{{item.addtime}}</p>
            </div>
            <label for="">{{item.num}} 积分</label>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="积分排行" name="second">
        <div class="rankings" v-for="(item, index) in rankings" :key="index">
          <div class="integral">
            <img v-if="index==0" src="../../assets/images/first.png" width="25" class="rankImg">
            <img v-if="index==1" src="../../assets/images/second.png" width="25" class="rankImg">
            <img v-if="index==2" src="../../assets/images/third.png"  width="25" class="rankImg">
            <p v-if="index>2" class="rankLv">{{index + 1 > 9 ? index+1 : '0'+(index+1)}}</p>
            <img :src="item.headavatar" alt="" width="45" style="border-radius: 50%;margin: 0 10px;">
            <p>{{item.nickname}}</p>
          </div>
          <label for="">{{item.integral}} 积分</label>
        </div>
      </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
import { formatTime } from '../../services/util'

export default {
  data () {
    return {
      activeName2: 'first',
      userInfo: {},
      rankings: {},
      currentData: 0,
      jifen: 0,
      integralList: [],
      rankList: []
    }
  },
  created: function () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
    this.$get('Index/user_top_ranking').then(res => {
      this.rankings = res.data.data
    })
  },
  methods: {
    handleClick (tab, event) {
      // console.log(tab, event)
    },
    getUserInfo () {
      let data = {
        userid: this.$getStorage('userid'),
        type: 2,
        account_token: this.$getStorage('account_token')
      }
      this.$post('User/commission_record', data).then(res => {
        this.jifen = 0
        for (let item of res.data.data) {
          this.jifen += item.num - 0
          let addtime = item.addtime + '000' - 0
          let obj = {
            beizhu: item.beizhu,
            'addtime': formatTime(new Date(addtime)),
            num: item.num
          }
          this.integralList.push(obj)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.container {}
.inte-num {
  font-size: 1.5rem;
  width: 100%;
  padding: 4.8vw 0 4.8vw 4.8vw;
  color: #262626;
  border-bottom: 1px solid #e6e6e6;
  box-sizing: border-box;
}
.inte-item {
  width: 95%;
  margin: 0 auto;
}
.tab {
  float: left;
  width: 30%;
  font-size: 1.17rem;
  text-align: center;
  padding: 4vw 5%;
}

.topTabSwiper {
  zoom: 1;
}

.topTabSwiper:after {
  content: "";
  clear: both;
  display: block;
}

.tabBorer {
  border-bottom: 2px solid #ffd100;
  color: #ffd100;
}

.swiper {
  width: 100%;
  min-height: 80vh;
}
swiper-item {
  overflow-x: hidden;
  overflow-y: scroll;
}
.swiper_con {
  text-align: center;
  width: 100%;
  height: 100%;
  padding: 5.3vw 0;
}
.inte-list {
  list-style: none;
  width: 96%;
  margin: 0 auto;
  .inte-cell {
    display: flex;
    padding: 3.47vw 3.73vw;
    border-radius: 8px;
    box-sizing: border-box;
    color: #262626;
    font-size: 1.08rem;
    margin-bottom: 4.27vw;
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.08);
    justify-content: space-between;
    p {
      text-align: left;
      margin-bottom: 1.33vw;
    }
    .rank-item {
      display: flex;
      p {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 0;
      }
      .rankLv {
        width: 6.67vw;
        height: 7.06vw;
        text-align: center;
      }
      .rankImg {
        width: 6.67vw;
        height: 7.06vw;
      }
    }
    .rankUserImg {
      width: 11.7vw;
      height: 11.7vw;
      margin: 0 2.8vw 0 1.87vw;
      border-radius: 50%;
    }
    .inte-time {
      color: #808080;
      font-size: 1rem;
    }
    .inte-consume {
      display: flex;
      align-items: center;
    }
  }
}
.rankings{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.integral{
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
}
.integral p{
  font-size: 14px;
}
.integral .rankLv{
  width: 25px;
  text-align: center;
}
.infomation,.rankings{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-shadow:0 0 16px rgba(0, 0, 0, 0.08);
  padding: 3.5vw 3.73vw;
  border-radius: 8px;
  box-sizing:border-box;
  color:#262626;
  margin-bottom: 10px;
}
</style>
