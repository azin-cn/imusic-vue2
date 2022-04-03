export const state = {
  DISCOVER_DATA: {
    HOMEPAGE_BANNER:null,
    HOMEPAGE_BLOCK_PLAYLIST_RCMD:null,
    HOMEPAGE_BLOCK_STYLE_RCMD:null,
    HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG:null,
    HOMEPAGE_BLOCK_HOT_TOPIC:null,
    HOMEPAGE_MUSIC_CALENDAR:null,
    HOMEPAGE_MUSIC_MLOG:null,
    HOMEPAGE_BLOCK_MGC_PLAYLIST:null,
    HOMEPAGE_BLOCK_OFFICIAL_PLAYLIST:null,
    HOMEPAGE_VOICELIST_RCMD:null,
    HOMEPAGE_BLOCK_YUNCUN_PRODUCED:null,
    HOMEPAGE_PODCAST24:null,
    HOMEPAGE_BLOCK_VIDEO_PLAYLIST:null,

    HOMEPAGE_SLIDE_BALL: null,
    HOMEPAGE_BLOCK_LATEST_MV: null
  },
  AUDIO: {
    PAUSED: true,
    LOOP: false,
    ML: [], // 音乐列表
    MUSIC: { // 当前的音乐
      id: 0,
      title: null,
      src: null,
      img: null,
      duration: 0
    }
  },
  CURRENTTIME:0,
}