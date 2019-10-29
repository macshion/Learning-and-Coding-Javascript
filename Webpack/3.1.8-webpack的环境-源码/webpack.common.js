const webpack=require('webpack');
const extractTextCss=require('extract-text-webpack-plugin');
const dev=require('./webpack.dev.js');
const pro=require('./webpack.pro.js');
const merge=require('webpack-merge');
module.exports=env=>{
  var postPlugins=[require('autoprefixer')(), require('postcss-cssnext')()];
  postPlugins.concat(env==='production'?[require('postcss-sprites')({
                                            spritePath: 'dist/sprite',
                                            retina: true
                                         })]:[])
  //配置对象
  var common={
     entry:'./app.js',
     output:{
     	filename:'bundle.js'
     },
     module:{
        rules: [  
           //js处理
           {
            test:/\.js$/,
            use:
              {
                loader:'babel-loader',
              }
           },
           //css处理
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
                   loader:'postcss-loader',
                   options:{
                    ident:'postcss',
                    plugins:postPlugins
                   }
                 },
                 {
                  loader:'less-loader'
                 }        
                ]         
             })
           },                   
        ] 
     },
     plugins:[
     //提取额外css文件
       new extractTextCss({
        filename:env==='production'?'app.bundle.css':'app.dev.css'
       })
     ]
  };
  //返回配置对象
  return merge(common,env==='production'?pro:dev);
}