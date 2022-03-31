<template>
  <div class="play-tab-bar">
    <nav-bar class="nav-bar" rwidth="100px">
      <div class="left" slot="left">
        <div class="record-img">
          <img src="~assets/images/record.png" alt=""
            :class="{'playing-rotate': isPlaying}"
          >
        </div>
      </div>

      <div class="center" slot="center">
        暂未播放歌曲，快去选一首吧~
      </div>
        
      <div class="right" slot="right">
        <span 
          :class="{
            'iconfont': true, 
            'icon-play-music': isPlaying,
            'icon-stop-music': !isPlaying }"
        ></span>
        <span class="iconfont icon-yinleliebiao"></span>
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
      isPlaying: true
    }
  },
  components: {
    NavBar
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
  img {
    width: 54px;
    border-radius: 50%;
    box-shadow: 0 0 6px 3px #ccc;
    // transition: all 1s;
  }
}
.playing-rotate {
  animation: rotateRecord 1.6s linear infinite;
}
@keyframes rotateRecord {
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