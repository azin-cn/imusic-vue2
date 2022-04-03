
import {
  REC_DISCOVERD_DATA,
  REC_DISCOVERD_DATA_SLIDE_BALL,
  REC_DISCOVERD_DATA_LATEST_MV,
  REC_INIT_MUSIC_DATA,
  REC_MUSIC_DATA,
} from './mutations_type'

import { 
  reqDiscoverData,
  reqSlideBall,
  reqLatestMV
 } from 'api/discover'

export const actions = {
  /**
   * getLatestMV 获取最新的MV
   * @returns MV列表
   */
  async getLatestMV({commit}) {
    let resp = await reqLatestMV()
    if(resp.code !== 200) {
      console.log(resp);
      return null;
    }
    let HOMEPAGE_BLOCK_LATEST_MV = {
      uiElement: {
        subTitle: {},
        button: {}
      },
      creatives: []
    }
    HOMEPAGE_BLOCK_LATEST_MV.uiElement.subTitle.title = '最新MV'
    HOMEPAGE_BLOCK_LATEST_MV.uiElement.button.text = '更多'

    let creatives = []
    resp.data.forEach((item) => {
      let resources = []
      let resource = {
        uiElement: {
          mainTitle:{},
          image: {}
        }
      }
      resource.resourceId = item.id
      resource.uiElement.mainTitle.title = item.name
      resource.uiElement.image.imageUrl = item.cover
      resources.push(resource)
      creatives.push({
        resources
      })
    })
    HOMEPAGE_BLOCK_LATEST_MV.creatives = creatives
    commit(REC_DISCOVERD_DATA_LATEST_MV,{HOMEPAGE_BLOCK_LATEST_MV})
  },

  /**
   * getSlideBall 获取原型图标
   * @returns 获取原型图标
   */
  async getSlideBall({commit}) {
    let resp = await reqSlideBall()
    if(resp.code !== 200) {
      console.log(resp);
      return null
    }
    let HOMEPAGE_SLIDE_BALL = resp.data
    commit(REC_DISCOVERD_DATA_SLIDE_BALL,{HOMEPAGE_SLIDE_BALL})
  },
  
  /**
   * getDisCoverData 获取首页（发现页）的数据
   * @param {*} commit 
   * @returns 
   */
  async getDisCoverData({commit}) {
    let resp = await reqDiscoverData()
    if(resp.code !== 200) {
      console.log(resp); // 打印错误信息
      return // 推出函数
    }
    
    let data = resp.data.blocks

    let payload = []
    let tags = [
      'HOMEPAGE_BANNER',
      'HOMEPAGE_BLOCK_PLAYLIST_RCMD',
      'HOMEPAGE_BLOCK_STYLE_RCMD',
      'HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG',
      'HOMEPAGE_BLOCK_HOT_TOPIC',
      'HOMEPAGE_MUSIC_CALENDAR',
      'HOMEPAGE_MUSIC_MLOG',
      'HOMEPAGE_BLOCK_MGC_PLAYLIST',
      'HOMEPAGE_BLOCK_OFFICIAL_PLAYLIST',
      'HOMEPAGE_VOICELIST_RCMD',
      'HOMEPAGE_BLOCK_YUNCUN_PRODUCED',
      'HOMEPAGE_PODCAST24',
      'HOMEPAGE_BLOCK_VIDEO_PLAYLIST',
    ]
    
    // 进行数据处理，方便以后的维护
    // resp.data.blocks.forEach( (item,index) => {
    //   payload.push(item)
    // });
    payload.push(data[0].extInfo.banners)

    data.forEach( (item, index) => { // foreach无法终结
      if(index==0) return
      payload.push(item)
    });
    // console.log("%%%%%%",data);
    commit(REC_DISCOVERD_DATA,{payload,tags})
  },

  async initMusicData({commit}) {
    let MUSIC = { // 当前的音乐
      id: 0,
      title: null,
      src: null,
      img: null,
      duration: 0,
    }
    let CURRENTTIME = 0
    commit(REC_INIT_MUSIC_DATA, {MUSIC,CURRENTTIME})
  },

  /**
   * getMusicData 拼接播放器的数据
   * @param {Object} music id,img,src,duration
   * @returns 
   */
  async getMusicData({state,commit},music) {
    let MUSIC = {}
    MUSIC.id = music.id
    MUSIC.title = music.title
    MUSIC.img = music.img
    MUSIC.src = music.src
    MUSIC.currentTime = 0 // 具体的数据由另外一个函数更新
    MUSIC.duration = music.duration
    
    let item = {
      id: music.id,
      title: music.title,
      img: music.img,
      src: music.src
    }
    let flag = true
    let ML = state.AUDIO.ML
    if(ML.length !==0 && ML[ML.length-1].id === item.id) {
      console.log('重复点击了！')
      flag = false
    }
    let play = music.src ? true : false
    flag = flag && play ? true : false //
    // console.log(state.AUDIO);
    commit(REC_MUSIC_DATA,{MUSIC, play, flag, item})
  },
  async getUpdateTime(time){ 
    // 感觉还要经过actions太消耗性能了，
    // 或许用一个起始时间标记即可，
    // 其余的需要用都的地方根绝开始播放的当前时间戳，检测多少即可
  }

}