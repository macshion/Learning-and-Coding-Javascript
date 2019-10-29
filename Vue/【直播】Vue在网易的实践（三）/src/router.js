import Vue from 'vue'
import Router from 'vue-router'
// import Login from './router/login.routes'
// import Home from './views/Home.vue'
// import Login from './views/login/login.vue'
import Index from './views/index/index.vue'
Vue.use(Router)
//
const subRoutesList = [];
function importAll(r){
  r.keys().forEach((key) => subRoutesList.push(r(key).default));
}
importAll(require.context('.',true,/\.routes\.js/));
const routes = [
  //{  
    // path:'/index',
    //   name:'index',
    //   component:Index,
    //   children:[
  
    //   ],
    //   meta:{
    //     requireAuth:true
    //   }
  //},
  ...subRoutesList,
  {path:'*',component:Index}
]

//进阶的写法
// const routes = [
//   {
//     path:'/index',
//     name:'index',
//     component:Index,
//     children:[

//     ]
//   },
//   Login,
//   {path:'*',component:Index}
// ]
export default new Router({
  mode:'history',
  routes:routes
  // routes: [
  //   {
  //     path: '/',
  //     name: 'home',
  //     component: Home
  //   },
  //   {
  //     path: '/login',
  //     name: 'login',
  //     component: Login
  //   },
  //   {
  //     path: '/index',
  //     name: 'index',
  //     component: Index
  //   },
  //   {
  //     path: '/about',
  //     name: 'about',
  //     // route level code-splitting
  //     // this generates a separate chunk (about.[hash].js) for this route
  //     // which is lazy-loaded when the route is visited.
  //     component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
  //   }
  // ]
})
