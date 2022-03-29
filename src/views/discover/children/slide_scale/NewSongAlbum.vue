<template>
  <div class="new-song-album">
    <slide-scale 
      :SLIDE_SCALE_SWIPER_INDEX = "0"
      :SLIDE_SCALE_DATA="HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG">
    </slide-scale>
  </div>
</template>

<script>

import { mapState } from 'vuex'

import SlideScale from 'components/content/slide_scale/SlideScale'

export default {
  name: 'NewSongAlbum',
  components: {
    SlideScale
  },
  data() {
    return {
      nav_title: ''
    }
  },
  computed: {
    ...mapState({
      HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG: 
        state => state.DISCOVER_DATA.HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG
    }),

  },
}
</script>


<style lang="less" scoped>



</style>