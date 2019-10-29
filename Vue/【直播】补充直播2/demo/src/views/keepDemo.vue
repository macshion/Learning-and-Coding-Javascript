<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <keep-alive :exclude="noKeep">
      <A v-if="status"></A>
      <B v-else></B>
    </keep-alive>
    <p><button @click="changeStatus">切换status</button></p>
  </div>
</template>

<script>
import A from './a'
import B from './b'
export default {
  name: 'keepDemo',
  data(){
    return{
      msg:'大家晚上好',
      status:true,
      keep:['a'],
      noKeep:['b'],
    }
  },
  components:{
    A,
    B
  },
  methods:{
    changeStatus(){
      this.status = !this.status;
    }
  }
}
</script>

