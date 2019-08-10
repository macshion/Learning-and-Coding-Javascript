import {postRequest} from './api'

//查询商品
export function queryGoods(callback,parms){
    postRequest('/queryGoods',parms,callback);
}