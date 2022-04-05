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
      // this.$refs.audio.load() //不能写在这，否则无法加载组件，因为会引发循环
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
    ...mapActions(['initMusicData','getMusicData','getMusicDuration']),
    canplay: debounce(function submit() {
      let duration = this.$refs.audio.duration
      // console.log("maudio duration ",duration);
      this.getMusicDuration(duration)
    },100),
    updateTime: throttle(function dUpdate() { // currentTime是一个毫秒，节流以下
      if(!this.$refs.audio) return ;
      this.$set(
        this.$store.state,'CURRENTTIME',
        this.$refs.audio.currentTime
      )
    },1000),
    
    async play(music) { // 通过判断参数music来判断是继续播放还是播放新歌曲
      if(!music) { // 参数为空，继续播放
        if(this.SRC === null) { // 如果已经不是初始化的url，默认不为null
          console.log("maudio url null");
          this.$audio.pause()
          this.initMusicData()
        }else {
          this.$set(this.$store.state.AUDIO,'PAUSED',false)
          this.$refs.audio.play() // 注意两个play方法是不一样的
        }
        return 
      }
      this.pause() // 先暂停当前
      this.id = music.id // 新的音乐id
      this.getMusicData(music) // 提交数据 id title img src singer等
      /** 当能够播放的时候，canplay回进行监听 */
      this.$refs.audio.load() // 重新加载
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
      let len = this.ML.length,index = len-1 // 注意蕴含的默认条件，当当前的歌曲不能播放时，播放的是列表中最后一首
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
      let len = this.ML.length,index = 0 // 注意蕴含条件，如果当前的歌曲不能播放，那么播放的是列表中的第一首
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
    },

  }
}
</script>

<style lang="less" scoped>
.audio {
  display: none;
}
</style>