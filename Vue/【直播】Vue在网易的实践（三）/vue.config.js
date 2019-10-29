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
    }
}