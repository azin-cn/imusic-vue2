import { request } from "./request";


let base = '/search'

/**
 * reqSearchDefault 获取默认的搜索关键字
 * @returns 
 */
export function reqSearchDefault() {
  return request({
    url: `${base}/default`,
  })
}

/**
 * reqSearchHot 热搜列表(简略)
 * @returns 
 */
export function reqSearchHot() {
  return request({
    utl: `${base}/hot`
  })
}

/**
 * reqSearchHotDetail 热搜列表(详细)
 * @returns 
 */
export function reqSearchHotDetail() {
  return request({
    url: `${base}/hot/detail`
  })
}

/**
 * reqSearchSuggest 搜索建议
 * @param {String} keywords 关键词
 * @returns 
 */
export function reqSearchSuggest(keywords) {
  return request({
    url: `${base}/suggest`,
    params: {
      keywords,
      type: 'mobile'
    }
  })
}