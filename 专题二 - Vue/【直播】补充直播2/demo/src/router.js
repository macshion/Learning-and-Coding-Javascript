import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import KeepDemo from './views/keepDemo.vue'
import Parent from './views/parent.vue'
import Child1 from './views/child1.vue'
import Child2 from './views/child2.vue'
import Extends from './views/extends.vue'
import Extends2 from './views/extends2.vue'
import Demo1 from './views/compoent/demo1.vue'
import Demo2 from './views/compoent/demo2.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/keepDemo',
      name: 'keepDemo',
      component: KeepDemo
    },
    {
      path: '/demo1',
      name: 'demo1',
      component: Demo1
    },
    {
      path: '/demo2',
      name: 'demo2',
      component: Demo2
    },
    {
      path: '/extends',
      name: 'extends',
      component: Extends
    },
    
    {
      path: '/extends2',
      name: 'extends2',
      component: Extends2
    },
    {
      path: '/parent',
      name: 'parent',
      component: Parent,
      children:[
        {
          path: '/parent/child1',
          name: 'child1',
          component: Child1
        },
        {
          path: '/parent/child2',
          name: 'child2',
          component: Child2
        },
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
