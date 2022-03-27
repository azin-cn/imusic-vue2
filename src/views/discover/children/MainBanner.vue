<template>
  <div class="main-banner">
    <div class="swiper-wrapper">
      <div class="swiper-slide">Slide 1</div>
      <div class="swiper-slide">Slide 2</div>
      <div class="swiper-slide">Slide 3</div>
      <div class="swiper-slide">Slide 4</div>
      <div class="swiper-slide">Slide 5</div>
      <div class="swiper-slide">Slide 6</div>
      <div class="swiper-slide">Slide 7</div>
      <div class="swiper-slide">Slide 8</div>
      <div class="swiper-slide">Slide 9</div>
      <div class="swiper-slide">Slide 10</div>
    </div>
    <!-- Add Pagination -->
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>

import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css'

export default {
  name: 'MainBanner',
  components: {
  },
  data() {
    return {
      swiper: null
    }
  },
  mounted() {
    console.log(document.querySelector('.main-banner'));
    this.initSwiper()
  },
  methods: {
    initSwiper() {
      this.swiper = new Swiper(
        document.querySelector('.main-banner'), {
        // initialSlide: 0, // 第几个开始
        // direction: 'horizontal', // 方向 水平垂直

        slidesPerView: 2, // 能够看见几个
        spaceBetween: 12, // 每个Item之间的缝隙
        speed: 600, // 速度
        grabCursor: true, // 鼠标变小手
        roundLengths: true,  // 长度取整
        loop: true, // 无线循环
        
        autoplay: {
          delay: 1000,//1秒切换一次
        },
        pagination: { // 分页器
          el: '.swiper-pagination',
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

<style lang="less" scoped>
.main-banner {
  width: 100%;
  height: 200px;
}
</style>