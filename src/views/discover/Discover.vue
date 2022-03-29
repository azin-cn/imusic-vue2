<template>
  <div class="discover" v-if="visiable">
    <main-scroll>
      <main-banner class="padding-px"></main-banner>
      <slide-ball class="padding-px"></slide-ball>
      <recom class="padding-px"></recom>
      <official-playlist class="padding-px"></official-playlist>
      <look-live class="padding-px"></look-live>
    </main-scroll>
  </div>
</template>

<script>
import MainScroll from 'components/content/main_scroll/MainScroll'

import MainBanner from './children/MainBanner'
import SlideBall from './children/SlideBall'
import Recom from './children/Recom'
import OfficialPlaylist from './children/OfficialPlaylist'
import LookLive from './children/LookLive'

import { mapActions } from 'vuex'

export default {
  name: 'Discover',
  components: {
    MainScroll,

    MainBanner,
    SlideBall,
    Recom,
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
      let discover = document.querySelector('.discover')
      console.log(discover.clientTop);
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