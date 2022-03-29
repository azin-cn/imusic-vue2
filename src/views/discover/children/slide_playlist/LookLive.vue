<template>
  <div class="look-live">
    <slide-play-list v-if="HOMEPAGE_BLOCK_VIDEO_PLAYLIST"
      :SLIDE_PLAYLIST_DATA="HOMEPAGE_BLOCK_VIDEO_PLAYLIST"
      :SLIDE_PLAYLIST_SWIPER_INDEX="2">
    </slide-play-list>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import SlidePlayList from 'components/content/slide_playlist/SlidePlayList'

export default {
  name: 'LookLive',
  components: {
    SlidePlayList,
  },

  computed: {
    ...mapState({
      HOMEPAGE_BLOCK_VIDEO_PLAYLIST: 
        state => state.DISCOVER_DATA.HOMEPAGE_BLOCK_VIDEO_PLAYLIST,
    }),
  },
}
</script>

<style lang="less" scoped>

</style>