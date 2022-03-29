<template>

<div class="slide-ball swiper-containe">
  <div class="swiper-wrapper">
    <div 
      class="ball-item swiper-slide" v-for="(item,index) in HOMEPAGE_SLIDE_BALL" 
      :key="index"
      @click="itemClick(index)"
    >
      <img class="radius50pct" :src="item.iconUrl" alt="">
      <span>{{item.name}}</span>
    </div>
  </div>
</div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css'
import { mapState } from 'vuex';


export default {
  name: 'SlideBall',
  components: {

  },
  data() {
    return {
      ball: [],
      swiper:null
    }
  },
  computed: {
    ...mapState({
      HOMEPAGE_SLIDE_BALL: state => state.DISCOVER_DATA.HOMEPAGE_SLIDE_BALL
    })
  },
  async mounted() {

    this.$nextTick( () => {
      this.initSwiper() // 等待数据请求完成
    })

  },
  methods: {
    /* banner 初始化模块 */
    initSwiper() {
      this.swiper = new Swiper(
        document.querySelector('.slide-ball'), {
        slidesPerView: 5,
        freeMode: true,
        speed: 800,
        roundLengths: true,  // 长度取整
      })
    },

    itemClick(index) {
      console.log(index)
    }
  }
}
</script>

<style lang="less" scoped>

.radius50pct {
  border-radius: 50%;
}


.slide-ball {
  width: 100%;
  padding-top: 12px;
  // 滑动
  // -webkit-overflow-scrolling: touch;
  // overflow: -moz-scrollbars-none; // FireFox
  // -ms-overflow-style: none; // IE
  // &::-webkit-scrollbar {
  //   display: none;
  // }
  // white-space: nowrap;
  // overflow-x:auto; /* 横向超出边界就scroll */

  // transition: all 1s cubic-bezier(.62,-0.14,.62,1.25);
}



.ball-item {
  display: inline-flex;
  width: 20%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 6px;
  font-size: 14px;
  
  img {
    width: 80%;
    height: 80%;
    margin-bottom: 8px;
    background-color: #F90D0D;
  }
}
</style>