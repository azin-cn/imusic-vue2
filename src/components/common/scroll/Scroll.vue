<template>
  <div ref="wrapper" class="wrapper">
    <slot name="content"></slot>
  </div>
</template>

<script>
import {debounce} from './debounce'

// BScroll 配置区域
import BScroll from "@better-scroll/core";
import Pullup from "@better-scroll/pull-up";
import PullDown from '@better-scroll/pull-down'

BScroll.use(Pullup).use(PullDown);


export default {
  name: "Scroll",
  data() {
    return {
      bscroll: {},
    };
  },
  mounted() {
    this.initScroll();
    this.bscroll.refresh();
  },
  methods: {
    initScroll() {
      this.bscroll = new BScroll(this.$refs.wrapper, {
        click: true,
        tap: "tap",
        bounce: true,
        momentum: true,
        momentumLimitTime: 400,
        eventPassthrough: "horizontal",
        probeType: 3, // 开启发送事件

        // 插件
        pullUpLoad: true,
        pullDownRefresh: true
      });
      // 在监听了下拉加载更多以后,监听是否结束了滑动,或者是用户的手指是否离开了页面(正确操作),等待完成了以后再执行释放finishPullUp的操作. 先进性刷新操作,等待手指离开后进行释放上拉
      this.bscroll.on("pullingUp", () => {
        this.bscroll.refresh();
        this.bscroll.on("touchEnd", () => {
          console.log("++++++++++++++touchEnd++++++++++++++");
          this.bscroll.finishPullUp();
        });
      });

      this.bscroll.on('pullingDown',() => { // 下拉
        location.reload()
        this.bscroll.finishPullDown()
      })
    },
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  overflow: hidden;
  touch-action: manipulation;

  // height: calc(100vh - 75px);
}
</style>