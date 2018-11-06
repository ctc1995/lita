<template class="home">
  <div class="container">
    <div class="inte-num">
      可用积分：{{jifen}}
    </div>
    <div class="inte-item">
      <div class='topTabSwiper'>
          <div :class="currentData == 0 ? 'tab tabBorer' : 'tab'" :data-current = "0" @click='checkCurrent' style="margin-left: 5%;">积分明细</div>
          <div :class="currentData == 1 ? 'tab tabBorer' : 'tab'" :data-current = "1" @click='checkCurrent' style="margin-left: 10%;">积分排行</div>
      </div>
      <swiper :current="currentData" class='swiper' :duration="300" :bindchange="bindchange">
        <swiper-item>
					<div class='swiper_con'>
						<ul class="inte-list">
							<li class="inte-cell" v-for="(inteItem, index) in integralList" :key="index">
								<div>
									<p>{{inteItem.beizhu}}</p>
									<p class="inte-time">{{inteItem.addtime}}</p>
								</div>
								<span class="inte-consume">{{inteItem.num}}积分</span>
							</li>
						</ul>
					</div>
				</swiper-item> 
        <swiper-item>
					<div class='swiper_con'>
						<ul class="inte-list">
							<li class="inte-cell" v-for="(rankItem, index) in rankList" :key="index">
								<div class="rank-item">
									<!-- <image :src="rankItem.rankUserImg" /> -->
									<p>
										<image v-if="index==0" src="../../images/first.png" class="rankImg"/>
									  <image v-if="index==1" src="../../images/second.png" class="rankImg"/>
									  <image v-if="index==2" src="../../images/third.png" class="rankImg"/>
									</p>
									
									<p v-if="index>2" class="rankLv">{{index+1 <9 ? '0'+(index+1) : index+1}}</p>
									<image :src="rankItem.headavatar" class="rankUserImg"/>
									<p>{{rankItem.nickname}}</p>
								</div>
								<span class="inte-consume">{{rankItem.integral}}积分</span>
							</li>
						</ul>
					</div>
				</swiper-item>
      </swiper>
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
      userInfo: {},
      currentData: 0,
      jifen: 0,
      integralList: [
        // {
        //   inteTitle: '商业分析框架讲解《商业分析 框架讲解》',
        //   inteNum: '-88',
        //   inteTime: '2018.10.02 17：25：25'
        // },
        // {
        //   inteTitle: '签到',
        //   inteNum: '+33',
        //   inteTime: '2018.10.09'
        // },
        // {
        //   inteTitle: '签到',
        //   inteNum: '+888',
        //   inteTime: '2018.10.12'
        // }
      ],
      rankList: [
      ]
    }
  },
  onLoad: function () {
    this.integralList = []
    this.rankList = []
    userTopRanking({}).then(response => {
      this.rankList = response.data
    })
    this.getUserInfo()
  },
  methods: {
    bindViewTap () {
    //   const url = '../logs/main'
    //   wx.navigateTo({ url })
    },
    bindchange: function (e) {
      this.currentData = e.detail.current
    },
    // 点击切换，滑块index赋值
    checkCurrent: function (e) {
      if (this.currentData === e.target.dataset.current) {
        return false
      } else {
        this.currentData = e.target.dataset.current
      }
    },
    getUserInfo () {
      let data = {
        userid: this.$getStorage('userId'),
        type: 2,
        account_token: this.$getStorage('account_token')
      }
      console.log(data)
      this.$post('User/commission_record', data).then(res => {
        this.jifen = 0
        console.log(res.data.data)
        for (let item of res.data.data) {
          this.jifen += item.num - 0
          // console.log(item)
          let addtime = item.addtime + '000' - 0
          let obj = {
            'beizhu': item.beizhu,
            // 'addtime': this.$util.formatTime(new Date(addtime)),
            'num': item.num
          }
          console.log(obj)
          this.integralList.push(obj)
        }
        console.log(this.integralList)
      })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    // this.getUserInfo()
  }
}
</script>

<style lang="scss" scoped>
.container{

}
.inte-num{
  font-size: 1.5rem;
  width: 100%;
  padding: 4.8vw 0 4.8vw 4.8vw;
  color: #262626;
  border-bottom: 1px solid #E6E6E6;
  box-sizing: border-box;
}
.inte-item{
	width: 95%;
	margin: 0 auto;
}
.tab {
  float: left;
  width:30%;
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
  border-bottom: 2px solid #FFD100;
  color: #FFD100;
}

.swiper {
  width: 100%;
  min-height:80vh
}
swiper-item{
  overflow-x: hidden;
  overflow-y: scroll;
}
.swiper_con {
  text-align: center;
  width: 100%;
  height: 100%;
  padding: 5.3vw 0;
}
.inte-list{
	list-style: none;
	width:96%;
	margin:0 auto;
	.inte-cell{
		display: flex;
		padding: 3.47vw 3.73vw;
		border-radius:8px;
		box-sizing: border-box;
		color:#262626;
		font-size: 1.08rem;
		margin-bottom: 4.27vw;
		box-shadow:0px 0px 16px rgba(0,0,0,0.08);
		justify-content: space-between;
		p{
			text-align: left;
			margin-bottom: 1.33vw;
		}
		.rank-item{
			display: flex;
			p{
				display: flex;
				align-items:center;
				justify-content: center;
				margin-bottom: 0;
			}
			.rankLv{
				width: 6.67vw;
				text-align: center;
			}
			.rankImg{
				width: 6.67vw;
				height: 7.06vw;
			}
		}
		.rankUserImg{
			width: 11.7vw;
			height: 11.7vw;
			margin: 0 2.8vw 0 1.87vw;
			border-radius: 50%;
		}
		.inte-time{
			color: #808080;
			font-size: 1rem;
		}
		.inte-consume{
			display:flex;
			align-items:center;
		}
	}
}
</style>
