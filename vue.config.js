
module.exports = {
  devServer: {
    proxy: {//解决跨域问题
      '/api': {
        // 此处的写法，目的是为了 将 /api 替换成 https://autumnfish.cn/
        // target: 'https://autumnfish.cn/',
        target: 'http://localhost:3000/',
        // 允许跨域
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
      // [process.env.VUE_APP_API]: {
      //   target: 'https://autumnfish.cn/',
      //     // 允许跨域
      //     changeOrigin: true,
      //     ws: true,
      // }
    }
  }
}