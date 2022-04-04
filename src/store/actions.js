
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

 import {
  reqCheckMusic,
  reqMusicUrl,
  reqMusicLyric
 } from 'api/music'

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

  /**
   * initMusicData 初始化音乐的信息
   * @param {*} commit 
   */
  async initMusicData({commit}) {
    let MUSIC = { // 当前的音乐
      id: 0,
      title: null,
      src: null,
      img: null,
      singer: null,
      duration: 0,
      lyric: null
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
    const {id, title, img,singer} = music

    /** duration 写在这，但是会有单独更新
     * 因为如果直接在这里通过new Audio的形式进行更新
     * 那么会发两次请求，这里new audio一次，audio标签中会有一次
     * 
     * 将数据src请求得到以后，然后将src传入audio的标签
     * 进行canplay监听，最后得到duration，然后更新即可
     */
    let src,duration,lyric // duration单独进行更新
    let resp

    resp = await reqMusicUrl(id)
    if(resp.code !== 200 || src === null) {
      console.log('actions url获取失败');
      // 进行提示，检查版权，或者检查音乐版权
    }else {
      src = resp.data[0].url
    }
    
    resp = await reqMusicLyric(id)
    lyric = '未找到歌词~~'
    if(resp.code !== 200) {
      console.log('actions 找不到歌词');
      // 进行提示，检查网络问题
    }else {
      lyric = resp.lrc.lyric
    }
    
    let MUSIC = { // 正在播放的音乐对象
      id,title,img,src,
      singer,duration,lyric,
    }
    music = { // 表示播放将要存入历史的对象
      id,title,img,src,singer,duration
    }

    let flag = true  // 默认可以存入播放列表历史
    let ML = state.AUDIO.ML
    if(ML.length !==0 && ML[ML.length-1].id === music.id) {
      console.log('重复点击了！不加入播放历史列表')
      flag = false
    }
    let play = music.src ? true : false // 是否为空
    flag = flag && play ? true : false // 
    // console.log(state.AUDIO);
    commit(REC_MUSIC_DATA,{MUSIC, play, flag, music})
  },

}