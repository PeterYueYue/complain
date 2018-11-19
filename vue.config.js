const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

module.exports = {
  outputDir: 'docs',
  baseUrl: '/',
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ['*']
          })
        ]
      }
    }
  },
  devServer: {
    port: 8080, // 端口号
    host: 'localhost',
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    // proxy: 'http://weixin.greenfortune.sh.cn:80' // 配置跨域处理,只有一个代理
    proxy: 'http://180.153.19.162:8082' // 配置跨域处理,只有一个代理
    // proxy: 'http://192.168.1.132:8080' // 配置跨域处理,只有一个代理
    // proxy: {
    //     '/api': {
    //         target: 'http://192.168.1.136:8080',
    //         ws: true,
    //         changeOrigin: true
    //     },
    //     '/foo': {
    //         target: '<other_url>'
    //     }
    // },  // 配置多个代理
  }
  
};
// baseUrl: process.env.NODE_ENV === 'production' ? '/rem/' : '/',
