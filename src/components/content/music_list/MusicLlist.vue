<template>
  <div class="music-list" 
    @click.self="mask_click($event)"
  >
    <div class="music-list-area w" ml-list="ml-list">
      <!-- 头部提示区域 -->
      <div class="music-list-head">
        <span @click="func_loop" 
          :class="{'iconfont':true,
          'icon-liebiaoxunhuan':!LOOP,
          'icon-danquxunhuan': LOOP}">
        </span>
        <span v-if="!LOOP" class="title">列表循环({{MLlength}}首)</span>
        <span v-if="LOOP" class="title">单曲循环({{MLlength}}首)</span>
      </div>

      <!-- :class="{'ml-list-item-active':currentIndex===index}" -->
      <div class="music-list-body">
        <div class="slide-ml-list" @click="toPlayer($event)">
          <music-item :isEmpty="isEmpty"
            v-for="(music,index) in ML" 
            :key="'ml_'+music.id+music.title+index"
            :data-ml-music-id="music.id"
            :data-ml-music-title="music.title"
            :data-ml-music-img="music.img"
            :data-ml-music-index="index"
          >
            {{music.title}}
          </music-item>
          <span v-if="isEmpty">还未有歌曲哦~ | 在一瞬间~</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

import MusicItem from './MusicItem'

export default {
  name: 'MusicList',
  components: {
    MusicItem
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  computed: {
    ML(){
      let ml = this.$store.state.AUDIO.ML
      return  ml
    },
    LOOP() {
      let loop = this.$store.state.AUDIO.LOOP
      return loop || false
    },
    isEmpty() {
      return this.ML.length===0
    },
    MLlength() {
      return this.isEmpty ? 0 : this.ML.length
    },
    ml_list_item_active() {
      
    }
  },
  watch: {
    ML: {
      immediate: true,
      deep: true,
      handler() {}
    },
    LOOP:{
      immediate: true,
      deep: true,
      handler() {}
    }
  },
  methods: {
    mask_click(e) {   
      let target = e.target
      let blurClassName = 'music-list'
      let classList = target.classList
      if(classList.contains(blurClassName)) { 
        /**
         * 更新：需要通过具体的判断，如果使用的includes方法吗，
         * 如果出现了同样的类名，那么会出错。
         * 如果点击的是最顶级的遮罩层
         * - 那么隐藏列表，
         * 如果点击的不是顶层遮罩层，判断是否点击的是music-item
         * 如果是点击的music-item
         * - 那么取出索引的数据，将此时的音乐ID传入播放器进行播放
         * 如果点击的不是music-item
         * - 不做任何反应
         * 通过迭代寻找元素。
         */
        this.toBlur()
        return ;
      }
      // console.log(target);
    },
    func_loop() {
      let state = !this.$store.state.AUDIO.LOOP
      this.$set(
        this.$store.state.AUDIO,'LOOP',
        state
      )
    },
    toPlayer(e) {
      let target = e.target
      let music = {}
      let attr = ['data-ml-music-id','data-ml-music-title','data-ml-music-img','data-ml-music-index']
      while(target){ // 当不是空对象的时候
        if(target.classList.contains('music-list-area')) break;
        if(target.hasAttribute(attr[0])){
          music.id = target.getAttribute(attr[0])
          music.title = target.getAttribute(attr[1])
          music.img = target.getAttribute(attr[2])
          this.currentIndex = target.getAttribute(attr[3])
          music.music_list = true
          this.toBlur()
          this.$audio.play(music)
          break;
        }
        target = target.parentNode
      }
    },
    toBlur() {
      this.$emit('toBlur')
    }
  }
}
</script>

<style lang="less" scoped>
.w {
  padding: 0 24px;
}
.music-list {
  position: fixed;
  z-index: 99;
  width: 100vw;
  height: 100vh;
  top: 0;right: 0;bottom: 0;left: 0;
}
.music-list-area {
  position: absolute;
  bottom: 1%;
  left: 50%;
  transform: translateX(-50%);
  width: 94%;
  height: 408px;
  background-color: #fff;
  border-radius: 12px 12px 12px 12px;
}
.music-list-head {
  display: flex;
  height: 54px;
  line-height: 54px;

  .iconfont {
    color: #A4A4A4;
    width: 44px;
    font-size: 22px;
  }
  .title{
    font-weight: 700;
    font-size:18px;
  }
}
.music-list-body {
  height: 354px;
  overflow-y: scroll;
  // 隐藏滚动条
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
  &::-webkit-scrollbar {
    display: none;
  }
}
.ml-list-item-active {
  color: #E53008;
}
</style>