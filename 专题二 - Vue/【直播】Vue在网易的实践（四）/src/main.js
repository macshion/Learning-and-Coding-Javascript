import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import {checkArray} from './common/array'
Vue.config.productionTip = false

//路由拦截
let token = sessionStorage.getItem('token');
router.beforeEach((to,from,next)=>{
  if(to.meta.requireAuth){  //为true 需要通过验证才能跳入
    if(token){
      next();
      console.log('我进入了路由');
    }else{
      next({
        path:'/login'
      })
    }
  }else{
    next();
  }
})
//自定义指令配置权限
Vue.directive('display-key',{
  inserted(el,binling){
    let displayKey = binling.value;
    if(displayKey){
      let isHas = checkArray(displayKey);
      //没有权限
      if(!isHas){
        el.parentNode && el.parentNode.removeChild(el); 
      }
    }else{
      throw new Error('你应该添加display-keep')
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
