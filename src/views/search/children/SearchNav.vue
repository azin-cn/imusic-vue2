<template>
  <div class="search-nav">
    <nav-bar  
      lwidth="40px" 
      rwidth="40px"
      class="search-nav-bar"
    >
    <span slot="left" 
      @click="back"
      class="iconfont icon-arrow-left" 
    />
    <div slot="center" class="search-nav-center">
      <input type="text" 
        @focus="displayMatchPanel = true"
        @blur="displayMatchPanel = false"
        v-model="keywords" :placeholder="placeholder">
      <span v-if="keywords" 
        @click.stop="clear"
        class="iconfont icon-chahao">
      </span>
    </div>

    <div slot="right" @click="toSearchDetail" class="iconfont icon-sousuo1"></div>
    </nav-bar>
    <!-- 通过判断长度进行判断是否显示 -->
    <div v-if="history.length"
      @click="htClick($event)"
      class="history">
      <h3>历史</h3>
      <span 
        v-for="(item,index) in showHistory" 
        :key="item+'_'+index"
        :data-history-item-val="item"
      >{{item}}</span>
    </div>

    <transition name="slide-up-down-search-recom">
      <div v-if="keywords && displayMatchPanel" 
        class="recom"
        @click="recomClick($event)"
      >
        <span 
          v-for="(match, index) in showMatch" 
          :key="'match-keywords'+'_'+index"
          class="recom-item iconfont icon-sousuo"
          :data-recom-match-keyword="match.keyword"
        >
          {{match.keyword}}
        </span>  
    </div>
    </transition>

  </div>
</template>


<script>

import {throttle} from 'components/common/debounce/debounce'
import {
  reqSearchDefault,
  reqSearchSuggest
} from 'api/search'

import NavBar from 'components/common/nav_bar/NavBar'

export default {
  name: 'SearchNav',
  components: {
    NavBar,
  },
  data() {
    return {
      keywords: '',
      placeholder: '搜索吧~',
      history: [],
      allMatch: [],
      displayMatchPanel: true,
    }
  },
  computed: {
    showHistory() {
      if(this.history && this.history.length > 4) { // 判断是否存在
        let start = this.history.length - 4
        this.history = this.history.slice(start)
      }
      return this.history
    },
    showMatch() {
      if(this.allMatch && this.allMatch.length > 6) {
        let start = this.allMatch.length - 6
        this.allMatch = this.allMatch.slice(start)
      }
      return this.allMatch
    }
  },
  watch: {
    'keywords': {
      // immediate: true, // 不需要立即监听
      deep: true,
      handler() {
        this.reqSearchSuggest()
      }
    }
  },
  mounted() {
    this.reqSearchDefault()
    if( sessionStorage.getItem('history')) {
      let history = sessionStorage.getItem('history').split(",")
      history.forEach(item => {
        this.history.push(item)
      });
    }
  },
  methods: {
    back() {
      this.$router.back()
    },
    clear() {
      this.keywords = ''
    },
    async reqSearchDefault() {
      let resp = await reqSearchDefault();
      if(resp && resp.data) {
        this.placeholder = resp.data.showKeyword
      }
    },
    reqSearchSuggest: throttle( async function dsearch() {
      let resp = await reqSearchSuggest(this.keywords)
      if(resp.code !== 200 || !resp || !this.keywords) {
        this.allMatch = []
        return ;
      }
      this.allMatch = resp.result.allMatch
    },800),
    htClick(e) {
      let target = e.target
      while(target) { // 如果target不为空或者是undefined
        let attr = 'data-history-item-val'
        if(target.hasAttribute && target.hasAttribute(attr)) {
          let keywords = target.getAttribute(attr)
          this.keywords = keywords
          this.toSearchDetail()
          return ;
        }
        target = target.parentNode
      }
    },
    recomClick(e) {
      let target = e.target
      let attr = 'data-recom-match-keyword'
      while(target) {
        if(target.hasAttribute && target.hasAttribute(attr)) {
          let keywords = target.getAttribute(attr)
          this.keywords = keywords
          this.toSearchDetail()
          return ;
        }
        target = target.parentNode
      }
    },
    toSearchDetail() {
      this.displayMatchPanel = false
      if(this.keywords) {// 如果不为空的时候才进行加入
        this.history.push(this.keywords)
        sessionStorage.setItem('history',this.history)
      }
    }
  }
}
</script>

<style lang="less" scoped>
input {
  outline: none;
  border: none;
}
/* --清除谷歌浏览器下的 search 叉号  */
input::-webkit-search-cancel-button {
  display: none;
}
/* --清除IE下的 search 叉号  */
input[type="search"]::-ms-clear {
  display: none;
}
//设置placeholder的颜色
input::-webkit-input-placeholder { 
  color: rgb(187, 179, 179);
}

.search-nav {
  position: relative;
  width: 100%;
}

.recom {
  display: flex;
  flex-direction: column;
  z-index: 9;
  position: absolute;
  top: 58px;right: 12px;left: 12px;
  padding: 8px 0;

  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 0 8px 4px rgb(131 131 131 / 30%);
  transition: all .6s cubic-bezier(.46,.23,0,1.45);

  .recom-item {
    overflow: hidden;
    height: 32.5px;
    padding: 6px 12px;
    font-size: 18px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .recom-item::before {
    margin-right: 4px;
  }
}

.search-nav-bar {
  height: 54px;
  line-height: 54px;
  .icon-arrow-left,
  .icon-sousuo1 {
    font-size: 20px;
  }
  .icon-sousuo1 {
    // color: #ff7098;
    color: #F90D0D;
  }
  .search-nav-center {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 44px;
    padding: 0 6px;
    margin-left: 6px;

    border-top: 2px solid transparent;
    border-bottom: 2px solid rgba(100, 100, 100, .6);

    input{
      flex: 80%;
      height: 100%;
      font-size: 17px;
    }

    .icon-chahao {
      display: block;
      font-size: 12px;
      transition: all .6s linear;
    }
  }
}
.history {
  overflow: hidden;
  display: inline-flex;
  width: 352px;
  height: 38px;
  align-items: center;
  padding: 0 12px;


  h3 {
    margin-right: 4px;
    padding: 4px 12px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 12px;
    white-space: nowrap;
  }
  span {
    overflow: hidden;
    text-overflow: ".";
    white-space: nowrap;
    width: 62px;
    margin: 0 2px;
    padding: 4px 8px;
    background-color: rgba(131, 131, 131, .3);
    border-radius: 12px;
  }
}
.slide-up-down-search-recom-enter, 
.slide-up-down-search-recom-leave-to{
  opacity: 0;
  transform: translateY(80px);
}
.slide-up-down-search-recom-leave,
.slide-up-down-search-recom-enter-to {
  opacity: 1;
}
</style>