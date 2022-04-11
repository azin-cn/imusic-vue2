<template>
  <div class="search-main">
    <div 
      @click="changeIndex($event)"
      class="title">
      <span 
        v-for="(title,index) in titles" 
        :key="title+'_'+index"
        :data-search-body-title-index="index"
      >
        {{title}}
      </span>
    </div>
  </div>
</template>

<script>

import {getProxyEventAttr} from 'utils/getProxyEventAttr'

import {reqSearchHotDetail} from 'api/search'

export default {
  name: 'SearchBody',
  data() {
    return {
      titles: ['热搜榜','话题榜','视频榜','博客榜'],
      currentIndex: 0,
      hotSearch: [],
      hotTopic: [],
      hotVideo: [],
      hotPodcast: [],
    }
  },
  async mounted() {
    await this.reqSearchHotDetail()

  },
  methods: {
    async reqSearchHotDetail() {
      let resp = await reqSearchHotDetail()
      if(resp.code !== 200 || !resp) {
        console.log("reqSearchHotDetail 获取失败！");
        return ;
      }
      this.hotSearch = resp.data
    },
    changeIndex(e) {
      let attr = 'data-search-body-title-index'
      let val = getProxyEventAttr(e,attr)
      console.log(val);
      this.currentIndex = val ? val : this.currentIndex
    }
  }

}
</script>

<style lang="less" scoped>
.title-active {
  color: black;
  text-shadow: 0 0 8px 4px rgba(131, 131, 131, .3);
}
.search-main {
  width: 100%;
}
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  span {
    padding: 12px;
  }
}
</style>