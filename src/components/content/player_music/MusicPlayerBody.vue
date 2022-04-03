<template>
  <div :class="{'music-player-body':true,w:w}">

    <!-- 音乐cover -->
    <div class="music-img">
      <img :class="{'record-rod':true,'rotate-start': isplaying}" 
        src="~assets/images/rod-c.png" alt="">
      <img v-if="!cover_img" class="cover" :style="running_paused" src="~assets/images/cover.webp"  alt="">
      <img v-if="cover_img" class="cover" :style="running_paused" :src="cover_img"  alt="">
    </div>

    <!-- 音乐信息 -->
    <div class="music-info padding12px">
      <div class="info">
        <h2 class="music-name">{{title}}</h2>
        <div class="singer">Christine Welch</div>
      </div>
      <div class="love">
        <span class="iconfont icon-xihuan"></span>
      </div>
    </div>

    <!-- 音乐歌词 -->
    <div class="lyric padding12px">
      <span> 在一瞬间 </span>
    </div>

    <div class="more-action padding12px">
      <span 
        v-for="(item,index) in more_actions" :key="index"
        :class="'iconfont  ' + item"
      ></span>
    </div>

    <div class="play-handler padding12px">
      <div class="pct-bar">
        <span class="gogo" :style="gogo" ></span>
      </div>
      <div class="time">
        <span class="used">{{currentTime}}</span>
        <span class="total">{{duration}}</span>
      </div>
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
export default {
  name: 'MusicPlayerBody',
  data() {
    return {
      more_titles: ['一起唱','音效','下载','评论','更多'],
      more_actions: 
        ['icon-sing','icon-yinxiao',
        'icon-xiazai','icon-xiaoxi1','icon-shudian'],
    }
  },
  props: {
    w: {
      type: Boolean,
      default: true
    },
  },
  computed:{
    AUDIO() {
      return this.$store.state.AUDIO
    },
    MUSIC() {
      return this.AUDIO.MUSIC
    },
    title() {
      return this.MUSIC.title || 'Hello~'
    },
    duration() {
      let duration = this.MUSIC.duration
      if(!this.MUSIC.duration) {
        return '00:00'
      }
      let minute = Math.floor(duration / 60)
      let second = Math.floor(duration % 60)
      if(minute < 10) minute = '0'.concat(minute)
      if(second < 10) second = '0'.concat(second)
      return minute+':'+second
    },
    currentTime() {
      let curr =  this.$store.state.CURRENTTIME
      if(!this.$store.state.CURRENTTIME) {
        return '00:00'
      }
      let minute = Math.floor(curr / 60)
      let second = Math.floor(curr % 60)
      if(minute < 10) minute = '0'.concat(minute)
      if(second < 10) second = '0'.concat(second)
      // console.log(minute,second);
      return `${minute}:${second}`
    },
    pcbarw() {
      let pcbar = document.querySelector('.pct-bar')
      let width = pcbar.offsetWidth
      // console.log('width',width);
      return width
    },
    gogo() {
      let curr =  this.$store.state.CURRENTTIME
      let duration = this.MUSIC.duration
      if(!curr || !duration) return '0px'
      let pct = Math.floor(curr / duration * 1000)
      let width = 'width:' + ( this.pcbarw * pct / 1000 ) + 'px;'
      console.log(width);
      return width
    },
    cover_img() {
      return this.MUSIC.img
    },
    isplaying() {
      return !this.AUDIO.PAUSED
    },
    handler_icons() {
      let icons = ['icon-liebiaoxunhuan','icon-prev',
        'icon-stop-music','icon-next','icon-yinleliebiao1']
      if(this.isplaying) {
        icons[2] = 'icon-play-music'
      }
      return icons
    },
    handler_objs() {
      return document.querySelectorAll('.handler')
    },
    running_paused() {
      let style = this.isplaying ? 'running' : 'paused'
      let res  = 'animation-play-state: '.concat(style,';')
      return res
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
      // 最后调用响应的函数即可，不需要再switch中写复杂的逻辑
      switch (index) {
        case 0:
          break;
        case 1:
          break;
        case 2:
          if(this.MUSIC.src === null) { // 如果url为空不允许点击按钮
            this.$audio.pause()
            console.log("Body src null");
            this.initMusicData()
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
          let className = 'handler iconfont ' // 注意空格
          if(this.isplaying) { // 通过判断是否播放了音乐对按钮进行控制
            className += 'icon-play-music'
          }else {
            className += 'icon-stop-music'
          }
          obj.className = className
          break
        case 3:
          break;
        case 4:
          break;
      }
      obj.style.transform = 'scale(1.8)'
      let timer = setTimeout(() => {
        obj.style.transform = 'scale(1)' // TODO: 如果同时渲染transition和一个变化的东西是不会发生transition过渡的
        clearTimeout(timer) // 在还未缩放完成的时候（transition设置比定时器还长的时间），此时就会更改
      },80)
    } // switch end
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
}

.music-img {
  position: relative;
  width: 280px;
  height: 280px;
  margin: 16px auto;
  // 播放杆
  .record-rod {
    position: absolute;
    z-index: 9;
    top: -4px;
    right: -26px;
    width: 86px;
    transition: all .6s cubic-bezier(.52,.01,0,1.13);
    transform-origin: 70% 20%;
    transform: rotate(-12deg);
  }
  .rotate-start{
    transform: rotate(2deg);
  }
  // 歌曲的封面
  .cover {
    width: 100%;
    height: 100%;
    padding: 48px;
    background: url('~assets/images/record.png');
    background-size: 280px;
    border-radius: 50%;
    transition: all 1s linear; // 失效，套一层和animation分开
    animation: rotate-img 1.6s linear infinite;
    animation-play-state:paused;
    -webkit-animation-play-state:paused;
  }
  .rotate-cover {
    // transform: rotate(180deg);
    // animation-fill-mode: forwards; // 对于无线次数的无效
    animation: rotate-img 1.6s linear infinite;
  }
}
@keyframes rotate-img {
  100% {
    transform: rotate(360deg);
  }
}

.padding12px {
  padding: 0 12px;
}
.music-info {
  display: flex;
  height: 62px;
  color: #fff;
  .info {
    flex: 5;
    .singer {
      margin-top: 12px;
      color: #D3D8DB;
      font-size: 14px;
    }
  }
  .love {
    flex: 1;
    .iconfont {
      display: block;
      text-align: center;
      color: #fff;
      font-size: 28px;
    }
  }
}

.lyric {
  height: 32px;
  line-height: 32px;
  font-size: 16px;
  color: #dee8ed;
}

.more-action {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  margin-top: 24px;

  color: #fff;
  .iconfont {
    font-size: 24px;
  }
}


.play-handler {
  height: 133px;
  padding-top: 12px;
}
  // 未知bug，待查询，如果设置小的高度的div，那么元素无法放进去。只有设置了displayflex才允许
.pct-bar {
  display: flex;
  height: 4px;
  background-color: rgba(121, 121,121,.3);

  .gogo {
    width: 0px;
    height: 4px;
    background-color: #fff;

    transition: all .8s;
  }

  &::after {
    display: inline-block;
    content: '';
    width: 8px;
    height: 8px;
    margin-top: -1px;
    border-radius: 50%;
    background-color: #fff;
  }
}
.time {
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
}

.handlers {
  display: flex;
  justify-content: space-between;
  height: 62px;
  line-height: 62px;
  margin-top: 8px;
  .handler {
    transition: all 1s;
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