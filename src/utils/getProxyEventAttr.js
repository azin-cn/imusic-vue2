export function getProxyEventAttr(e, attr) {
  let target = e.target
  let val = null
  while(target) {
    if(target.hasAttribute && target.hasAttribute(attr)) {
      val = target.getAttribute(attr)
      break
    }
    target = target.parentNode
  }
  return val
}