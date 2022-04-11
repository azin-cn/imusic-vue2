<template>
  <div class="toast" v-if="display" :style="style">
    <div class="msg">{{ message }}</div>
  </div>
</template>

<script>

export default {
  name: 'Toast',
  data() {
    return{
      display: false,
      message: 'Hello~'
    }
  },
  props: {
    width: {
      type: String,
      defalt() {return '180px'}
    },
    hegiht: {
      type: String,
      default() {return '70px'}
    },
    unit() {
      let set = new Set('px','vw','vh','rem')
      return set
    }
  },
  computed: {
    style() {
      if(this.check(this.width) && this.check(this.hegiht)) {
        return ''.concat(
          'width:',this.width,';',
          'hegiht:',this.hegiht,';'
        )
      }
      return ''
    }
  },
  methods: {
    show(msg, delay=3000) {
      this.message = msg || 'Hello~'
      this.display = true
      let context = this
      let timer = setTimeout(() => {
        context.display = false
        clearTimeout(timer)
      }, delay)
    },
    check(str) {
      str = String(str) // 增强措施
      return str.includes('px') 
          || str.includes('vw')
          || str.includes('vh')
          || str.includes('rem')
    }
  }

}
</script>

<style lang="less" scoped>

.toast {
  display: flex;
  z-index: 99;
  position: fixed;
  top: 40%;
  left: 50%;
  width: 180px;
  height: 70px;

  border-radius: 12px;
  transition: all .6s linear;
  transform: translate(-50%,-50%);

  color: #fff;
  background-color: rgba(0, 0, 0, .3);
}
.msg {
  margin: auto;
  font-size: 18px;
}
</style>