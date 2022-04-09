# imusic

## 项目启动 / 预览 / 部署

### Project setup 项目启动

```
npm install
```

### Compiles and hot-reloads for development 预览热加载

```
npm run serve
```

### Compiles and minifies for production 打包

```
npm run build
```

## 项目介绍

> 一直以来都想做一个音乐播放器，包括各种评论、视频、最重要的还是音乐等等，高中阶段看过网易云音乐的页面，对于刚开始的轮播图还是非常喜欢的，正如现在做的一样，但是后来就变了，看起来不是特别的舒服，所以最后就开始了自己的coding之旅。先是做过了SpringBoot的学生管理系统，一边在后台写着接口，一边学着前端的知识，但是后端的接口写成了，前端的页面还是看着别扭，所以专心开始弄前端的页面，后来越来越喜欢前端的东西，能够让自己的想法用各种色彩和图形表达出来。

以上都是题外话，这个项目还是凝聚了好多的心血在里面，唠嗑有点多了。

使用Vue实现网易云音乐移动的效果，包括登录，歌曲播放，MV播放，评论等等，功能有的还没有被完善，但是会一直将这个项目做到和网易云音乐一样的程度的，先立个flag。

## 项目技术

- Vue全家桶 (重点是Vue2的响应式，Vuex中state的对象属性的修改监听) `this.$set()`

- Debounce，Throttle 两大函数

    - Debounce防抖函数主要用在leBetter-Scroll的bug问题上，修复了以后滑动很流畅。在pullingUp上会有一个随机终端的Bug，加上防抖函数后即可解决；同时debounce还在网络卡顿时用户一直点击的限流。

    - Throttle节流函数主要用在了AUDIO的updateTime的回到函数上，虽然文档写的时秒级触发，但是经过检测，chrome浏览器触发的是毫秒级300ms-500ms，这个更新的频率很高，没有必要，直接限制秒级即可

        ```javascript
        updateTime: throttle(function dUpdate() { // currentTime是一个毫秒，节流一下
          if(!this.$refs.audio) return ;
          this.$set(
            this.$store.state,'CURRENTTIME',
            parseFloat(this.$refs.audio.currentTime)
          )
          // console.log(this.$refs.audio.currentSrc);
        },500),
        ```

- Axios 插件

    - 用来发起http和Ajax请求

- Mixin 混入

    - 重构项目时尽量使用hooks，Mixin虽然能够复用代码，但是只能复用逻辑，不能复用带状态的逻辑，而hooks能够复用带状态的逻辑。

- Swiper

    - 发现Swiper的一个新用法，将最外层的wrapper去掉后，能够快速的生成异形slide的效果。

### AUDIO部分

-  路径 `imusic\src\components\content\audio`

- 设计
    - 在APP组件中，定义一个AUDIO对象
    - 在AUDIO组件完成挂载 `mounted` 后，加载到Vue实例的原型上
    - 其他的组件通过`Vuex` 和 `this.$audio` 进行数据的读取和操作

- 在APP中，直接定义组件，如果分别在不同组件中音乐的播放中断很严重

```css
.audio {
  display: none;
}
```

- AUDIO的currentTime属性 设置

```javascript
fastSeek(currentTime){ // 在音频播放器中指定播放时间(封装) 直接设定currentTime
  // console.log("%%%%%%",Math.floor(currentTime));
  this.$refs.audio.currentTime = currentTime
  this.play();
},
```

### mapActions使用

```javascript
...mapActions(['initMusicData','getMusicData','getMusicDuration']),
```

### mapState使用

```javascript

```

- 自己的喜欢一般都是直接通过 `this.$store.state.xxx` 来进行引用，因为state中的数据一般都是对象，能够比较方便的监听。

## 实现功能

> 如果未声明引用的css文件，默认纯手写css

- 用户点击播放，跳转播放器播放音乐，实现过渡动效，加入播放历史列表
- 播放历史，点击播放历史列表中的歌曲不会重新加入播放历史列表
- 