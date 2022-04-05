<template>
  <div :class="{'music-player-body':true,w:w}">

    <song 
      v-if="currentIndex === 1"
      :AUDIO="AUDIO"
    ></song>

        <!-- 播放相关操作 -->
    <div class="play-handler padding12px">

      <div class="handlers">
        <span v-for="(handler_icon,index) in handler_icons" :key="index"
          :class="'handler iconfont  ' + handler_icon"
          @click="func_handler(index)"
        ></span>
      </div>
    </div>
  </div>
</template>


<script>
import { mapActions } from 'vuex'


/** children area */
import Song from './children/Song'

export default {
  name: 'MusicPlayerBody',
  components: {
    Song,

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

  },
  watch: {
    'AUDIO': {
      immediate: true, // 立即监听
      deep: true,
      handler() {}
    },
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
          className += this.LOOP ? 
            'icon-danquxunhuan' : 'icon-liebiaoxunhuan'
          obj.className = className
          break;
        case 1:
          this.$audio.prev()
          break;
        case 2:
          if(this.MUSIC.src === null) { // 如果url为空不允许点击按钮
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
          if(this.isplaying) { // 通过判断是否播放了音乐对按钮进行控制
            className += 'icon-play-music'
          }else {
            className += 'icon-stop-music'
          }
          obj.className = className
          break
        case 3:
          this.$audio.next()
          break;
        case 4:
          break;
      }// switch end
    }, 
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

.padding12px {
  padding: 0 12px;
}

.play-handler {
  padding: 0 12px;
}



.handlers {
  display: flex;
  justify-content: space-between;
  height: 62px;
  line-height: 62px;
  margin-top: 6px;
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
</style>