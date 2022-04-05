<template>
  <div class="song">
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
    <div class="lyric-inline padding12px">
      <span> 在一瞬间 </span>
    </div>

    <!-- 更多操作 -->
    <div class="more-action padding12px">
      <span 
        v-for="item in more_actions" :key="item"
        :class="'iconfont  ' + item"
      ></span>
    </div>
    
    <!-- 进度条 -->
    <div class="padding12px">
      <div class="pct-bar"
        @click="pct_move($event)"
      >
        <span class="gogo" :style="gogo" ></span>
      </div>
      <div class="time">
        <span class="used">{{currentTime}}</span>
        <span class="total">{{duration}}</span>
      </div>
    </div>

  </div>
</template>

<script>

import { debounce } from '@/components/common/debounce/debounce'

export default {
  name: 'Song',
  data() {
    return {
      more_titles: ['一起唱','音效','下载','评论','更多'],
      more_actions: 
        ['icon-sing','icon-yinxiao',
        'icon-xiazai','icon-xiaoxi1','icon-shudian'],
    }
  },
  props: {
    AUDIO: {type: Object, default() {return {}}}
  },
  computed: {
    LOOP(){
      return this.AUDIO.LOOP
    },
    MUSIC() {
      return this.AUDIO.MUSIC
    },
    title() {
      return this.MUSIC.title || 'Hello~'
    },
    duration() { // 音乐时长计算
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
    currentTime() { // 已播放时长计算
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
    pctbarw() { // 计算当前移动条宽度
      let pcbar = document.querySelector('.pct-bar')
      let width = null
      if(pcbar) width = pcbar.offsetWidth // 增加组件的判断选项，否则在组建失活时会报错
      // console.log('width',width);
      return width || 'width: 0px;'
    },
    gogo() { // 对进度条进行调整
      let curr =  this.$store.state.CURRENTTIME
      let duration = this.MUSIC.duration
      if(!curr || !duration) return '0px' // 默认返回值
      let pct = Math.floor(curr / duration * 1000) // 精细化
      // console.log(pct);
      let width = 'width:' + ( this.pctbarw * pct / 1000 ) + 'px;'
      // console.log(width);
      return width
    },
    cover_img() {
      return this.MUSIC.img
    },
    isplaying() {
      return !this.AUDIO.PAUSED
    },
    running_paused() {
      let style = this.isplaying ? 'running' : 'paused'
      let res  = 'animation-play-state: '.concat(style,';')
      return res
    },
  },
  methods: {
    pct_move: debounce(function dmove(e) {
      // console.log(e.offsetX); // 计算的正确距离
      let x = e.offsetX // 点击的位置
      let w = this.pctbarw // 进度条总宽度
      let duration = this.MUSIC.duration // 总时长
      if(isNaN(duration)) return;
      let pct = Math.floor(x / w * 1000) // 得到占比，乘上1000提高精度
      let currentTime = Math.floor(pct * duration / 1000)
      this.$audio.fastSeek(currentTime)
    },300)
  }
}
</script>

<style lang="less" scoped>
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
    transition: all .6s;
    // transition: all .6s cubic-bezier(.52,.01,0,1.13);
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
    animation: rotate-img 1.8s linear infinite;
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
  margin-top: 2px;
  color: #fff;
  .info {
    flex: 5;
    .music-name {
      width: 272px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
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

.lyric-inline {
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
  margin: 22px 0 2px;

  color: #fff;
  .iconfont {
    font-size: 24px;
  }
}
  // 未知bug，待查询，如果设置小的高度的div，那么元素无法放进去。只有设置了displayflex才允许
.pct-bar {
  display: flex;
  height: 4px;
  margin-top: 8px;
  background-color: rgba(121, 121,121,.3);

  .gogo {
    width: 0px;
    height: 100%;
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
  margin-top: 12px;
}
</style>