<template>
  <div id="app">
    <nav-bar></nav-bar>
    <keep-alive exclude="{}">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>

import NavBar from "components/content/main_nav/MainNav";

export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>

<style lang="less">
@import url('https://at.alicdn.com/t/font_3280963_buadsssyrh.css');
</style>
