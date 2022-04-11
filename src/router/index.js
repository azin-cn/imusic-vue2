import Vue from 'vue'
import VueRouter from 'vue-router'

const Mine = ()=> import('views/mine/Mine')
const Discover = ()=> import('views/discover/Discover')
const Village = ()=> import('views/village/Village')
const Video = ()=> import('views/video/Video')
const Search = () => import('views/search/Search')

const MusicPlayer = () => import('components/content/player_music/MusicPlayer')


Vue.use(VueRouter)

const routes = [
  {path: '/' , redirect: '/discover'},
  {path: '/discover', component: Discover},
  {path: '/mine', component: Mine,},
  {path: '/village', component: Village},
  {path: '/video', component: Video},
  {path: '/search',component: Search},
  {path: '/musicplayer', component: MusicPlayer}


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
