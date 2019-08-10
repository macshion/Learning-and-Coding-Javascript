import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

//路由拦截
let a = 2;  //一般在缓存里面（登录用户数据） vuex(store)
router.beforeEach(( to, from, next)=>{
  if(to.meta.requireAuth){    //判断此路由需要登录权限
    if(a == 2){
      next();
      console.log('我进入了此路由');
    }else{  //没有登录的时候
      next({
        path:'/',  
        query:{redirect: to.fullPath}
      })
    }
  }else{  //直接跳 不需要验证
    next();
  }
})

// axios 拦截
//超时时间
// Axios.defaults.timeout = 3000;
// //添加一个请求拦截器
// axios.inteceptors.request.use((config)=>{
//   //发送之前做些什么
//   return config;

// },(error)=>{
//   //请求错误的时候做些什么
//   alert('请求错误');
//   return Promise.reject(error);
// })

// //移除拦截器
// let intercep = axios.inteceptorsuse((config)=>{

// });

// axios.inteceptors.request.eject(intercep);