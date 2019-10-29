const webpack=require('webpack');
module.exports={
  entry:{
  	jquery:["jquery"],
  	loadsh:["loadsh"]
  },
  output:{
    path:__dirname+"/src/dll",
    filename:"./[name].js",
    //引用名
    library:'[name]'
  },
  plugins:[
     new webpack.DllPlugin({
      path:__dirname+"/src/dll/[name].json",
      name:"[name]"
     })
  ]  
}