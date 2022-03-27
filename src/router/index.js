import Vue from 'vue'
import VueRouter from 'vue-router'

const Mine = ()=> import('views/mine/Mine')
const Discover = ()=> import('views/discover/Discover')
const Village = ()=> import('views/village/Village')
const Video = ()=> import('views/video/Video')

Vue.use(VueRouter)

const routes = [
  {path: '/' , redirect: '/discover'},
  {path: '/discover', component: Discover},

  // 除了发现页和视频页之外，另外两个页面需要做到判断路由
  {path: '/mine', component: Mine,},
  {path: '/village', component: Village},
  {path: '/video', component: Video}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
