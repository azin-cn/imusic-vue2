
import {
  REC_DISCOVERD_DATA
} from './mutations_type'

import { 
  reqDiscoverData,
  reqSlideBall
 } from 'api/discover'

export const actions = {
  
  /**
   * getDisCoverData 获取首页（发现页）的数据
   * @param {*} commit 
   * @returns 
   */
  async getDisCoverData({commit}) {
    let resp = await reqDiscoverData()
    let slideBall = await reqSlideBall()
    
    if(resp.code !== 200 || slideBall.code !== 200) {
      console.log(resp); // 打印错误信息
      return // 推出函数
    }

    let data = resp.data.blocks
    data.push(slideBall.data) // 处理数据

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

      'HOMEPAGE_SLIDE_BALL', // 滑动图形入口处
    ]
    
    // 进行数据处理，方便以后的维护
    // resp.data.blocks.forEach( (item,index) => {
    //   payload.push(item)
    // });
    payload.push(data[0].extInfo.banners)
    data.forEach( (item, index) => {
      if(index==0) return
      payload.push(item)
    });
    // console.log("%%%%%%",data);
    commit(REC_DISCOVERD_DATA,{payload,tags})
  }

}