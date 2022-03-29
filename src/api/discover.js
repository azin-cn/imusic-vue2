import {request} from './request'
/**
 * TODO: 发现页的相关请求
 */


/**
 * reqMainBanner 获取 Top Banner
 * @type GET
 * @param {Integer} type 
 * @returns 
 */
export function reqMainBanner(type) {
  return request({
    url: '/banner',
    params: {
      type
    }
  })
}

/**
 * reqSlideBall 获取 每一个球形title和img
 * @type GET
 * @returns Slide Ball
 */
export function reqSlideBall() {
 return request({
  url: 'homepage/dragon/ball/'
 })
}

/**
 * reqDiscoverData 获取首页（发现页）的数据
 * @returns 发现页数据
 */
export function reqDiscoverData() {
  return request({
    url: 'homepage/block/page/'
  })
}