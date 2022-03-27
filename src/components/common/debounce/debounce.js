export function debounce(func, delay) {
  let timer = null
  return function(e){
    if(timer) {
      // console.log("清除",timer);
      clearTimeout(timer)
    }
    // console.log("新的",timer);
    let context = this, args = arguments
    timer = setTimeout(() => {
      func.apply(context,args)
    },delay)
  }
}