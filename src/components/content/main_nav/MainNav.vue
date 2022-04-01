<template>
  <nav-bar class="main-nav nav-bar">
    <!-- 左侧 -->
    <div slot="left">
      <span class="iconfont icon-hanbaobao" />
    </div>

    <!-- 中部 -->
    <div slot="center" class="center">
      <span v-for="(item,index) in title" :key="index"
      :class="{title: true, titleActive: index === currentIndex}"
      @click="changeIndex(index)"
      >
        {{item}}
      </span>
    </div>

    <!-- 右侧 -->
    <div slot="right">
      <span class="iconfont icon-sousuo"></span>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from 'components/common/nav_bar/NavBar'

export default {
  name: 'MainNav',
  components: {
    NavBar
  },
  data() {
    return {
      currentIndex: 1,
      title: ['我的','发现','云村','视频'],
      routes: ['/mine','/discover','/village','/video'],
    }
  },
  methods: {
    changeRoute(path) {
      this.$router.replace(path).catch(() => {})
    },
    changeIndex(index=1) {
      this.currentIndex = index  // 使用的是RefImpl函数实例
      this.changeRoute(this.routes[index])
    },
  }
}
</script>

<style lang="less" scoped>
.iconfont {
  color: #494949;
  font-size: 5.333333vw;
}
.main-nav {
  z-index: 9;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
}
.nav-bar {
  height: 12.8vw;
  line-height: 12.8vw;
  border-bottom: 1px solid rgba(131, 131, 131, .4);
  border-radius: 0 0 8px 8px;
}
.center {
  text-align: center;

  .title {
    padding: 0 1.6vw;
    transition: all .2s; // 添加延时动态变化
  }
}

.titleActive {
  font-size: 4.8vw;
  // transform: scale(1.16); // 即使默认中心点放大，但是字体还有点布局中
  text-shadow: 0 1px #ccc;
}

</style>