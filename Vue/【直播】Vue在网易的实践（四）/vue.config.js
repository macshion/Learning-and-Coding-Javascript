module.exports = {
    devServer:{
        proxy:{
            '/apply':{
                target:'http://api.zouzhengming.com/api/v1', //隔壁老王的服务器 (需要代理的服务器地址)
                ws:true,    //websocket 与后台形成一个通道 持续的
                changeOrigin:true,  //是否允许跨域
                pathRewrite:{       //重写
                   '/apply': '/'
                }
            }
        }
    },
    //优化的一部分
    css: {
        loaderOptions: {
          sass: {
            data: `
              @import "@/assets/common/index.scss";
            `
          }
        }
      },
      configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
          // 为生产环境修改配置...
          config.plugins.push(
            //生产环境自动删除console
            new UglifyJsPlugin({
              uglifyOptions: {
                  //压缩
                compress: {
                  warnings: false,
                  drop_debugger: true,
                  drop_console: true,
                },
              },
              //关闭sourceMap 映射 开启后耗时会大大增加
              sourceMap: false,
              //使用多进程并行运行来提高构建速度
              parallel: true,
            })
          );
        }
      },
}