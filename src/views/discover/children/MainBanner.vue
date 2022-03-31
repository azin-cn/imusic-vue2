<template>
  <div class="swiper-container main-banner">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item,index) in HOMEPAGE_BANNER" :key="index">
        <img class="radius14px" :src="item.pic" alt="">
      </div>
    </div>
    <!-- Add Pagination -->
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>

import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css'
import { mapState } from 'vuex';

// import { reqMainBanner } from 'api/discover'
 
export default {
  name: 'MainBanner',
  components: {
  },
  data() {
    return {
      swiper: null,
      // banners: null
      visiable: false
    }
  },
  computed: {
    ...mapState({
      HOMEPAGE_BANNER: state => state.DISCOVER_DATA.HOMEPAGE_BANNER
    })
  },
  mounted() {
    // console.log(this.HOMEPAGE_BANNER);
    // await this.reqMainBanner()

    this.$nextTick(() => {
      this.initSwiper()  //最后才是初始化模块，先要有数据
      Object.freeze(this.HOMEPAGE_BANNER)  // 冻结对象
    })
  },
  methods: {
    /* banner 初始化模块 */
    initSwiper() {
      this.swiper = new Swiper(
        document.querySelector('.main-banner'), {
        // initialSlide: 0, // 第几个开始
        // direction: 'horizontal', // 方向 水平垂直
        effect: 'slide',//'fade','cube'
        // slidesPerView: 1.3, // 能够看见几个
        spaceBetween: 8, // 每个Item之间的缝隙
        centeredSlides: true, // 自动居中
        speed: 800, // 速度
        // grabCursor: true, // 鼠标变小手
        roundLengths: true,  // 长度取整
        loop: true, // 无线循环
        
        autoplay: {
          delay: 2000,//1秒切换一次
          //如果设置为false，用户操作swiper之后自动切换不会停止
          disableOnInteraction: false,
        },
        pagination: { // 分页器
          el: '.swiper-pagination',
        },
        on:{
          tap: function(e){  // 点击事件

          },
          autoplayStart(swiper) {
            // console.log("%%%%%");
          },
          touchEnd() {
            // this.swiper.autoplay.start()
          },
        },

      })
    },

    // 已更新，数据由vuex管理
    // async reqMainBanner() {
    //   let res = await reqMainBanner(1)
    //   if(res.code == 200) this.banners = res.banners
    //   else console.log(res);
    //   console.log(res);
    // }

  }

}
</script>

<style lang="less" scoped>
.radius14px{
  width: 100%;
  text-align: center;
  border-radius: 14px;
}
.main-banner {
  width: 100%;
  height: 146px;
}
.swiper-wrapper {
  width: 100%;
  height: 100%;

  .swiper-slide {
    height: 100%;
    // overflow: hidden;// 弹性布局的盒子使用overflow
    box-shadow: 0 1px 1px #ccc;
    img {
      height: 100%;
    }
  }
}
// .swiper-slide-active {
//   transform: scale(1.1); 
// }
</style>