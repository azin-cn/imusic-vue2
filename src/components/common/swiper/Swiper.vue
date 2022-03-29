<template>
  <div :class="{swiper:true}" :ref="swiperRef">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
    <!-- 如果需要分页器 -->
    <div v-if="pagination" class="swiper-pagination"></div>
  </div>
</template>

<script>

import SwiperA from 'swiper'
import 'swiper/dist/css/swiper.min.css'

export default {
  name: 'Swiper',
  data() {
    return {
      swiper: null
    }
  },
  props: {
    swiperRef: {
      type: String,
      default() {
        return 'swiper'
      }
    },
    pagination: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    this.initSwiper()
  },
  methods: {
    // 必须要在数据之后才能初始化。
    initSwiper() {
      this.swiper = new SwiperA(
        this.$refs['swiperRef'], {
        initialSlide: 0, // 第几个开始
        direction: 'horizontal', // 方向 水平垂直
        speed: 600, // 速度
        grabCursor: true, // 鼠标变小手
        roundLengths : true,  // 长度取整
        loop: true, // 无线循环
        
        effect: 'coverflow',
        autoplay: {
          delay: 1000,//1秒切换一次
        },
        pagination: { // 分页器
          el: '.swiper-pagination',
          bulletActiveClass: 'bullet-active',
          bulletActiveClass: 'bullet-active',
        },
        on:{
          tap: function(e){  // 点击事件
          },
        },

      })
      console.log(this.swiper);
    }
  }
}
</script>

<style lang="less">
.swiper {
  width: 375px;
  height: 200px;
  color: black;
}
.bullet-default {
  opacity: 1;
  background: #ccc;
}
.bullet-active {
  opacity: 1;
  background: #ff8079;
}

</style>