<template>
  <div id="app">
    <nav-bar></nav-bar>
    <keep-alive exclude="{}">
      <router-view/>
    </keep-alive>
    <play-tab-bar></play-tab-bar>
  </div>
</template>

<script>

import NavBar from "components/content/main_nav/MainNav";
import PlayTabBar from 'components/content/play_tab_bar/PlayTabBar'

export default {
  name: 'App',
  components: {
    NavBar,
    PlayTabBar
  }
}
</script>

<style lang="less">
@import url('https://at.alicdn.com/t/font_3280963_72b2l7e1buu.css');
</style>
