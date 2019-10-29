import test from  "./test.less";
import test2 from "./test2.less";
import $ from 'jquery';
$.ajax({
	url:"/smartSpec/qd",
	type:'get',
	success:function(res){
		console.log(res);
	}
});
var i=0;
document.getElementById('mydiv').setAttribute('class',test2.div1);
console.log(j.a);