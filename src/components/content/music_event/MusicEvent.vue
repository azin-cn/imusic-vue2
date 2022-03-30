<template>
  <div class="music-event">
    <div class="nav-bar">
      <div class="left">
        <h3>{{nav_title}}</h3>
      </div>

      <div class="center">
        <slot name="nav-center"></slot>
      </div>

      <div class="right">
        <div @click="more" class="nav-right">
          <div>{{button_text}}<span class="iconfont icon-arrow2"></span></div>
        </div>
      </div>
    </div>

    <div class="about">
      <div class="about-title">
        {{about_title}}
      </div>
      <div class="about-more">
        {{about_more_text}}<span class="arrow-right  iconfont icon-arrow2"></span>
      </div>
    </div>

  </div>

</template>
<script>
export default {
  name: 'MusicEvent',
  props: {
    MUSIC_EVENT_DATA: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    nav_title() {
      return this.MUSIC_EVENT_DATA.uiElement.subTitle.title
    },
    button_text() {
      return this.MUSIC_EVENT_DATA.uiElement.button.text
    }
  }
}
</script>

<style lang="less" scoped>
.music-event {
  height: 260px;
  border-bottom: 8px solid rgba(200, 200, 200, .2);
}
.nav-bar {
  display: flex;
  width: 100%;
  height: 56px;
  align-content: center;
  // background-color: skyblue;
  text-align: center;
  line-height: 56px;
  .left,
  .right {
    display: flex;
    justify-content: center;
    align-items: center;
    // width: 80px; 
    height: 100%;
    padding: 0 6px;
    font-size: 14px!important;
  }
  .left {
    font-weight: 700;
  }
  .center {
    flex: 1;
    height: 100%;
  }
}
.nav-right {
  padding: 5px 12px;
  padding-right: 10px;
  border: 1px solid #ccc;
  border-radius: 12px;

  line-height: 1.1;
  font-size: 14px!important;
  .iconfont {
    font-size: 14px;
  }
}

.about {
  display: flex;
  justify-content: space-between;
  height: 35px;
  padding: 0 12px;
  line-height: 35px;
}
.about-more {
  font-size: 14px;
  line-height: 1.5;
  .arrow-right {
    color: #ccc;
    font-size: 14px;
  }
}
</style>