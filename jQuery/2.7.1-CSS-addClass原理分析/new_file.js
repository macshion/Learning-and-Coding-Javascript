
//-ms-border..   ms-border..
string.replace(/^-ms-/, "ms-")

/-([\da-z])/gi   提取出来   ms-border  (b)   font-size   (s)

//子表达式
replace(/-([\da-z])/gi);

//匹配的字符  S B        S    B
function(context, first) {
	return first.toUpperCase();
}

//-s  ()  子表达式  s   fontSize
"font-size".replace(/-([\da-z])/gi,function(context, first){
	//context   -s
	//first    s
	return s.xxxx();   //S
});