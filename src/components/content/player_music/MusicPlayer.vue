<template>
  <div class="music-player" key="music-player">
    <music-player-nav 
      @slideDown="slideDown">
    </music-player-nav>

    <music-player-body :w="true"></music-player-body>
  </div>
</template>

<script>
import MusicPlayerNav from './MusicPlayerNav'
import MusicPlayerBody from './MusicPlayerBody'


export default {
  name: 'MusicPlayer',
  components: {
    MusicPlayerNav,
    MusicPlayerBody
  },
  data() {
    return {
      display: true,
      // down: false
    }
  },
  mounted() {

  },
  beforeRouteEnter(to,from,next){
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建，通过next函数中的vm进行访问
    next(vm => {
      vm.display = true
    })
    // next()
  },
  methods: {
    slideDown() {
      // console.log("SlideDown");
      this.display = false
      this.$router.back() // this.$router.go(-1)
    }
  },
  destroyed() {
    console.log('destoryed');
  }
}
</script>

<style lang="less" scoped>
.w {
  margin: 0 auto;
  padding-left: 12px;
  padding-right: 12px;
}
.music-player {
  // 毛玻璃效果
  &::before {
    content: '';
    position: absolute;
    z-index: -1;
    top: 0; right: 0; bottom: 0; left: 0; // 铺满整个父元素
    filter: blur(12px);
    background: url('~assets/images/player-bgimg.jpg');
    background-size: cover;
  }
}
</style>