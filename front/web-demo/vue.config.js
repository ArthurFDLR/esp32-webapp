const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
  configureWebpack: {
    plugins: [new BundleAnalyzerPlugin(), new VuetifyLoaderPlugin()],
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://esp-home.local:80',
        changeOrigin: true,
        ws: true
      }
    }
  }
}
