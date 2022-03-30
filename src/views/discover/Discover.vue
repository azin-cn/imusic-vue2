<template>
  <div class="discover" v-if="visiable">
    <main-scroll @pullingUp="pullingUp">

      <main-banner class="padding-px"></main-banner>
      <slide-ball class="padding-px"></slide-ball>
      <recom class="padding-px"></recom>
      <new-song-album class="padding-px"></new-song-album>
      <official-playlist class="padding-px"></official-playlist>
      
      <!-- 第二页 上拉加载 -->
      <yun-prod v-if="currentIndex >= 2" class="padding-px"></yun-prod>
      <look-live v-if="currentIndex >= 2" class="padding-px"></look-live>
      <latest-m-v v-if="currentIndex >= 2" class="padding-px"></latest-m-v>
      <div v-if="currentIndex >= 3" class="onBottom">到底啦~~</div>
      
    </main-scroll>
  </div>
</template>

<script>
import {debounce} from 'components/common/debounce/debounce'

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

/** slide_mv area */
import YunProd from './children/slide_mv/YunProd'
import LatestMV from './children/slide_mv/LatestMV'

import { mapActions } from 'vuex'

export default {
  name: 'Discover',
  components: {
    MainScroll,

    MainBanner,
    SlideBall,
    Recom,
    OfficialPlaylist,
    LookLive,

    NewSongAlbum,

    YunProd,
    LatestMV
  },
  data() {
    return {
      visiable: false,
      currentIndex: 1,
    }
  },
  async mounted() {
    await this.getSlideBall()
    await this.getLatestMV()
    await this.getDisCoverData()  // 等待请求完成
    this.visiable = true // 只有等待数据请求完成后才能进行渲染

    setTimeout(() => {
      // let discover = document.querySelector('.discover')
      // console.log(discover.clientTop);
      this.$bscroll.refresh()
    }, 1000);
  },
  methods: {
    ...mapActions(['getDisCoverData','getLatestMV','getSlideBall']),
    pullingUp: debounce(function pullingUp() {
      this.currentIndex++
      console.log(this.currentIndex);
    },1000)
  }
}
</script>

<style lang="less" scoped>
.padding-px {
  padding-left: 12px;
  padding-right: 12px;
}
.onBottom {
  margin-bottom: 12px;
  color: #ccc;
  font-size: 16px;
  text-align: center;
  transition: all .3s;
}
</style>