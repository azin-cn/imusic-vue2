<template>
  <div class="music-player" key="music-player">
    <div class="bg" :style="running_paused"></div>

    <!-- 注意只是函数的引用地址，不是函数的返回值 -->
    <music-player-nav 
      @slideDown="slideDown"
      @changeIndex="changeIndex"
    > 
    </music-player-nav>

    <music-player-body 
      :w="true" 
      :currentIndex="currentIndex"
    ></music-player-body>
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
      currentIndex: 1,
    }
  },
  computed: {
    AUDIO() {
      return this.$store.state.AUDIO
    },
    PAUSED() {
      return this.AUDIO.PAUSED
    },
    MUSIC() {
      return this.AUDIO.MUSIC
    },
    BGIMG() {
      return this.MUSIC.img
    },
    running_paused() {
      let style = !this.PAUSED ? 'running' : 'paused'
      let res  = 'animation-play-state: '.concat(style,';')
      return res 
    },
  },
  watch: {
    'AUDIO': {
      immediate: true, // 立即监听
      deep: true,
      handler() {
        this.$nextTick(() => {
          let url = 'url('.concat(this.BGIMG,')')
          if(!this.MUSIC || !this.BGIMG || this.BGIMG.length === 0 ) url="" // 默认展示原有的数据
          let player = document.querySelector('.music-player')
          let bg = document.querySelector('.bg')
          if(player && bg) {
            // console.log(url,div);
            player.style.background = url
            bg.style.background = url
          }
        })
      }
    }
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
    },
    changeIndex(index) {
      this.currentIndex = index
    }
  },
}
</script>

<style lang="less" scoped>
.w {
  margin: 0 auto;
  padding-left: 12px;
  padding-right: 12px;
}
.music-player {
  overflow: hidden;
  position: relative;
  z-index: 0;
  height: 100vh;
  background-image: url('~assets/images/player-bgimg.jpg');
  // 毛玻璃效果，背景缩放效果
  .bg {
    position: absolute;
    z-index: -1;
    top: 0; right: 0; bottom: 0; left: 0; // 铺满整个父元素
    filter: blur(10px);
    background: url('~assets/images/player-bgimg.jpg') rgba(0, 0, 0, .6);
    // background-size: cover;
    background-size: 100% 100%;
    transform: scale(1.3);
    transform-origin: 60%;
    transition: all 1.6s cubic-bezier(.46,.23,0,1.45);
    animation: bg 1s linear infinite;
    animation-play-state: paused;
  }
}
@keyframes bg {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.8);
  }
  100% {
    transform: scale(1);
  }
}
</style>