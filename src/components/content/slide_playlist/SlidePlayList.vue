<template>
  <div class="slide-playlist">
    <div class="nav-bar">
      <div class="left">
        <h3>{{nav_title}}</h3>
      </div>

      <div class="center">
        <slot name="nav-center"></slot>
      </div>

      <div class="right">
        <div @click="more" class="nav-right">
          <div>{{button_text}}<span class="iconfont icon-arrow2"></span></div>
        </div>
      </div>
    </div>
    
    <div :class="'slide-play-list '+'SLIDE_PLAYLIST_SWIPER_INDEX_'+SLIDE_PLAYLIST_SWIPER_INDEX" >
      <div class="swiper-wrapper">
        <slide-play-list-item 
          v-for="(creative,index) in creatives"
          :key="index"
          slot="slot-slide-play-list"
        >
          <img :src="creative.uiElement.image.imageUrl" alt="">
          <span>{{creative.uiElement.mainTitle.title}}</span>
        </slide-play-list-item>
      </div>
    </div>

  </div>
</template>

<script>

import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css'

import SlidePlayListItem from 'components/content/slide_playlist/SlidePlayListItem'

export default {
  name: 'SlidePlayList',
  components: {
    SlidePlayListItem
  },
  data() {
    return {
      swiper: null
    }
  },
  props: {
    SLIDE_PLAYLIST_DATA: {
      type: Object,
      default() {
        return {}
      }
    },
    SLIDE_PLAYLIST_SWIPER_INDEX: {
      type: Number,
      default: 0
    }
  },
  computed: {
    nav_title() {
      return this.SLIDE_PLAYLIST_DATA.uiElement.subTitle.title
    },
    button_text(){
      return this.SLIDE_PLAYLIST_DATA.uiElement.button.text
    },
    creatives() {
      return this.SLIDE_PLAYLIST_DATA.creatives
    },
  },
  mounted() {
    this.$nextTick( () => {
      this.initSwiper() // 等待数据请求完成
      Object.freeze(this.SLIDE_PLAYLIST_DATA)  // 冻结对象
    })
  },
  methods: {
    /* banner 初始化模块 */
    initSwiper() {
      this.swiper = new Swiper(
        document.querySelector('.SLIDE_PLAYLIST_SWIPER_INDEX_' + this.SLIDE_PLAYLIST_SWIPER_INDEX), {
        slidesPerView: 3,
        freeMode: true,
        speed: 800,
        roundLengths: true,  // 长度取整
      })
    },
    more() {

    }
  }

}
</script>

<style lang="less" scoped>
.slide-playlist {
  height: 220px;
  // background-color: pink;

  border-bottom: 8px solid rgba(200, 200, 200, .2);

  border-radius: 12px;
}

.nav-bar {
  display: flex;
  width: 100%;
  height: 56px;
  align-content: center;
  // background-color: skyblue;
  text-align: center;
  line-height: 56px;
  .left,
  .right {
    display: flex;
    justify-content: center;
    align-items: center;
    // width: 80px; 
    height: 100%;
    padding: 0 6px;
    font-size: 14px!important;
  }
  .left {
    font-weight: 700;
  }
  .center {
    flex: 1;
    height: 100%;
  }
}

.nav-right {
  padding: 5px 12px;
  padding-right: 10px;
  border: 1px solid #ccc;
  border-radius: 12px;

  line-height: 1.1;
  font-size: 14px!important;
  .iconfont {
    font-size: 14px;
  }
}

</style>