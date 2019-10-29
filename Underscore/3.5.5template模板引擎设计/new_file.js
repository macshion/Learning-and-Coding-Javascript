//渲染函数
function(obj){
	var _t,_p="";
	_p+=''+
	with(obj){
		
	}
	return _p;
}



(function anonymous(obj
) {
var _t,_p='';
with(obj){
_p+='\n		<ul class="list">\n          '+
obj.forEach(function(e, i, a){
_p+='\n           '+
 if (i === a.length - 1) 
_p+='\n            <li class="last-item">'+
((_t=(e.name)) == null?'': _t)+
'</li>\n           '+
 else 
_p+='\n            <li>'+
((_t=(e.name)) == null?'': _t)+
'</li>\n         '+
})
_p+='';}
return _p;

})