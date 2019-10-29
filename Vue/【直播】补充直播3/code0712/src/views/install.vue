<template>
  <div class="home">
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'install',
  install(Vue,option){
      //添加全局一个属性
    Vue.$name = 'wilson';
    //添加全局的组件选项
     Vue.mixin({
         methods:{
             mixinFn(){
                 console.log('我是mixin方法')
             }
         }
     }) 
     //this.mixinFn()

     Vue.directive('focus',{
         bind:function(el){
             el.focus;
         }
     })
     Vue.prototye.$age = '18';
     Vue.prototye.$myMethods = val =>{
         console.log('55');
     }

  }  
}
</script>
