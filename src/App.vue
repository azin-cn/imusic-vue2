<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view/>
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

</style>
