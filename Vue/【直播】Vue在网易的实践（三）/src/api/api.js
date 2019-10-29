// import axios from 'axios';

// let error  = function (){
//   return () =>{};
// }
// export function postRequest(url,parms,callback,errorCallback = error()){
//   axios.post(url,parms)
//   //成功的情况
//   .then(res => {
//     let data = res.data;
//     // if(data.code == '000'){
//       callback(data);
//     // }else if(data.code == '001'){
//       // errorCallback();
//     // }
//   })
//   .catch(error =>{
//     alert('请找产品');
//   })
// }

import requestOfPost from '../requet/common'

export function postRequest(url,data){
  return new Promise((resolve,reject)=>{
    requestOfPost(url,data).then(res => resolve(res))
    .catch(error => reject(error))
  })
}
