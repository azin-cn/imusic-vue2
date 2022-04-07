<template>
  <div class="music-item">
    <slot></slot>
    <span v-if="!isEmpty" class="ml-play-btn iconfont icon-stop-music"></span>
  </div>
</template>

<script>
export default {
  name: 'MusicItem',
  data() {
    return {

    }
  },
  props: {
    isEmpty: {
      type: Boolean,
      default: true
    }
  }

}
</script>

<style lang="less" scoped>
.music-item {
  display: flex;
  justify-content: space-between;
  height: 44px;
  line-height: 44px;
  font-size: 16px;
  .ml-play-btn {
    font-size: 20px;
  }
}
</style>