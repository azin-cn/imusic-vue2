<template>
  <div class="lyric">
    <ul>
      <li 
        v-for="(item,index) in time_lyric.lyric" 
        :key="item"
        :class="{'active-lyric': currentIndex === index}"
      >{{item}}</li>
    </ul>
  </div>
</template>


<script>
export default {
  name: 'Lyric',
  data() {
    currentIndex: 0
  },
  computed: {

    time_lyric() {
      let lyric = this.$store.state.AUDIO.MUSIC.lyric
      let lines = lyric.split('\n')
      let times = [], lyrics = []
      if(!lyric) return {times, lyrics} // 对空的对象进行判断
      
      lines.forEach(line => {
        let temp = line.split(']')
        let _time = temp[0].slice(1)//去除第一个字符[
        let _lyric = temp[1]
        
        let _times = _time.split(':') // 分割分和秒
        _time = 
          parseInt(_times[0].trim()) * 60 
          + parseFloat(_times[1].trim())

        times.push(_time)
        lyrics.push(_lyric)
      });

      return {time,lyrics}
    },
    currentTime() {
      let curr = this.$store.state.CURRENTTIME
      console.log(curr);
      return curr
    },
    current_lyric() {
      if(this.currentTime >= this.time_lyric.time[currentIndex]) {
        this.currentIndex = 
      }
    },

  },
}
</script>

<style lang="less" scoped>
ul {
  list-style: none;
}
.active-lyric {
  color: #fff;
  font-size: 18px;
}

</style>