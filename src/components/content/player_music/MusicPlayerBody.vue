<template>
  <div 
    :class="{'music-player-body':true,w:w}"
    @touchstart="touchstart($event)"
    @touchend="touchend($event)"
  >

    <transition :name="slide_name" key="slide_song" mode="in-out">
      <song 
        v-show="currentIndex === 1"
        :AUDIO="AUDIO"
      ></song>
    </transition>

    <transition :name="slide_name" key="slide_lyric" mode="in-out">
      <lyric
        v-show="currentIndex === 2"
        :MUSIC="MUSIC"
        :touch="touch"
        :distanceY="distanceY"
      >
      </lyric>
    </transition>
    <!-- 播放相关操作 -->
    <div class="play-handler ">
      <div class="handlers">
        <span v-for="(handler_icon,index) in handler_icons" :key="index"
          :class="'handler iconfont  ' + handler_icon"
          @click="func_handler(index)"
        ></span>
      </div>
    </div>
    
    <transition key="music_playe_body_music_list" mode="out-in" name="slide-up-down">
      <music-list 
        v-if="ml_list_display"
        @toBlur="toBlur"
      >
        
      </music-list>
    </transition>

  </div>
</template>


<script>
import { mapActions } from 'vuex'

import MusicList from '../music_list/MusicLlist'

/** children area */
import Song from './children/Song'
import Lyric from './children/Lyric'

export default {
  name: 'MusicPlayerBody',
  components: {
    Song,
    Lyric,
    MusicList
  },
  data() {
    return {
      touch: false,
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
      slide_name: 'slide-left',
      ml_list_display: false
    }
  },
  props: {
    w: {
      type: Boolean,
      default: true
    },
    currentIndex: {
      type: Number,
      default: 1
    }
  },
  computed:{
    AUDIO() {
      return this.$store.state.AUDIO
    },
    MUSIC() {
      return this.AUDIO.MUSIC
    },
    isplaying() {
      return !this.AUDIO.PAUSED
    },
    handler_icons() {
      let icons = ['icon-liebiaoxunhuan','icon-prev',
        'icon-stop-music','icon-next','icon-yinleliebiao1']
      if(this.LOOP) {  // 单曲循环
        icons[0] = 'icon-danquxunhuan'
      }
      if(this.isplaying) { // 是否停止状态
        icons[2] = 'icon-play-music'
      }
      return icons
    },
    handler_objs() {
      return document.querySelectorAll('.handler')
    },
    distanceX() {
      return parseInt(this.endX - this.startX)
    },
    distanceY() {
      return parseInt(this.endY - this.startY)
    },

  },
  watch: {
    'AUDIO': {
      immediate: true, // 立即监听
      deep: true,
      handler() {}
    },
    'currentIndex': {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        let name;
        if(newVal > oldVal) { // 如果出现的是左滑动+1情况
          name = 'slide-right'
        }else if(newVal < oldVal) { // 如果出现的是右滑动-1的情况
          name = 'slide-left'
        }else return ;
        this.slide_name = name
      }
    }
  },
  methods: {
    ...mapActions(['initMusicData']),
    func_handler(index) {
      let obj = this.handler_objs[index]
      /** 优先响应动画 */
      // let time = Date.now()
      obj.style.transform = 'scale(1.1)'
      let timer = setTimeout(() => {
        obj.style.transform = 'scale(1)' // TODO: 如果同时渲染transition和一个变化的东西是不会发生transition过渡的
        // console.log(Date.now() - time);
        clearTimeout(timer) // 在还未缩放完成的时候（transition设置比定时器还长的时间），此时就会更改
      },80)

      // 最后调用响应的函数即可，不需要再switch中写复杂的逻辑
      let state = null
      let className = 'handler iconfont  ' // 注意空格
      switch (index) { // js中case没有作用域
        case 0:
          // 每次去相反的数据即可
          state = !this.$store.state.AUDIO.LOOP
          this.$set(this.$store.state.AUDIO,'LOOP',state)
          className += state ? 
            'icon-danquxunhuan' : 'icon-liebiaoxunhuan'
          obj.className = className
          break;
        case 1:
          this.$audio.prev()
          break;
        case 2:
          if(!this.MUSIC.src) { // 如果url为空不允许点击按钮 更新：要同时判断undefined
            this.$audio.pause()
            console.log("Body src null");
            this.initMusicData()
            return 
          }
          state = !this.$store.state.AUDIO.PAUSED
          // 或者使用 直接赋值 | Vue.set | this.$set 均能生效
          this.$set(this.$store.state.AUDIO,'PAUSED',state)
          if(state) { // 停止播放
            this.$audio.pause()
          }else {
            this.$audio.play()
          }
          className += this.isplaying ?
            'icon-play-music' : 'icon-stop-music'
          obj.className = className
          break
        case 3:
          this.$audio.next()
          break;
        case 4:
          this.ml_list_display = true
          // console.log(this.ml_list_display);
          break;
      }// switch end
    }, 
    touchstart(e) {
      // e.preventDefault();
      // console.log("touchstart",e);
      this.touch = true
      this.startX = e.touches[0].pageX;
      this.startY = e.touches[0].pageY;
      // console.log("startX",this.startX);
    },
    touchend(e) {
      // e.preventDefault();
      // console.log("touchend",e);
      this.touch = false
      this.endX = e.changedTouches[0].pageX
      this.endY = e.changedTouches[0].pageY;
      this.slide_left_right()
      this.slide_up_down()
    },
    slide_up_down() { // 更新移交给Lyric自行判断，将dy传入即可
      if(this.currentIndex !==2 ) return ; // 只有在歌词上下滑动才会有右效果
      // console.log(this.distanceY);
    },
    slide_left_right() {
      let curr = 0
      if(this.distanceX < -80){
        // console.log('往左滑动+1');
        curr = this.currentIndex === 2 ? 2 : this.currentIndex+1
      }else if(this.distanceX > 80){
        // console.log("往右滑动-1")
        curr = this.currentIndex === 0 ? 0 : this.currentIndex-1
      }else {
        return ;
      }
      this.startX = this.startY = this.endX = this.endY = 0
      this.changeIndex(curr); // 调用发送函数，让父组件更新状态，以便于props同步状态
    },
    changeIndex(index){
      this.$emit('changeIndex',index)
    },

    /* 播放列表的显示 */
    toBlur() {
      this.ml_list_display = false
    }
  }
}
</script>

