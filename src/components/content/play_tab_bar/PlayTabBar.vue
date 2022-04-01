<template> <!--阻止事件捕获和阻止事件冒泡-->
  <div class="play-tab-bar" @click="to_player">
    <nav-bar class="nav-bar" rwidth="90px">
      <div class="left" slot="left">
        <div class="record-img">
          <img src="~assets/images/record.png" alt=""
            :class="{'playing-rotate': isPlaying}"
          >
        </div>
      </div>

      <div class="center" slot="center">
        <div 
          :class="{'playing-slide-words': isPlaying}"
        >
          暂未播放歌曲，快去选一首吧~
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

export default {
  name: 'PlayTabBar',
  data() {
    return {
      isPlaying: false
    }
  },
  components: {
    NavBar
  },
  methods: {
    to_player(){
      this.$router.push('/musicplayer')
    },
    play_stop() {
      console.log("--------");
    },
    show_music_list() {
      console.log("+++++++");
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
    // transition: all 1s;
  }
}
.playing-rotate {
  animation: rotate-record 1.6s linear infinite;
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
</style>