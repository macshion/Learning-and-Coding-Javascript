var extractTextCss=require('extract-text-webpack-plugin');
var htmlWebpackPlugin=require('html-webpack-plugin');
module.exports= {
	entry:{
	 app:"./app.js",
	 app2:"./app2.js"
	},
	output:{
		path:__dirname+"/src/dist",
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
  plugins:[
   new extractTextCss({
    filename:'[name].min.css'
   }),
   new htmlWebpackPlugin({
   	filename:"index.html",
   	template:"./index.html",
    chunks:['app']
   })
  ]
}