<style lang="less" scoped>

.w {
  margin: 0 auto;
  padding-left: 12px;
  padding-right: 12px;
}

.music-player-body {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: calc(100vh - 48px);
}

.play-handler {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 36px);
  height: 62px;
  line-height: 62px;
}

.handlers {
  display: flex;
  justify-content: space-between;

  .handler {
    transition: all .1s;
  }
  .iconfont {
    color: #fff;
    font-size: 28px;
  }
  .iconfont:nth-child(3) {
    font-size: 48px;
  }
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all .6s;
}

.slide-left-enter,
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-50vh) rotate(20deg) scale(1.2);
}

.slide-left-enter-to,
.slide-left-leave {
  opacity: 1;
  transform: translateX(0) rotate(0deg) scale(1);
}

.slide-right-enter,
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(50vh) rotate(-20deg) scale(1.2); // 旋转和缩放
}
.slide-right-enter-to,
.slide-right-leave {
  opacity: 1;
  transform: translateX(0) rotate(0deg) scale(1); 
}

// 动画都是对称的，将进入的动画写好了之后可以直接协商reverse
.slide-up-down-enter,.slide-up-down-leave-to {
  // slide-up slide-down
  opacity: 0;
  transform: translateY(100vh);
}
.slide-up-down-enter-active, .slide-up-down-leave-active {
  transition: all .6s cubic-bezier(.52,.01,0,1.13);
}
.slide-up-down-leave,.slide-up-down-enter-to {
  // slide-up slide-down
  opacity: 1;
  transform: translateY(0);
}


</style>