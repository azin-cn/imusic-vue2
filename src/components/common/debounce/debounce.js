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

export function throttle(fn,delay) {
  let timer
  return function() {
    let args = arguments;//注意如果要传参的话 这句不能省略
    if(!timer){
      timer = setTimeout(()=>{
        timer = null;
        fn.apply(this,args)
      },delay)
    }
  }
}