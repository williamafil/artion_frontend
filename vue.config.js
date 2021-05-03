const path = require('path');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/artion_frontend/' : '/',

  transpileDependencies: ['webpack-dev-server/client'],

  // 不保存為eslint規範的代碼
  lintOnSave: false,

  // 打包時不產生map文件，加快打包速度
  productionSourceMap: false,

  chainWebpack: (config) => {
    // 在.vue檔中可以轉換iview
    config.module
      .rule('vue')
      .test(/\.vue$/)
      .use('iview-loader')
      .loader('iview-loader')
      .options({
        prefix: true,
      });

    // 啟用hotReload
    config.module
      .rule('vue')
      .test(/\.vue$/)
      .use('vue-loader')
      .loader('vue-loader')
      .options({
        hotReload: true,
      });

    config.entry.app = ['babel-polyfill', './src/main.js'];
  },

  // css預處理轉換
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'stylus',
      patterns: [path.resolve(__dirname, './src/styles/_base.styl')],
    },
  },

  // webpack-dev-server 設定
  devServer: {
    host: '127.0.0.1',
    port: 8080,
    // proxy: 'http://10.1.1.56:4444'
  },
};
