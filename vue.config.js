module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:8080/', // 真实请求UR
          changeOrigin: true, // 允许跨域
        }
      }
    }
  }
