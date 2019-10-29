var extractTextCss=require('extract-text-webpack-plugin');
var htmlWebpackPlugin=require('html-webpack-plugin');
const webpackSpriteSmith=require('webpack-spritesmith')
const path=require('path');
module.exports= {
  mode:'development',
	entry:{
	 app:"./src/app.js",
	},
	output:{
		path:__dirname+"/dist",
		filename:"./[name].bundle.js",
	},
 	resolve:{
     alias: {
       a2:"./js/app2.js",
     }
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
         {
          loader:"postcss-loader",
          options:{
            plugins:[
             /* require('postcss-sprites')({
                spirtePath:"./dist/assets/sprite"
              })*/
            ]
          }
         }
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
    } ,
    {
      test:/\.etf$/,
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
   new webpackSpriteSmith({
    src:{
      //图片来源文件夹
      cwd:path.join(__dirname,"src/assets/img"),
      //处理什么图片
      glob:"*.jpg"
    },
    target:{
      //打包到哪
      image:path.join(__dirname,'dist/sprites/sprite.png'),
      css:path.join(__dirname,'dist/sprites/sprite.css'),
    },
    apiOptions:{
      cssImageRef:"./sprites/sprite.png"
    }
   })
  ]
}