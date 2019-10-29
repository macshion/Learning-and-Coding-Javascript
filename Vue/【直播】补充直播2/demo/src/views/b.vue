<template>
  <div class="hello">
    <h1>我是b组件</h1>
    <input v-model="value" placeholder="我是组件b"/>
  </div>
</template>

<script>
export default {
  name: 'b',
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
}
</style>

