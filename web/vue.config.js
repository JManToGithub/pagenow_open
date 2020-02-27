const webpack = require('webpack');

module.exports = {
  publicPath: '/pagenow',
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: './static',
  // 配置less
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      }
    },
  },
  devServer: {
    port: 8081,
    // proxy: {
    //   '/pagenow': {
    //     target: 'http://localhost:8090',
    //     ws: true,
    //     changOrigin: true,
    //     pathRewrite: {
    //       "^/pagenow": ""
    //     }
    //   }
    // }
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      })
    ]
  },
  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');
  },
  productionSourceMap: false
};

