import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false;

import 'assets/css/base.css'

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)

import toast from 'components/common/toast';
Vue.use(toast) // 注册组件默认调用的是install方法

new Vue({
  router,
  store,
  render: h => h(App) // render函数更加的高效，不用经过模板编译的过程
}).$mount('#app')
