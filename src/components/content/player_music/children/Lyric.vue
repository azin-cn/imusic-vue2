<template>
  <div class="lyric" 
    @scroll="mscroll($event)"
     ref="slide"
  >
    <ul class="slide-lyric" ref="slide_lyric">
      <li 
        v-for="(item,index) in time_lyric.lyrics" 
        :key="item+index"
        :class="{'active-lyric': currentIndex === index}"
        v-html="item"
      >{{item}}</li>
    </ul>
  </div>
</template>


<script>
export default {
  name: 'Lyric',
  data() {
    return {
      currentIndex: 0,
      height: 0,
      slide: {},
      offset: 0,
    }
  },
  props: {
    MUSIC: {type: Object, default() {return {}}},
    distanceY: {type: Number, default: 0},
    touch: {type: Boolean,default: false} // 如果正在触摸，那么停止此时的滚动
  },
  computed: {
    currentTime() {
      // console.log(this.$store.state.CURRENTTIME);
      return this.$store.state.CURRENTTIME
    },
    duration() {
      return this.$store.state.AUDIO.MUSIC.duration
    },
    time_lyric() {
      let lyric = this.MUSIC.lyric
      let times = [], lyrics = []
      if(!lyric) return {times, lyrics} // 对空的对象进行判断

      let lines = lyric.split('\n')
      lines.forEach((line) => {
        let temp = line.split(']')
        let _time = temp[0].slice(1)//去除第一个字符[
        let _lyric = temp[1]
        
        let [min,sec] = _time.split(':') // 分割分和秒
        _time = parseInt(min) * 60 + parseFloat(sec)

        if(isNaN(_time)) return ;
        times.push(parseFloat(_time))
        lyrics.push(_lyric)
      });
      // console.log(times,lyrics);
      return {times,lyrics}
    },
    timeline() {
      return this.time_lyric.times
    },
    lyric_list() {
      return this.time_lyric.lyrics
    },
    lis() {
      return document.querySelectorAll('li')
    }
  },
  watch: {
    '$store.state.CURRENTTIME': {
      immediate: true,
      deep: true,
      handler(newVal) {
        if(this.touch) return ; // 如果正在滑动，那么不触发
        let len = this.timeline.length
        let curr = newVal+0.5 // 因为通信的延迟，将进度调快一点
        if(curr < this.timeline[this.currentIndex]) this.currentIndex = 0 // 确保进度条是跟着时间走的，不会超前
        
        for (let i = this.currentIndex; i < len; i++) { // 注意是从currentIndex开始的
          if(curr >= this.timeline[i]) 
            this.currentIndex = i
          else break
          // console.log("currentIndex",this.currentIndex);
        }
        let offset = 0
        this.activeLyric(this.lyric_list[this.currentIndex]) // 将当前的歌词传送出去
        if(this.currentIndex >= 6) {
          offset = (this.currentIndex - 5) * 40 
        }
        if(!this.slide.scrollTo) return ;// 在还没有挂在的时候返回
        this.slide.scrollTo({
          top: offset,
          behavior: "smooth" 
        })
        this.offset = offset
      }
    },
    'duration': {
      immediate: true,
      deep: true,
      handler() {}
    },


  },
  mounted() {
    this.slide = this.$refs.slide //在watch中无法使用$refs
    this.$nextTick(() => {
      this.height = this.$refs.slide_lyric.offsetHeight
    })
  },
  // updated() {
  //   this.$nextTick(() => {
  //     console.log(document.querySelector('li').offsetHeight);
  //     this.liHeight = document.querySelector('li').offsetHeight  
  //   })
  // },
  methods: {
    mscroll(e) {
      // 通过touchmove的距离计算更合适，否则会冲突
    },
    activeLyric(lyric) {
      this.$set(
        this.$store.state,'ACTIVE_LYRIC',
        lyric
      )
    },
  }
}
</script>

<style lang="less" scoped>
.padding12px {
  padding: 0 12px;
}
ul {
  list-style: none;
}
li {
  height: 40px;
  line-height: 40px;
  margin: 0 auto;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: all .8s;
}

.lyric {
  position: relative;
  height: 100%;
  text-align: center;
  font-size: 17px;
  // 去除滚动条
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: scroll;
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
  &::-webkit-scrollbar {
    display: none;
  }


  &::after {
    content: '';
    display: inline-block;
    position: fixed;
    right: 0; bottom: 0; left:0; 
    height: 100px;
    filter: blur(12px)!important;
  }

}
.slide-lyric {
  padding-top: 32px;
  padding-bottom: 42vh;
  transition: all .8s;
}
.active-lyric {
  color: #fff;
  font-size: 18px;
}

</style>