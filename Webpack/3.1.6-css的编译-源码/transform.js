 module.exports=function(css){
  if(window.screen.width<500){
  	css=css.replace('red','yellow');
  }
  return css;
}