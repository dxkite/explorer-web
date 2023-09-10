module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080/', // 真实请求UR
        changeOrigin: true, // 允许跨域
      }
    }
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'dev') {
      // 配置包分析器
      config.plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
  }
}
