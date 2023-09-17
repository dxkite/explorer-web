const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080/', // 真实请求UR
        changeOrigin: true, // 允许跨域
      }
    }
  },
  chainWebpack: config => {
    if (process.env.WEBPACK_ANALYZER === 'true') {
      // 配置包分析器
      config.plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
  }
})
