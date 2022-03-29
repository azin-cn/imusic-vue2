<template>
  <div v-if="SLIDE_SCALE_DATA" class="slide-scale">
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
    <div :class="'SLIDE_SCALE_SWIPER_INDEX_'+ SLIDE_SCALE_SWIPER_INDEX">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(creative,index) in creatives" :key="index">
          <div class="swiper-slide-item" 
            v-for="(resource,num) in creative.resources" :key="num"
            @click="resourceClick(resource.resourceId)"
          > <!--每一项的每一行-->
            
            <img :src="resource.uiElement.image.imageUrl" alt="">
            
            <div class="line-title">
              <div class="main_title">{{resource.uiElement.mainTitle.title}}</div>
              <div class="sub_title">{{resource.uiElement.subTitle.title}}</div>
            </div>

            <span class="play-button iconfont icon-pcduanbizhixiazaicishutubiao-copy"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css'

export default {
  name: 'SlideScale',
  data() {
    return {
      swiper: null,
    }
  },
  props: {
    nav_title: {
      type: String,
      default() {
        return '新歌速递'
      }
    },
    button_text: {
      type: String,
      default() {
        return '查看更多'
      }
    },
    SLIDE_SCALE_DATA: {
      type: Object,
      default() {
        return {}
      }
    },
    SLIDE_SCALE_SWIPER_INDEX: {
      type: Number,
      default: 0
    }
  },
  computed: {
    creatives() {
      return this.SLIDE_SCALE_DATA.creatives
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initSwiper()  //最后才是初始化模块，先要有数据
    })
  },
  methods: {
    /* 初始化模块 */
    initSwiper() {
      this.swiper = new Swiper(
        document.querySelector('.SLIDE_SCALE_SWIPER_INDEX_'+this.SLIDE_SCALE_SWIPER_INDEX), {
        slidesPerView: 1.4,
        spaceBetween: -12,
        centeredSlides: true,
        loop: true,
      })
    },
    more() {},
    resourceClick(resourceId) {
      console.log(resourceId);
    }
  },
}
</script>

<style lang="less" scoped>
.slide-scale {
  height: 290px;
  border-bottom: 10px solid rgba(210, 210, 210, .2);
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

.swiper-slide {
  margin-top: 12px;
  padding: 2px 8px;
  border-radius: 18px;
  transition: all .3s;
}
.swiper-slide-active {
  transform: scale(1.06);
  z-index: 9;
  background-color: #fff!important;
  box-shadow: 0 0 12px 2px #ccc;
}
.swiper-slide-item {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4px auto;
  img {
    width: 56px;
    border-radius: 12px;
  }
  .line-title{
    flex: 5;
  }
  .play-button{
    flex: 1;
    font-size: 20px;
    color: #E53008!important;
    text-align: center;
  }
}
.line-title{
  overflow: hidden;
  padding-left: 6px;


  .main_title{
    overflow: hidden;
    font-size: 14px;
    font-weight: 600;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .sub_title{
    overflow: hidden;
    color: #ccc;
    font-size: 12px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>