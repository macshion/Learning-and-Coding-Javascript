export default{
    path:'/index',
    name:'Index',
    component:()=> import(/*webpackChunkName:"index"*/'../views/index/index.vue'), //把相同的模块打入一个chunk(块)
    children:[
        
    ],
    meta:{
        //自定义字段
        requireAuth:true
    }
}