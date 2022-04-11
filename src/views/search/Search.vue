<template>
  <div class="search">
    <search-nav class="w"></search-nav>
    <search-main class="w"></search-main>
  </div>
</template>


<script>

import SearchNav from './children/SearchNav'
import SearchMain from './children/SearchMain'


export default {
  name: 'Search',
  components: {
    SearchNav,
    SearchMain
  },
}
</script>


<style lang="less" scoped>
.w {
  padding: 0 12px;
}

</style>