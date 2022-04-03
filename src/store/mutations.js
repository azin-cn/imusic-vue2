import { 
  REC_DISCOVERD_DATA,
  REC_DISCOVERD_DATA_SLIDE_BALL,
  REC_DISCOVERD_DATA_LATEST_MV,
  REC_INIT_MUSIC_DATA,
  REC_MUSIC_DATA
 } from "./mutations_type"


export const mutations = {
  [REC_DISCOVERD_DATA](state,{payload,tags}) {
    tags.forEach( (item,index) => {
      state.DISCOVER_DATA[item] = payload[index]
    });
  },

  [REC_DISCOVERD_DATA_SLIDE_BALL](state,{HOMEPAGE_SLIDE_BALL}) {
    state.DISCOVER_DATA.HOMEPAGE_SLIDE_BALL = HOMEPAGE_SLIDE_BALL
  },
  [REC_DISCOVERD_DATA_LATEST_MV](state,{HOMEPAGE_BLOCK_LATEST_MV}) {
    state.DISCOVER_DATA.HOMEPAGE_BLOCK_LATEST_MV = HOMEPAGE_BLOCK_LATEST_MV
  },

  [REC_INIT_MUSIC_DATA](state,{MUSIC,CURRENTTIME}){
    state.AUDIO.MUSIC = MUSIC
    state.CURRENTTIME = CURRENTTIME || 0
  },
  [REC_MUSIC_DATA](state, {MUSIC, play, flag, item}) {
    state.AUDIO.MUSIC = MUSIC
    state.AUDIO.PAUSED = !play
    if (flag) state.AUDIO.ML.push(item)
  }
}