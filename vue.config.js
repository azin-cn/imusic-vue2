const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  configureWebpack: {
    // TODO: 解决路径别名和文件拓展的问题
    resolve: {
      alias: {
        'api': '@/api',
        'assets': '@/assets',
        'components': '@/components',
        'views': '@/views',
      }
    }
  },

  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': []
      }
    }
  },

  pluginOptions: {
    'cube-ui': {
      postCompile: false,
      theme: false
    }
  }
})
