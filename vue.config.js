module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:8080/', // 真实请求UR
          changeOrigin: true, // 允许跨域
        }
      }
    }
  }
