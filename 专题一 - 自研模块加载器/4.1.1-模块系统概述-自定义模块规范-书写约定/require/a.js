define(["b"],function(b){
    console.log(b)
    var Hello = function(){
        console.log("hello work")
    };
    return{//借口对象
        Hello:Hello
    }
})