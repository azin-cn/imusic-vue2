<template>
  <div :class="{'music-player-body':true,w:w}">

    <!-- 音乐cover -->
    <div class="music-img">
      <img :class="{'record-rod':true,'rotate-start': isplaying}" 
        src="~assets/images/rod-c.png" alt="">
      <img :class="{'cover':true,'rotate-cover':isplaying}" src="~assets/images/cover.webp"  alt="">
    </div>

    <!-- 音乐信息 -->
    <div class="music-info padding12px">
      <div class="info">
        <h2 class="music-name">一百万个可能</h2>
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
        <span class="gogo" ></span>
      </div>
      <div class="time">
        <span class="used">00:52</span>
        <span class="total">04:35</span>
      </div>
      <div class="handlers">
        <span v-for="(handler_icon,index) in handler_icons" :key="index"
          :class="'handler h_transition iconfont  ' + handler_icon"
          @click="func_handler(index)"
        ></span>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'MusicPlayerBody',
  data() {
    return {
      isplaying: false,
      more_titles: ['一起唱','音效','下载','评论','更多'],
      more_actions: 
        ['icon-sing','icon-yinxiao',
        'icon-xiazai','icon-xiaoxi1','icon-shudian'],
      handler_icons: ['icon-liebiaoxunhuan','icon-prev',
        'icon-stop-music','icon-next','icon-yinleliebiao1'],
    }
  },
  props: {
    w: {
      type: Boolean,
      default: true
    },
  },
  computed:{
    handler_objs (){
      return document.querySelectorAll('.handler')
    }
  },
  methods: {
    func_handler(index) {
      let obj = this.handler_objs[index]
      // 最后调用响应的函数即可，不需要再switch中写复杂的逻辑
      switch (index) {
        case 0:
          break;
        case 1:
          break;
        case 2:
          this.isplaying = !this.isplaying
          let className = 'handler h_transition iconfont ' // 注意空格
          if(this.isplaying) { // 通过判断是否播放了音乐对按钮进行控制
            className += 'icon-play-music'
          }else {
            className += 'icon-stop-music'
          }
          obj.className = className
          let timer = setTimeout(() => {
            
            clearTimeout(timer)
          },0)
          break
        case 3:
          break;
        case 4:
          break;
      }
    }
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
    transition: all 2s linear; // 失效，套一层和animation分开
  }
  .rotate-cover {
    // transform: rotate(180deg);
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
    width: 10px;
    height: 4px;
    background-color: #fff;
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
  .iconfont {
    color: #fff;
    font-size: 28px;
    transition: all 1s;
  }
  .iconfont:nth-child(3) {
    font-size: 48px;
  }
}
</style>