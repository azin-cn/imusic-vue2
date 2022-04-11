<template>
  <div class="navbar">
    <div class="left"  :style="lstyle">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right" :style="rstyle">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    lwidth: {
      type: String,
      default() {
        return '60px';
      },
    },
    rwidth: {
      type: String,
      default() {
        return "60px";
      },
    },
  },
  computed: {
    lstyle() {
      return "width: " + this.lwidth + ";";
    },
    rstyle() {
      return "width: " + this.rwidth + ";";
    },
  },
};
</script>


<style scoped>
.navbar {
  display: flex;
  width: 100%;
  height: 44px;
  line-height: 44px;
  text-align: center;
  align-items: center;
}
.left,
.right {
  height: 100%;
  /* background-color: #ff8097; */
}
.center {
  flex: 1;
}
</style>