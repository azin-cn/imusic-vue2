<template>
    <div class="slide-mv">
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

    <div :class="'swiper-mv  '+'SLIDE_MV_SWIPER_INDEX_' + SLIDE_MV_SWIPER_INDEX" >
      <div class="swiper-wrapper">
        <div class="swiper-slide slide-mv-item"
          v-for="(creative,index) in creatives"
          :key="index"
          @click="itemClick(creative.resources[0].resourceId)"
        >
          <img :src="creative.resources[0].uiElement.image.imageUrl" alt="">
          <span>{{creative.resources[0].uiElement.mainTitle.title}}</span>
        </div>
      </div>
    </div>

  </div>
</template>


<script>

import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css'

export default {
  name: 'SlideMV',
  data() {
    return{
      swiper: null
    }
  },
  props: {
    SLIDE_MV_DATA: {
      type: Object,
      default() {
        return {}
      }
    },
    SLIDE_MV_SWIPER_INDEX: {
      type: Number,
      default: 0
    }
  },
  computed: {
    nav_title() {
      return this.SLIDE_MV_DATA.uiElement.subTitle.title
    },
    button_text() {
      return this.SLIDE_MV_DATA.uiElement.button.text
    },
    creatives() {
      return this.SLIDE_MV_DATA.creatives
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initSwiper()  //最后才是初始化模块，先要有数据
    })
  },
  methods: {
    /* banner 初始化模块 */
    initSwiper() {
      this.swiper = new Swiper(
        document.querySelector('.SLIDE_MV_SWIPER_INDEX_'+this.SLIDE_MV_SWIPER_INDEX), {
        slidesPerView: 2,
        spaceBetween: 0,
        freeMode: true,
        roundLengths: true,  // 长度取整
      })
    },
    more() {},
    itemClick(resourceId) {
      console.log(resourceId);
    }
  }
}
</script>


<style lang="less" scoped>
.slide-mv {
  height: 220px;
  border-bottom: 8px solid rgba(210, 210, 210, .2);
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

.slide-mv-item {
  display: flex;  
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 160px;
    height: 105px;
    border-radius: 12px;
  }
  span {
    width: 160px;
    margin-top: 6px;
    padding: 0 2px;
    line-height: 1.4;
    font-weight: 600;
    font-size: 14px;

    // 两行省略显式点
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>