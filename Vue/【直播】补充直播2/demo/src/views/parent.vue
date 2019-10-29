<template>
  <div class="hello">
    <h1>我是父组件</h1>
    <keep-alive :include="keep">
        <router-view :router-click="routerClick"></router-view>
    </keep-alive>
    <p @click = "routerClick('/parent/child1','child1')">跳转child1</p>
    <p @click = "routerClick('/parent/child2','child2')">跳转child2</p>
    <P><button @click="routerRemove('child1')">移除child1的缓存</button></P>
  </div>
</template>

<script>
export default {
  name: 'parent',
  data(){
    return{
        keep:[]
    }
  },
  methods:{
      routerClick(routerName,name){
          let router = {
              path:routerName,
              name:name,
            //   params:{}
          }
          this.$router.push(router);
          if(this.keep.indexOf(name) == -1){
              this.keep.push(name);
          }
          console.log(this.keep);
      },
      //移除缓存
      routerRemove(name){
         this.keep.splice(this.keep.indexOf(name),1); 
         console.log(name);
      }
      
  }
}
</script>
<style scope>

</style>

