export function debounce(func, delay) {
  let timer;
  return function(){
    if(timer) { // console.log("清除",timer);
      clearTimeout(timer)
    }
    // console.log("新的",timer);
    let context = this, args = arguments // arguments会自动收集传入的参数
    timer = setTimeout(() => {
      func.apply(context,args)
    },delay)
  }
}