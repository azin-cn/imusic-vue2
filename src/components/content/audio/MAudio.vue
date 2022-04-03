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
      :src="url" :paused="PAUSED"
      @timeupdate="updateTime"
      @ended="next"
      autoplay preload>
    </audio>
  </div>
</template>

<script>
import Vue from 'vue'
import {throttle} from 'components/common/debounce/debounce'


import { mapActions } from 'vuex'

import {reqMusicUrl} from 'api/music'

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
    ML() {
      return this.AUDIO.ML
    },
    PAUSED() {
      return this.AUDIO.PAUSED
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
    this.pause()
  },
  methods: {
    ...mapActions(['initMusicData','getMusicData']),
    async setMusic(id) {
      this.id = id
      let resp = await reqMusicUrl(id)
      if(resp.code !== 200 || resp.data[0].url === null) {
        console.log('url获取失败');
        // 进行提示
        this.$audio.pause() // 停止播放音乐
        this.initMusicData() // 重置当前的播放歌曲对象
      }
      let src = resp.data[0].url
      this.url = src  // 设置属性
      this.$refs.audio.load() // 重新加载
      return src
    },
    async play(music) { // 通过判断参数music来判断是继续播放还是播放新歌曲
      if(!music) { // 参数为空，继续播放
        if(this.url === null) { // 如果已经不是初始化的url，默认不为null
          this.$audio.pause()
          // console.log("maudio url null");
          this.initMusicData()
        }else this.$refs.audio.play() // 注意两个play方法是不一样的。
        return 
      }
      this.pause()
      music.src = await this.setMusic(music.id)

      this.$refs.audio.addEventListener('canplay', async ()=>{
        music.duration = this.$refs.audio.duration // 在加载完成以后，就可以获取duration
        await this.getMusicData(music) // 提交数据 id img src duration
      })
    },
    // fastSeek() | 在音频播放器中指定播放时间
    pause() {
      this.$refs.audio.pause()
      this.$set(this.$store.state.AUDIO,'PAUSED',true)
    },
    prev() { // 上一首
      let index = 0, len = this.ML.length
      for (let i = 0; i < this.ML.length; i++) {
        let ml = this.ML[i]
        if(ml.id === id) {
          index = i==0 ? len-1 : i-1
        }
      }
      this.play(this.ML[index])
    },
    next(id) { // 下一首
      let index = 0, len = this.ML.length
      for (let i = 0; i < this.ML.length; i++) {
        let ml = this.ML[i]
        if(ml.id === id) {
          index = i==len-1 ? 0 : i+1
        }
      }
      this.play(this.ML[index])
    },
    canplay(){ 
      // updateTime更新的有点频繁，可以在能够播放的时候，
      // 给定一个当前的时间戳，其余的地方根据整个时间戳就能知道播放多少时间了，
      // 但是又要注意暂停的问题，playing事件给出了比较好的解决方案
      // 能够监听缓冲或者是暂停之后开始播放的事件
    },
    updateTime: throttle(function dUpdate() { // currentTime是一个毫秒，节流以下
      // console.log(this.$refs.audio.currentTime);
      this.$set(
        this.$store.state,'CURRENTTIME',
        this.$refs.audio.currentTime
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