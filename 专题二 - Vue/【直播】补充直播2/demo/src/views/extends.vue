<template>
  <div class="hello">
    <h1>组件的继承</h1>
  </div>
</template>

<script>
//继承了钩子函数
const extend = {
    created(){
        console.log('extend的创建');
    }
}
const mixin = {
    created(){
        console.log('mixin的创建');
    }
}
export default {
  name: 'extends',
  extends:extend,
  mixins:[mixin],
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

