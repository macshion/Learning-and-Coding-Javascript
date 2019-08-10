<template>
  <div class="hello">
    <h1>我是a组件</h1>
    <input v-model="value" placeholder="我是组件a"/>
  </div>
</template>

<script>
export default {
  name: 'a',
  data(){
    return{
      value:null
    }
  }
}
</script>
<style scope>
.hello{
  width: auto;
  height: auto;
  padding: 10px;
  background: blanchedalmond;
}
</style>

