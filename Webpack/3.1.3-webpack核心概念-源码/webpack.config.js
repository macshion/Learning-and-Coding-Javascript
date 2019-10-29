module.exports= {
  //entry:'./app.js',
  //entry:['./app.js','./app2.js'],
   entry:{
   	app111:'./app.js'
   },
   output:{
   	 path:__dirname+'/src/mybundle',
   	 filename:'./js/[name].[hash:6].js' //app111.khg12jkhsad123.js
   },
   module:{
   	rules:[
      {
      	test:/\.js$/,
      	use:'babel-loader'
      }
   	]
   }
}