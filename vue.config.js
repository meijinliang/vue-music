
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

// vue.config.js 配置说明
// 官方vue.config.js 参考文档 https://cli.vuejs.org/zh/config/#css-loaderoptions
module.exports = {
  // outputDir： 生产环境构建的项目目录 默认dist目录
  assetsDir: 'static', // 放置生成的静态资源文件（js、css、img、fonts）的目录（相对于outputDir）
  // indexPath: 'main.html', // 指定生成的index.html的输出路径（相当于outputDir）
  // lintOnSave: 'error',  //
  /**
   *  boolean | 'warning' | 'default' | 'error' 每次保存时lint代码， 这个值会在@vue/cli-plugin-eslint被安装之后生效
   *  设置为true 或 'warning'时， eslint-loader会将lint错误输出为编辑警告。默认情况下仅会被输出到命令行
   *  'default' 会将lint错误输出为编译错误； 'error'会将lint警告也输出为编译错误
   * */
  //  productionSourceMap：true // 默认true 接受Boolean 如果不需要生产环境的Source map，可以设置为false加速构建生产环境
  //  productionSourceMap：true 这个的作用在生产环境的控制台打印的信息能够定位到具体文件位置 而不是app...js文件内

  devServer: {
    // port: 9527, //设置项目启动的端口号
    proxy: { // 解决跨域问题
      // '/api': {
      //   // 此处的写法，目的是为了 将 /api 替换成 https://autumnfish.cn/
      //   // target: 'https://autumnfish.cn/',
      //   target: 'http://localhost:3000/',
      //   // 允许跨域
      //   changeOrigin: true,
      //   // ws: true, // 配置websockets代理，true
      //   pathRewrite: { // 路径重写 请求的时候不希望传递/api
      //     '^/api': ''
      //   },
      //   // secure: false // 接受在https上运行且证书无效的后端服务器，默认不接受
      // }
      [process.env.VUE_APP_API]: {
        target: 'https://autumnfish.cn/',
        // 允许跨域
        changeOrigin: true,
        ws: true,
        pathRewrite: { // 路径重写 请求的时候不希望传递/api
          '^/api': ''
        }
      }
    }
  },
  // configureWebpack type: Object || Function
  configureWebpack: {

  },
  chainWebpack(config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
