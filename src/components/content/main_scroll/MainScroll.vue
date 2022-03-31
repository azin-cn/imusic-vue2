<template>
  <scroll @pullingUp="pullingUp" class="wrapper">
    <div class="content" slot="content">
      <!-- better-scroll默认会将wrapper和content元素对齐
          所以在使用的时候，如果出现了margin或者是padding
          需要进行设置
          1. 设置边框为响应的margin或者是padding的值
          2. 设置一个子元素的高度就是margin的值，
              并且响应的margin是是一个相反的数字
       -->
      <div style="height: 58px; margin-top: -58px"></div>
      <slot></slot>
      <!-- <div v-if="isloading" class="loading"></div> -->
    </div>
  </scroll>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'

export default {
  name: 'MainScroll',
  components: {
    Scroll
  },
  methods: {
    pullingUp() {
      this.$emit('pullingUp')
    }
  }
}
</script>

<style lang="less" scoped>

.wrapper {
  overflow:hidden!important;
  width: 100%;
  height: 100vh!important;
  margin: 0 auto;
  padding-top: 58px;
  touch-action: none;
}
// .content {
//   border-top: 58px solid transparent;
// }
</style>