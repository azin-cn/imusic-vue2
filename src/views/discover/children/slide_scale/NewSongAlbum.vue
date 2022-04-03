<template>
  <div class="new-song-album">
    <slide-scale 
      :SLIDE_SCALE_SWIPER_INDEX = "0"
      :SLIDE_SCALE_DATA="HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG"
      @resourceClick="resourceClick">
    </slide-scale>
  </div>
</template>

<script>

import { mapActions, mapState } from 'vuex'

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
  methods: {
    resourceClick({id,title,img}) { // 事件会默认传入参数，调用时只是函数地址索引而已
      // console.log("%%%newsongalbum%%%",{id,title,img});
      this.$audio.play({id,title,img}) // 调用AUDIO对象进行播放
      this.$router.push('/musicplayer') // 页面跳转
    }
  }
}
</script>


<style lang="less" scoped>



</style>