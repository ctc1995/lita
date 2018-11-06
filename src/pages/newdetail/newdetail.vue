<template>
    <div class="new">
      <div class="new-title">
        {{newObj.title}}
      </div>
      <div class="new-info">
        <span>发表于{{newObj.addtime}}</span>
        <span>{{newObj.hits}}人阅读</span>
      </div>
      <div class="line"></div>
      <div v-html="newObj.content" class="new-detail"></div>
      <!-- <wxParse className="wxParse" :content="newObj.content" @preview="preview" @navigate="navigate" /> -->
      <!-- <rich-text :nodes="newObj.content"></rich-text> -->
    </div>
</template>
<script>
export default {
  props: ['newId'],
  data () {
    return {
      article: '<div>我是HTML代码</div>',
      newObj: {}
    }
  },
  methods: {},
  created () {
    let url = 'Index/information_info?newsid=' + this.newId
    this.$get(url).then(res => {
      console.log(res)
      this.newObj = res.data
    })
  }
}
</script>
<style lang="scss" scoped>
.new {
  width: 100vw;
  padding: 4.9321vw 4vw;
  box-sizing: border-box;
  color: #262626;
  position: relative;
  .new-title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 3.4658vw;
  }
  .new-info {
    color: #999;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 3.4658vw;
  }
  .info {
    width: 100vw;
    margin-left: -4vw;
    height: 1px;
    background-color: #e6e6e6;
  }
  .new-detail{
    font-weight: 400 !important;
  >>> div, >>> p {
      max-width: 91.977vw !important;
      text-indent: 30px;
      font-size: 15px !important;
      line-height: 23px !important;
      float: none !important;
    }
  }
  .new-detail >>> img {
    max-width: 91.977vw !important;
    margin: 4vw 0 !important;
  }
}
</style>
