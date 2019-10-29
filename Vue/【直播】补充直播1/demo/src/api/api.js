import axios from 'axios';

let error = function (){
    return () =>{};
}
/**
 * 
 * @param {*} url 接口地址
 * @param {*} params 参数
 * @param {*} callback 成功的回调
 * @param {*} errorCallback 失败的回调
 */

export default function postRequest(url,params,callback,errorCallback = error()){
    let hostUrl = 'test/'+url;  //测试环境
// let hostUrl = 'product/'+url;  //生产环境
    //发送请求
    axios.post(hostUrl,params)
    .then( res => {
        //与后台联通了
        let data = res.data;
        data.resCode ==  "000" && callback(data) || 
        data.resCode ==  "001" && alert("请联系产品经理");errorCallback(data) ||
        data.resCode ==  "002" && callback(data)||
        data.resCode ==  "100" && alert('请回去登录');
        setTimeout(()=>{
            window.localtion.href = '/login'
        },2000)
        
    })
    .catch( error => {
        alert(error);
    })
}