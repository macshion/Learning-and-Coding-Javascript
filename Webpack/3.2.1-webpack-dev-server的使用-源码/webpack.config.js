const webpack = require('webpack')
const extractTextCss = require('extract-text-webpack-plugin'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports={
	   mode:'production',
     entry:{
        app:'./src/app.js',
     },
     output:{
      path:__dirname+"/dist",
     	filename:'[name].bundle.js'
     },
     module:{
        rules:[
               {
                 test:/\.less$/,
                 use:extractTextCss.extract({
                  fallback:{
                     loader:'style-loader',
                     options:{
                      //insertInto:"#mydiv",
                      singleton:true,
                      //transform:"./transform.js"
                     }
                   },
                  use:[
                   {
                     loader:'css-loader',
                     options:{
                       modules:{
                        localIdentName:'[path][name]_[local]_[hash:4]'
                       }                    
                     } 
                   },
                   {
                    loader:'less-loader'
                   }        
                  ]
                 })
               }           
        ]
     },
     devtool:'eval-source-map',  
     devServer:{
        port: 9001,
        inline:true,
        overlay:true,
        hot:true,
        hotOnly:true,
        historyApiFallback:{
          rewrites:[
           {
             from:/^\/([ -~]+)/,
             to:function(context){
               return './'+context.match[1]+'.html'
             }
           }
          ]
        },
        proxy:{
          "/smartSpec":{
            target:"https://mooc.study.163.com/",
            changeOrigin:true,
            pathRewrite:{
              "^/smartSpec/qd":"/smartSpec/detail/1202816603.htm"
            },
          },

        }
     },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            minify: {
                collapseWhitespace: true
            },
            inject:true,
        }),     
      new extractTextCss({
        filename:"app.bundle.css",
        disable:true
      }),
    ]   
}