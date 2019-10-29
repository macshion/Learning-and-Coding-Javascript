 import "./css/test1.css";
 import img1 from "./assets/img/img1.png";
 var img =new Image();
 img.src=img1;
 document.getElementById('mydiv').appendChild(img);


 /*console.log(2);
 setTimeout(function(){
 	console.log('set1');
	 new Promise(function(resolve,reject){
	   resolve()
	   console.log('p3')
	 }).then(function(){
	 	console.log('then3')
	 });  	
 })
 var pm=new Promise(function(resolve,reject){
   resolve()
   console.log('p1')
 });
 pm.then(function(){
 	console.log('then1')
 })
  setTimeout(function(){
 	console.log('set2');
	 new Promise(function(resolve,reject){
	   resolve()
	   console.log('p2')
	 }).then(function(){
	 	console.log('then2')
	 }); 	
 })*/

 function singleFactor(){
 	function _a(){
 		this.a=123;
 	}
 	if(singleFactor.aObejct){
 		return singleFactor.aObejct;
 	}else{
 		var obj= new _a();
 		singleFactor.aObejct=obj
 		return obj;
 	}
 }

