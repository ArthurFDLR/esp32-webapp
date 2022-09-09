module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://web-blinker.local:80',
        changeOrigin: true,
        ws: true
      }
    }
  }
}
