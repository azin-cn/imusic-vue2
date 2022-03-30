<template>
  <div class="yun-prod">
    <slide-m-v 
      :SLIDE_MV_DATA="HOMEPAGE_BLOCK_YUNCUN_PRODUCED"
      :SLIDE_MV_SWIPER_INDEX="0"></slide-m-v>
  </div>
</template>

<script>

import { mapState } from 'vuex';

import SlideMV from 'components/content/slide_mv/SlideMV'

export default {
  name: 'YunProd',
  components: {
    SlideMV
  },

  computed: {
    ...mapState({
      HOMEPAGE_BLOCK_YUNCUN_PRODUCED:
        state => state.DISCOVER_DATA.HOMEPAGE_BLOCK_YUNCUN_PRODUCED
    })
  },
}
</script>

<style lang="less" scoped>

</style>