//校验权限的方法
export function checkArray(key){
    //权限数组
    let arr = ['1','2','3','4'];
    let index = arr.indexOf(key)
    if(index > -1){
        //找到了
        return true;
    }else{
        return false;
    }
}