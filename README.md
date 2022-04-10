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

- 用户点击播放，跳转播放器播放音乐，实现过渡动效，加入播放历史列表，事件监听
- 播放页面唱片机效果
- 播放历史，点击播放历史列表中的歌曲不会重新加入播放历史列表
- 首页轮播图，使用swiper实现
- 进度条实时更新，通过AUDIO对象的属性currentTime进行更新，利用了节流函数
- 时间实时更新，同理通过AUDIO对象的属性currentTIme进行同步更新，利用节流函数
- 播放歌曲/歌曲封面旋转/歌曲歌词实时滚动
- 单曲循环，列表循环，上一首，下一首
    - 如果列表中只有一首歌曲，那么就是上一首和下一首都是一样
    - 点击播放历史列表的歌曲不会重复加入播放历史列表中
    - 播放历史列表中可以直接设置单曲/列表播放，并且数据同步更新到播放器主页面中。
    - 当当前的歌曲播放完成后，AUDIO对象自动触发end函数，检测是否为循环播放，判断检测结果，进行循环 / 单曲操作
- 获取用户的歌单基本信息/歌曲
- 首页，进行了分页操作
- 热门话题
- 云村日历
- 歌单广场
- 更多音乐
- 每日推荐

### 项目难点

- 通过一个AUDIO实例对象，完成数据的状态共享。
- 进度条的实时滚动，通过总的时长duration，和当前已播放的歌曲时长currentTime进行比例计算得到一个占比，最后乘上当前进度条的宽度，最后能够得到当前的距离。同时进行过渡的设定。优化：每次更新挪动等间隔的距离，能够降低计算的次数提高性能。因为每次一的更新都是固定的，不需要重复计算当前的距离，但是要注意，如果中途更换了歌曲。那么此时的进度条应该要重置。
- 进度条的实时移动，并且对应的容错措施，包括浮点数的无限循环和NaN等
- 歌词的实时滚动，通过offsetTop, scrollTo实现，包括对应位置计算。给每一个li设定等高的高度，方便计算。如果还需要考虑换行的歌词，那么此时设置padding即可撑开，设置行距让换行的元素靠近，设置padding让不同行的元素远离。

#### audio标签

```html
<audio 
       id="audio" ref="audio" 
       :src="SRC" :paused="PAUSED"
       :loop="LOOP" @duratonchange="durationchange"
       @timeupdate="updateTime"
       @ended="ended" @canplay="canplay"
       autoplay preload>
</audio>
```

#### AUDIO对象方法

```javascript
methods: {
  ...mapActions(['initMusicData','getMusicData','getMusicDuration']),
    canplay: debounce(function submit() {
      let duration = this.$refs.audio.duration
      // console.log("maudio duration ",duration);
      this.getMusicDuration(duration)
    },80),
      durationchange() { // 更新状态
      let duration = this.$refs.audio.duration
      // console.log("maudio duration ",duration);
      this.getMusicDuration(duration)
    },
      updateTime: throttle(function dUpdate() { // currentTime是一个毫秒，节流以下
        if(!this.$refs.audio) return ;
        this.$set(
          this.$store.state,'CURRENTTIME',
          parseFloat(this.$refs.audio.currentTime)
        )
        // console.log(this.$refs.audio.currentSrc);
      },500),

        async play(music) { // 通过判断参数music来判断是继续播放还是播放新歌曲
        if(!music) { // 参数为空，继续播放
          if(this.SRC === null) { // 如果已经不是初始化的url，默认不为null
            console.log("maudio url null");
            this.$audio.pause()
            this.initMusicData()
          }else {
            this.$set(this.$store.state.AUDIO,'PAUSED',false)
            this.$refs.audio.play() // 注意两个play方法是不一样的
          }
          return 
        }
        // console.log("maudio 新歌曲");
        // this.pause() // 先暂停当前，但是交互效果回很突兀
        this.id = music.id // 新的音乐id
        await this.getMusicData(music) // 提交数据 id title img src singer等
        /** 当能够播放的时候，canplay回进行监听 */
        this.$refs.audio.load() // 重新加载
      },
        pause() {
          this.$refs.audio.pause()
          this.$set(this.$store.state.AUDIO,'PAUSED',true)
        },
          ended() {
            if(this.LOOP === false) { // 当设定的不是循环时
              this.next()
            }
          },
            loop(state) {
              this.$set(this.$store.state.AUDIO,'LOOP',state)
            },
              async prev() { // 上一首 可以与next合并为一个函数
                let len = this.ML.length,index = len-1 // 注意蕴含的默认条件，当当前的歌曲不能播放时，播放的是列表中最后一首
                if(len===0) {console.log("列表为空"); return ;}
                for (let i = 0; i < len; i++) {
                  let ml = this.ML[i]
                  if(ml.id === this.id) {
                    index = i===0 ? len-1 : i-1
                    break
                  }
                }
                this.ML[index].prev_next = true
                this.play(this.ML[index])
              },
                async next() { // 下一首
                  let len = this.ML.length,index = 0 // 注意蕴含条件，如果当前的歌曲不能播放，那么播放的是列表中的第一首
                  if(len===0) {console.log("列表为空"); return ;}
                  for (let i = 0; i < len; i++) {
                    let ml = this.ML[i]
                    if(ml.id === this.id) {
                      index = i===len-1 ? 0 : i+1
                      break
                    }
                  }
                  this.ML[index].prev_next = true
                  this.play(this.ML[index])
                },
                  fastSeek(currentTime){ // 在音频播放器中指定播放时间(封装) 直接设定currentTime
                    // console.log("%%%%%%",Math.floor(currentTime));
                    this.$refs.audio.currentTime = currentTime
                    this.play();
                  },
}
```

