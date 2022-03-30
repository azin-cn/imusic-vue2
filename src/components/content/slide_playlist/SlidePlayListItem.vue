<template>
  <div class="slide-play-list-item swiper-slide">
    <!-- <img src="" alt="">
    <span></span> -->
    <slot></slot>
  </div>
</template>


<script>
export default {
  name: 'SlidePlayListItem',

}
</script>

<style lang="less" scoped>
.slide-play-list-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img{
    width: 105px;
    height: 105px;
    border-radius: 16px;
    box-shadow: 0 1px 4px 2px rgba(204, 186, 186, 0.6);
  }
  span,div{
    width: 105px;
    margin-top: 6px;
    padding: 0 2px;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.4;
    

    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>