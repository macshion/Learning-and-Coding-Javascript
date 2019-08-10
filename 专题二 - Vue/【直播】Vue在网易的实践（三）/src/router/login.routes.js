// import Login from '../views/login/login.vue'
export default{
    path:'/login',
    name:'login',
    component:()=> import(/*webpackChunkName:"login"*/'../views/login/login.vue'), //把相同的模块打入一个chunk(块)
    children:[
        
    ]
}