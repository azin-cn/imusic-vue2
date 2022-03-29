<template>
  <div class="recom">
    <slide-play-list v-if="HOMEPAGE_BLOCK_PLAYLIST_RCMD"
      :SLIDE_PLAYLIST_DATA="HOMEPAGE_BLOCK_PLAYLIST_RCMD"
      :SLIDE_PLAYLIST_SWIPER_INDEX="0">
    </slide-play-list>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import SlidePlayList from 'components/content/slide_playlist/SlidePlayList'

export default {
  name: 'Recom',
  components: {
    SlidePlayList,
  },

  computed: {
    ...mapState({
      HOMEPAGE_BLOCK_PLAYLIST_RCMD: 
        state => state.DISCOVER_DATA.HOMEPAGE_BLOCK_PLAYLIST_RCMD,
    }),
  },
}
</script>

<style lang="less" scoped>

</style>