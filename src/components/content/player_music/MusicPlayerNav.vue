<template>
  <nav-bar v-show="display" lwidth="70px" rwidth="70px">
    <div class="left" slot="left">
      <span 
        :class="{
          'iconfont':true,
          'icon-arrow-down':true}"
        @click="slideDown"
      >
      </span>
    </div>
    <div class="center" slot="center">
      <span 
        :class="{title: true, 'active-title': currentIndex===index}" 
        v-for="(title,index) in titles" :key="title"
        @click="changeIndex(index)"
      >
        {{title}}
      </span>
    </div>
    <div class="right" slot="right">
      <span class="iconfont icon-fenxiang"></span>
    </div>
  </nav-bar>
</template>

<script>
import {debounce} from 'components/common/debounce/debounce'

import NavBar from 'components/common/nav_bar/NavBar'

export default {
  name: 'MusicPlayerNav',
  components: {
    NavBar
  },
  data() {
    return {
      shark: false, // 抖动
      display: true
    }
  },
  props: {
    currentIndex: {
      type: Number,
      default: 1
    }
  },
  computed: {
    titles() {
      return ['推荐','歌曲','歌词']
    }
  },
  methods: {
    changeIndex(index) {
      this.$emit('changeIndex',index)
    },
    slideDown: debounce(function dSlideDown() {
      this.$emit('slideDown')
    },180)
  }
}
</script>

<style lang="less" scoped>
.left,
.center,
.right {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 48px;
  line-height: 48px;
  color: #fff;
  // background-color: pink;
  .iconfont {
    font-size: 22px;
  }
}
.center{
  padding: 0 12px;
  font-size: 16px;
  .title {
    color: #7a8a99;
    transition: all .3s;
  }
}
.active-title {
  font-size: 18px;
  color: #fff!important;
}
</style>