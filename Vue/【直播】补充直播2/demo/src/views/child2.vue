<template>
  <div class="hello">
    <h1>我是子路由child2</h1>
    <input v-model="value" placeholder="我是子路由child2"/>
  </div>
</template>

<script>
export default {
  name: 'child2',
  data(){
    return{
        value:null
    }
  }
}
</script>
<style scope>
.hello{
  width: 200px;
  height: 200px;
  padding: 10px;
}
</style>

