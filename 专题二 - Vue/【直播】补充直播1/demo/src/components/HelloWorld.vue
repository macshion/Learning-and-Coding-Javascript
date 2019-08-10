<template>
  <div class="hello">
    <p v-changeColor = "'blue'">我是一个大帅哥</p>
    <input placeholder="获取焦点" v-focus/>
    <!-- <div v-font = "{name:'xiaoming',text:'大家幸苦了'}"></div> -->
    <div v-font:ddd.a.b.v.c = "msg2"></div>
  </div>
</template>

<script>
import {queryGoods} from '../api/shop'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods:{
    query(){
      let id = 2;
      queryGoods(parms,(res)=>{
        console.log(res.data);
        //do something
      })
    }
  },
  data(){
    return {
      msg2:'hello'
    }
  },
  directives:{
    // changeColor:{
    //   //初始的时候
    //   bind:(el,binding)=>{
    //     el.style.color = "green";
    //   }
    // },
    //直接改变
    changeColor:(el,binding)=>{
      el.style.color = binding.value;
    },
    focus:{
      inserted:function(el){
        el.focus();
      }
    },
    font:{
      bind:(el,binding,vnode)=>{
        let b = JSON.stringify;
        el.innerHTML = 
        '<p>name: '+b(binding.name)+'</p>'+
        '<p>value:'+b(binding.value)+'</p>'+
        '<p>expression:'+b(binding.expression)+'</p>'+
        '<p>arg:'+b(binding.arg)+'</p>'+
        '<p>modifiers:'+b(binding.modifiers)+'</p>'
      }
    }
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
