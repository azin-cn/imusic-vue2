<template>
  <div class="audio">
    <!-- 
      canplay（浏览器可以开始播放该音视频） 
      playing 已因缓冲而暂停或停止后已就绪时
      emptied	当目前的播放列表为空时触发。

      :paused="PAUSED" 能够作为同步播放，动画和歌曲
    -->
    <audio 
      id="audio" ref="audio" 
      :src="SRC" :paused="PAUSED"
      :loop="LOOP"
      @timeupdate="updateTime"
      @ended="ended" @canplay="canplay"
      autoplay preload>
    </audio>
  </div>
</template>

<script>
import Vue from 'vue'
import {throttle} from 'components/common/debounce/debounce'


import { mapActions } from 'vuex'

import { debounce } from '@/components/common/debounce/debounce'

export default {
  name: 'MAudio',
  data(){
    return {
      id: 0,
      url: 'url'  // 当前获得的数据
    }
  },
  computed: {
    AUDIO() {
      return this.$store.state.AUDIO
    },
    LOOP() {
      return this.AUDIO.LOOP
    },
    ML() {
      return this.AUDIO.ML
    },
    PAUSED() {
      return this.AUDIO.PAUSED
    },
    SRC() {
      return this.AUDIO.MUSIC.src
    }
  },
  watch: {
    'AUDIO': {
      immediate: true,
      deep: true,
      handler() {}
    }
  },
  mounted() {
    Vue.prototype.$audio = this // 添加在原型上，方便使用
    this.pause() // 默认是暂停的，不能修改
  },
  methods: {
    ...mapActions(['initMusicData','getMusicData']),
    canplay() {
      console.log('canplay');
      this.$set(
        this.$store.state.AUDIO.MUSIC,'duration',
        this.$refs.audio.duration)
    },
    async play(music) { // 通过判断参数music来判断是继续播放还是播放新歌曲
      if(!music) { // 参数为空，继续播放
        if(this.SRC === null) { // 如果已经不是初始化的url，默认不为null
          console.log("maudio url null");
          this.$audio.pause()
          this.initMusicData()
        }else {
          this.$set(this.$store.state.AUDIO,'PAUSED',false)
          this.$refs.audio.play() // 注意两个play方法是不一样的。
        }
        return 
      }
      this.pause() // 先暂停当前

      let context = this
      this.$refs.audio.addEventListener('canplay', 
        debounce(function submit() {
          // console.log(context)
          context.getMusicData(music) // 提交数据 id title img src singer等
        },300)()// 注意一定需要加上括号进行调用否则无法清除定时器
      )
    },
    pause() {
      this.$refs.audio.pause()
      this.$set(this.$store.state.AUDIO,'PAUSED',true)
    },
    ended() {
      if(this.LOOP === false) { // 当设定的不是循环时
        this.next()
      }
    },
    loop(state) {
      this.$set(this.$store.state.AUDIO,'LOOP',state)
    },
    async prev() { // 上一首 可以与next合并为一个函数
      let index = 0, len = this.ML.length
      for (let i = 0; i < this.ML.length; i++) {
        let ml = this.ML[i]
        if(ml.id === this.id) {
          index = i===0 ? len-1 : i-1
          break
        }
      }
      this.play(this.ML[index])
    },
    async next() { // 下一首
      let index = 0, len = this.ML.length
      for (let i = 0; i < this.ML.length; i++) {
        let ml = this.ML[i]
        if(ml.id === this.id) {
          index = i===len-1 ? 0 : i+1
          break
        }
      }
      this.play(this.ML[index])
    },
    async fastSeek(currentTime){ // 在音频播放器中指定播放时间(封装) 直接设定currentTime
      // console.log("%%%%%%",Math.floor(currentTime));
      this.$refs.audio.currentTime = Math.floor(currentTime)
      this.play();
    } ,
    canplay(){ 
      // updateTime更新的有点频繁，可以在能够播放的时候，
      // 给定一个当前的时间戳，其余的地方根据整个时间戳就能知道播放多少时间了，
      // 但是又要注意暂停的问题，playing事件给出了比较好的解决方案
      // 能够监听缓冲或者是暂停之后开始播放的事件
    },
    updateTime: throttle(function dUpdate() { // currentTime是一个毫秒，节流以下
      this.$set(
        this.$store.state,'CURRENTTIME',
        this.$refs.audio.currentTime.toFixed(6)
      )
    },1000)
  }
}
</script>

<style lang="less" scoped>
.audio {
  display: none;
}
</style>