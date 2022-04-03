<template> <!--阻止事件捕获和阻止事件冒泡-->
  <div class="play-tab-bar" @click="to_player">
    <nav-bar class="nav-bar" rwidth="90px">
      <div class="left" slot="left">
        <div class="record-img">
          <img src="~assets/images/record.png" alt=""
            class="playing-rotate"
            :style="running_paused"
          >
        </div>
      </div>

      <div class="center" :style="running_paused" slot="center">
        <div 
          :class="{'playing-slide-words': isPlaying}"
        >
          {{title}}
        </div>
      </div>
        
      <div class="right" slot="right">
        <!--阻止事件冒泡-->
        <span @click.stop="play_stop" 
          :class="{
            'iconfont': true, 
            'icon-play-music': isPlaying,
            'icon-stop-music': !isPlaying }"
        ></span>
        <span @click.stop="show_music_list"
          class="iconfont icon-yinleliebiao">
        </span>
      </div>
    </nav-bar>
  </div>
</template>

<script>

import NavBar from 'components/common/nav_bar/NavBar'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'PlayTabBar',
  data() {
    return {
      
    }
  },
  components: {
    NavBar
  },
  computed: {
    AUDIO() {
      return this.$store.state.AUDIO
    },
    MUSIC(){
      return this.AUDIO.MUSIC
    },
    title() {
      return this.MUSIC.title || '暂未播放歌曲，快去选一首吧~'
    },
    isPlaying() {
      return !this.AUDIO.PAUSED
    },
    running_paused() {
      let state = this.isPlaying ? 'running' : 'paused'
      let res = 'animation-play-state: '.concat(state,';')
      return res
    }
  },
  watch: {
    'AUDIO' : {
      immediate: true,
      deep: true,
      handler() {}
    }
  },
  methods: {
    ...mapActions(['initMusicData']),
    to_player(){
      this.$router.push('/musicplayer')
    },
    play_stop(e) {
      if(this.MUSIC.src === null) { // 如果url为空不允许点击按钮
        this.$audio.pause()
        this.initMusicData()
        console.log("tab src null");
        return 
      }
      let state = !this.$store.state.AUDIO.PAUSED
      // 或者使用 直接赋值 | Vue.set | this.$set 均能生效
      this.$set(this.$store.state.AUDIO,'PAUSED',state)
      if(state) { // 停止播放
        this.$audio.pause()
      }else {
        this.$audio.play()
      }
      let obj = e.target
      this.scale_icon(obj)
    },
    show_music_list(e) {
      let obj = e.target
      this.scale_icon(obj)
    },
    scale_icon(obj) {
      obj.style.transform = 'scale(1.1)'
      let timer = setTimeout(() => {
        obj.style.transform = 'scale(1)'
        clearTimeout(timer)
      }, 80);
    }
  }
}
</script>

<style lang="less" scoped>
.play-tab-bar {
  position: fixed;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  width: 100%;
  height: 60px;
  padding: 2px 18px;
  box-shadow: 0 0 6px 2px rgba(131, 131, 131, .3);
  background-color: #fff;
  border-radius: 12px 12px 0 0;

  perspective: 800px;
  transform-style: preserve-3d;
}

.left,
.right {
  display: flex;
  justify-content: space-between;
  color: #000;
  .iconfont {
    flex: 1;
    font-size: 24px;
  }
}
.center {
  width: 180px;
  padding-left:12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 700;
  transition: all .6s;
  animation: scale-title 3s ease-in-out infinite;
}
.record-img {
  position: absolute;
  top: -8px;
  z-index: 9;
  margin: 0 4px;
  img {
    width: 54px;
    border-radius: 50%;
    box-shadow: 0 0 6px 3px #ccc;
    transition: all 1s;
  }
}
.playing-rotate {
  animation: rotate-record 1.6s linear infinite;
  animation-play-state: paused;
}
@keyframes rotate-record {
  0% {
    transform: scale(1) rotate(0deg);
  }
  50% {
    transform: scale(1.13) rotate(180deg);
  }
  100% {
    transform: scale(1) rotate(360deg);
  }
}

@keyframes scale-title {
  // 0% {
  //   transform: rotate(0deg) scale(1);
  // }
  // 25% {
  //   transform: rotate(6deg) scale(1.04);
  // }
  // 50% {
  //   transform: rotateX(180deg) scale(1);
  // }
  // 75% {
  //   transform: rotate(-6deg) scale(1.04);
  // }
  // 100% {
  //   transform: rotate(0deg) scale(1);
  // }
  0% {
    transform: translateZ(10px) rotateX(0) ;
  }
  25% {
    transform: translateY(10px) rotateX(-90deg);
  }
  50% {
    transform: translateZ(-10px) rotateX(-180deg) ;
  }
  75% {
    transform: translateY(-10px) rotateX(-270deg) ;
  }
  100% {
    transform: translateZ(10px) rotateX(-360deg) ;
  }
}
</style>