import {postRequest} from './api'

export function loginApi(params,callback){
    postRequest('/apply/login',params,callback)
}