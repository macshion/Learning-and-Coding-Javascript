import axios from 'axios';

//获取token
function getTokenByLocal(){
    let token = sessionStorage.getItem('token') || '';
    return token
}

//C创建一个axios实例
const service = axios.create({
    baseURL:'/apply',   //api的baseurl
    timeout:5000    //请求超时时间
})

//request请求拦截器
service.interceptors.request.use(
    config =>{
        if(getTokenByLocal()){
            config.headers['token'] = getTokenByLocal();        //让每个请求携带自定义的token
            // config.headers['ContentType'] = 'application/from-data;charset=utf-8'    //后台接收参数的类型
        }
        return config
    },
    error =>{
       console.log(error) 
       Promise.reject(error)
    }
)

//response响应拦截器
service.interceptors.response.use(
    response =>{
        let res = response.data;
        if(res.code === 401){
            location.href = '/login';
        }
        // else if(res.code === 402){

        // }
        return Promise.resolve(response.data)
    },
    error =>{
        //进行提示 或者弹窗
        return Promise.reject(error);
    }
)

export default service