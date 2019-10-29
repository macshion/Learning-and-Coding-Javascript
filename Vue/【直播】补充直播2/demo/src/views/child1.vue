<template>
  <div class="hello">
    <h1>我是子路由child1</h1>
    <input v-model="value" placeholder="我是子路由child1"/>
    {{text}}
    <button @click="update">更新</button>
  </div>
</template>

<script>
export default {
  name: 'child1',
  data(){
    return{
        value:null,
        text:null
    }
  },
  //进入
  activated(){
      console.log('我进入了这个组件');
  },
  updated(){
    console.log('我被更新了');
  },
  //离开
  deactivated(){
    console.log('我离开了这个组件');
  },
  methods:{
      update(){
          this.text = '666';
      }
  }
//   destroyed(){
//       console.log('销毁了');
//   },
//   created(){
//       console.log('创建完成');
//   },
//   mounted(){
//      console.log('加载完成');
//   }
}
</script>
<style scope>
.hello{
  width: 200px;
  height: 200px;
  padding: 10px;
  background: blanchedalmond;
}
</style>

