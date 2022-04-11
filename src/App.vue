<template>
  <div id="app">
    <nav-bar v-show="nav_tab_display.nav"></nav-bar>
    <transition :name="transitionName">
      <keep-alive exclude="{}">
        <router-view/>
      </keep-alive>
    </transition>
    <play-tab-bar v-show="nav_tab_display.tab"></play-tab-bar>
    <m-audio></m-audio>
  </div>
</template>

<script>
import NavBar from "components/content/main_nav/MainNav";
import PlayTabBar from 'components/content/play_tab_bar/PlayTabBar'
import MAudio from 'components/content/audio/MAudio'
export default {
  name: 'App',
  data () {
    return {
      transitionName: 'v',
      audio: null
    }
  },
  components: {
    NavBar,
    PlayTabBar,
    MAudio
  },
  computed: {
    nav_tab_display() {
      //注意：不是第一个，而是第二个才是路由
      let path = this.$route.path.toLowerCase().split("/")[1]
      // console.log(/\/player.+/.test(path))
      let unableSet = new Set(['musicplayer','search'])
      console.log("to",path);
      return {
        nav: !unableSet.has(path),
        tab: !path.includes('musicplayer')
      }
    }
  },
  /**
   * TODO: 过渡 \ 动画 效果的设置
   * 除了可以在这里进行设置外，
   * 同时还可以在路由的元信息meta中进行设置特定的表示，
   * 然后translation的name绑定的标识和动画即可。
   * 即标识的名字和动画的名字必须要绑定，
   * 因为vue是通过transition的name属性和过渡或者是动画的开头进行匹配的
   */
  watch: {
    $route(to, from) {
      let tpath = to.path.toLowerCase()
      let fpath = from.path.toLowerCase()
      if ( // 对于单个组件的判断，如果只使用一个，那么只会单方向生效
        tpath.includes('/musicplayer')||
        fpath.includes('/musicplayer')
      ) {
        this.transitionName = "slide-up-down";
      }else {
        this.transitionName = 'v'
      }
      // console.log(this.transitionName);
    }
  }
}
</script>

<style lang="less">
@import url('https://at.alicdn.com/t/font_3280963_l0j0xgmhz3q.css');

*[class$='-leave-to']{
  display: none; // 防止抖动
}

.v-enter,.v-leave-to {
  opacity: 0;
  transform: scaleY(1.2)
}
.v-enter-active,.v-leave-active {
  transition: all .2s cubic-bezier(.46,.23,0,1.45);
}
.v-enter-to, .v-leave {
  opacity: 1;
  transform: scaleY(1);
}


// 动画都是对称的，将进入的动画写好了之后可以直接协商reverse
.slide-up-down-enter,.slide-up-down-leave-to {
  // slide-up slide-down
  opacity: 0;
  transform: translateY(100vh);
}
.slide-up-down-enter-active, .slide-up-down-leave-active {
  transition: all .5s cubic-bezier(.52,.01,0,1.13);
}
.slide-up-down-leave,.slide-up-down-enter-to {
  // slide-up slide-down
  opacity: 1;
  transform: translateY(0);
}
</style>
