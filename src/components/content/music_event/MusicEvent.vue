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

    <div class="news-info" 
      v-for="(title,index) in titles" 
      :key="index"
      @click="newsClick(title)"
    >
      <div class="news-info-head">
        <div class="news-info-title">
          {{title}} <span :class="{'today': index===0,'after-tomorrow': index===1}">{{tags[index]}}</span>
        </div>
        <div class="news-info-text">
          {{creatives[index].resources[0].uiElement.mainTitle.title}}
        </div>
      </div>
      <div class="news-info-img">
        <img :src="creatives[index].resources[0].uiElement.image.imageUrl" alt="">
      </div>
    </div>
  </div>

</template>
<script>
export default {
  name: 'MusicEvent',
  data() {
    return {
      titles: ['今天','后天'],
      tags: ['云村热点','预告']
    }
  },
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
    },
    creatives() {
      return this.MUSIC_EVENT_DATA.creatives
    },
  },
  methods: {
    more() {
    },
    newsClick(title) {
      console.log(title);
    }
  }
}
</script>

<style lang="less" scoped>
.music-event {
  padding-bottom: 2px;
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


.news-info {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
}
.news-info-head{
  flex: 5;
  font-size: 16px;
  line-height: 1.3;
  .today,
  .after-tomorrow {
    padding: 1px 2px;
    font-size: 16px;
    color: rgb(231, 198, 154);
    background-color: #FFFDF6;
  }
  .after-tomorrow {
    color: rgba(126, 121, 121, 0.9);
    background-color: #F0F0F0;
  }
  .news-info-text {
    overflow: hidden;
    width: 270px;
    margin-top: 6px;
    font-size: 18px;
    font-weight: 600;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.news-info-img {
  flex: 1;
  img {
    width: 100%;
    border-radius: 12px;
  }
}
</style>