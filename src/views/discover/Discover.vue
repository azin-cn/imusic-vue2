<template>
  <div class="discover" v-if="visiable">
    <main-scroll>

      <main-banner class="padding-px"></main-banner>
      <slide-ball class="padding-px"></slide-ball>
      <recom class="padding-px"></recom>
      <new-song-album class="padding-px"></new-song-album>

      <official-playlist class="padding-px"></official-playlist>
      <look-live class="padding-px"></look-live>
      
    </main-scroll>
  </div>
</template>

<script>
import MainScroll from 'components/content/main_scroll/MainScroll'

/** children area */
import MainBanner from './children/MainBanner'
import SlideBall from './children/SlideBall'

/* children slide_playlist area */
import Recom from './children/slide_playlist/Recom'
import OfficialPlaylist from './children/slide_playlist/OfficialPlaylist'
import LookLive from './children/slide_playlist/LookLive'

/** children slide_scale area */
import NewSongAlbum from './children/slide_scale/NewSongAlbum'


import { mapActions } from 'vuex'

export default {
  name: 'Discover',
  components: {
    MainScroll,

    MainBanner,
    SlideBall,
    Recom,
    NewSongAlbum,

    OfficialPlaylist,
    LookLive
  },
  data() {
    return {
      visiable: false
    }
  },
  async mounted() {
    await this.getDisCoverData()  // 等待请求完成
    this.visiable = true // 只有等待数据请求完成后才能进行渲染

    setTimeout(() => {
      // let discover = document.querySelector('.discover')
      // console.log(discover.clientTop);
      this.$bscroll.refresh()
    }, 1000);
  },
  methods: {
    ...mapActions(['getDisCoverData'])
  }
}
</script>

<style lang="less" scoped>
.padding-px {
  padding-left: 12px;
  padding-right: 12px;
}
</style>