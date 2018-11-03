<template>
  <ul class="tabBars">
    <li class="tab-item" v-for="(item, index) of tabBars" :key="index" @click="changeTab(index)">
      <img class="icon" :src="tabSelectIndex == index ? item.selectedIconPath : item.iconPath" :alt="item.text">
      <span class="tabBar-text" :class="tabSelectIndex == index ? 'tabActive' : ''">{{item.text}}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: [
    'tabSelectIndex'
  ],
  data () {
    return {
      tabBars: [
        {
          'pagePath': 'pages/index/main',
          'text': '首页',
          'iconPath': require('../assets/images/index.png'),
          'selectedIconPath': require('../assets/images/index-select.png')
        },
        {
          'pagePath': 'pages/lita-home/main',
          'text': '利他之家',
          'iconPath': require('../assets/images/lita-home.png'),
          'selectedIconPath': require('../assets/images/lita-home-select.png')
        },
        {
          'pagePath': 'pages/home/main',
          'text': '我的',
          'iconPath': require('../assets/images/home.png'),
          'selectedIconPath': require('../assets/images/home-select.png')
        }
      ]
    }
  },
  methods: {
    changeTab (index) {
      // this.tabSelectIndex = index
      if (index === 1) {
        this.$router.push({ path: 'lita' })
      } else if (index === 2) {
        this.$router.push({ path: 'home' })
      } else {
        this.$router.push({ path: 'index' })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.tabBars{
  width: 100%;
  height: 4rem;
  background-color: #fff;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  padding: 0;
  margin: 0;
  border-top: 1px solid #ddd;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 99999;
  .tab-item{
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .icon{
      width: 2rem;
    }
    .tabActive{
      color: #FFD100;
    }
  }
}
</style>
