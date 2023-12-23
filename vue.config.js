const { defineConfig } = require('@vue/cli-service')

let outputDir = './dist'
const outputParam = process.argv.find(v => v.match(/output/))
if (outputParam) {
  outputDir = outputParam.replace(/^--output=(.+)$/, '$1')
}

console.log('output', outputDir, outputParam, process.argv)

module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: process.env.SOURCE_MAP === 'false' ? false : true,
  outputDir: outputDir,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:80/', // 真实请求UR
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
