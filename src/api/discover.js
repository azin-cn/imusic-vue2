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
  url: '/homepage/dragon/ball'
 })
}


/**
 * reqDiscoverData 获取首页（发现页）的数据
 * @returns 发现页数据
 */
 export function reqDiscoverData() {
  return request({
    url: '/homepage/block/page'
  })
}

/**
 * reqLatestMV 获取最新 mv
 * @type GET
 * @param {String} area 地区，不填则为全部
 * @param {Number} limit 取出数量 , 默认为 30
 * @returns 最新 mv列表
 */
export function reqLatestMV(area,limit) {
  return request({
    url: '/mv/first',
    params: {
      limit: 6
    }
  })
}



