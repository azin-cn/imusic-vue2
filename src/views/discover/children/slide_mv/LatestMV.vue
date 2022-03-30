<template>
  <div v-if="HOMEPAGE_BLOCK_LATEST_MV" class="yun-prod">
    <slide-m-v 
      :SLIDE_MV_DATA="HOMEPAGE_BLOCK_LATEST_MV"
      :SLIDE_MV_SWIPER_INDEX="1"></slide-m-v>
  </div>
</template>

<script>

import { mapState } from 'vuex';

import SlideMV from 'components/content/slide_mv/SlideMV'

export default {
  name: 'LatestMV',
  components: {
    SlideMV
  },
  computed: {
    ...mapState({
      HOMEPAGE_BLOCK_LATEST_MV:
        state => state.DISCOVER_DATA.HOMEPAGE_BLOCK_LATEST_MV
    })
  }
}
</script>

<style lang="less" scoped>

</style>