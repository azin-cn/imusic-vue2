import {request} from './request'
/**
 * 获取音乐的函数
 */

/**
 * reqCheckMusic 检查音乐是否可用
 * @param {Number} id 
 * @returns 
 */
export function reqCheckMusic(id) {
  return request({
    url: '/check/music',
    params: {
      id
    }
  })
}

/**
 * reqMusicUrl 获取音乐的url
 * @param {Number} id 
 * @returns 
 */
export function reqMusicUrl(id) {
  return request({
    url: '/song/url',
    params: {
      id
    }
  })
}

/**
 * reqMusicLyric 获取音乐的歌词
 * @type GET
 * @param {Number} id 
 * @returns 
 */
export function reqMusicLyric(id) {
  return request({
    url: '/lyric',
    params: {
      id
    }
  })
}