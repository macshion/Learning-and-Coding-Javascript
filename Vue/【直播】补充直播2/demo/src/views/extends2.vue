<template>
  <div class="hello">
    <h1>组件的继承,继承方法</h1>
    {{text}}
  </div>
</template>

<script>
//继承了钩子函数
const extend = {
   data(){
     return{
       text:'我是extend'
     }
   }
}
const mixin = {
  data(){
    return{
       text:'我是mixin'
    }
  }
}
const mixin2 = {
  data(){
    return{
       text:'我是mixin'
    }
  }
}
//mixins 可以混入多个mixin，extends只能继承一个
//mixins类似于面向切面的编程 （AOP） extends类似于面向对象的编程
//vue.extend>extends>minxins    //优先级
export default {
  name: 'extends',
  mixins:[mixin,mixin2],
  extends:extend,

  data(){
    return{
      value:null
    }
  },
  created(){
      console.log('created');
  }
}
</script>

