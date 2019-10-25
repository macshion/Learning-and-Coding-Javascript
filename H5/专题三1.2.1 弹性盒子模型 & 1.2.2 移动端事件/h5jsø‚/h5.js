(function (window){
    //提供给对外的接口
    function myMobile(selector){
        return myMobile.prototype._init(selector);
    }
    myMobile.prototype = {
        _init:function(selector){
            if(typeof selector === "string"){
                //查找的元素存入原型对象
                this.ele = window.document.querySelector(selector);
                //返回原型对象
                return this;
            }
        },
        //单击事件
        tap:function(handler){
            this.ele.addEventListener("touchstart",touchFn);
            this.ele.addEventListener("touchend",touchFn);

            let startTime,
                endTime;

                function touchFn(e){
                    e.preventDefault();
                    switch (e.type){
                        case "touchstart":
                             startTime = new Date().getTime() ;
                             break;
                        case "touchend":
                             endTime = new Date().getTime();
                             if(endTime - startTime < 500){
                                handler.call(this,e);
                             }  
                        break;     
                    }
                }
        },
        //长按事件
        longTap:function(handler){
            this.ele.addEventListener("touchstart",touchFn);
            this.ele.addEventListener("touchmove",touchFn);
            this.ele.addEventListener("touchend",touchFn);
            
            let time;

            function touchFn(e){
                switch (e.type){
                    case "touchstart": //500ms 
                        time = setTimeout(()=>{
                            handler.call(this,e);
                        },500)
                        break;
                    case "touchmove":
                        clearTimeout(time);
                        break;
                    case "touchend":
                        clearTimeout(time);
                        break;    
                }
            }

        },
        slideLeft:function(handler){
            this.ele.addEventListener("touchstart",touchFn);
            this.ele.addEventListener("touchend",touchFn);
            let startX, startY, endX, endY;
            function touchFn(e){
                console.log(e);
                //这里可以看到changedTouches
                e.preventDefault();
                let firstTouch = e.changedTouches[0];
                switch (e.type){
                    case "touchstart":
                        startX = firstTouch.pageX;  
                        startY = firstTouch.pageY; 
                        break;  
                    case "touchend": 
                        endX =  firstTouch.pageX;
                        endY =  firstTouch.pageY;
                        if(Math.abs(endX - startX) >= Math.abs(endY - startY) && startX -endX >= 20){
                            handler.call(this,e);
                        }
                        break;
                }
            }
        }
    }
    window.$ = window.myMobile = myMobile;
})(window)