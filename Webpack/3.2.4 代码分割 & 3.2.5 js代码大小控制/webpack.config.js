var extractTextCss=require('extract-text-webpack-plugin');
var htmlWebpackPlugin=require('html-webpack-plugin');
const webpackSpriteSmith=require('webpack-spritesmith');
const webpack=require('webpack');
const UglifyJs=require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path=require('path');
module.exports= {
  mode:'production',
	entry:{
	 app:"./src/app.js",
	},
	output:{
		path:__dirname+"/dist",
		filename:"./[name].bundle.js",
	},
  optimization:{
    //minimize:true,
    splitChunks:{
      name:true,
      chunks:"all",
      minSize:0,
      /*cacheGroups:{
        mode1:{
          test:/mode1/,
        },
      }*/
    },
    runtimeChunk:true
  },
	module:{
		rules: [    
     {
       test:/\.css$/,
       use:extractTextCss.extract({
        fallback:{
           loader:'style-loader',
           options:{
            //insertInto:"#mydiv",
            //transform:"./transform.js"
           }
         },
        use:[
         {
           loader:'css-loader',
           options:{
             /*modules:{
              localIdentName:'[path][name]_[local]_[hash:4]'
             }   */                 
           } 
         },
        ]
       })
     },
     {
      test:/\.(png|jpg|jgeg|gif)$/,
      use:[
        {
          loader:'url-loader',
          options:{
            //默认是[hash].[ext]
            name:'[name].[hash:4].[ext]',
            outputPath:"assets/img",
            publicPath:"assets/img",
            limit:5000
          }
        },
        {
          loader:'img-loader',
          options:{
            plugins:[
              require('imagemin-pngquant')({
                speed:2//1-11
              }),
              require('imagemin-mozjpeg')({
                quality:80//1-100
              }),
              require('imagemin-gifsicle')({
                optimizationLevel:1//1,2,3
              })
            ]
          }
        },
      ]
     },
    {
      test:/\.html$/,
      use:{
        loader:'html-loader',
        options:{
          attrs:["img:data-src"]
        }
      }
    } 
		]
	},
  plugins:[
   new extractTextCss({
    filename:'[name].min.css'
   }),
   new htmlWebpackPlugin({
   	filename:"index.html",
   	template:"./src/index.html",
   }),
   new CleanWebpackPlugin(),
   /*new webpack.optimize.CommonsChunksPlugin({
     name:'vendor',
     minChunks:'infinity'
   }),
   new webpack.optimize.CommonsChunksPlugin({
     name:'manifest',
     minChunks:'infinity'
   }),
   new webpack.optimize.CommonsChunksPlugin({
     name:'app.js',
     minChunks:2
   }),*/   
   //new webpack.optimize.UglifyJsPlugin();
  ]
}