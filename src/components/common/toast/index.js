import Toast from './Toast'

const obj = {} // 创建空对象

/**
 * Vue注册插件的时候会自动调用install，调用install
 * @param {*} Vue 
 */
obj.install = function(Vue) { 
  
  /** 通过组件构造器传入模板对象，生成一个**组件构造器** */
  const toastConstructor = Vue.extend(Toast)

  /** 通过组件构造器 生成 **组件实例对象**，当然之前通过 component直接挂载 */
  const toast = new toastConstructor();

  /** 将组件实例，挂载到元素上 */
  let div = document.createElement('div');

  // 将组件实例（虚拟的元素对象）挂载到真实的元素上，想象APP挂载的流程
  toast.$mount(div)

  /** 添加到body上 */
  // document.body.appendChild(div)  错误的，这是一个具体的对象，需要挂在的是杯Vue实例管理的对象
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}


export default obj