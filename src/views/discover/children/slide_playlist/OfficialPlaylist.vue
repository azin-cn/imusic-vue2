<template>
  <div class="official-playlist">
    <slide-play-list v-if="HOMEPAGE_BLOCK_OFFICIAL_PLAYLIST"
      :SLIDE_PLAYLIST_DATA="HOMEPAGE_BLOCK_OFFICIAL_PLAYLIST"
      :SLIDE_PLAYLIST_SWIPER_INDEX="1">
    </slide-play-list>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import SlidePlayList from 'components/content/slide_playlist/SlidePlayList'

export default {
  name: 'OfficialPlaylist',
  components: {
    SlidePlayList,
  },

  computed: {
    ...mapState({
      HOMEPAGE_BLOCK_OFFICIAL_PLAYLIST: 
        state => state.DISCOVER_DATA.HOMEPAGE_BLOCK_OFFICIAL_PLAYLIST,
    }),
  },
}
</script>

<style lang="less" scoped>

</style>