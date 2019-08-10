<template>
  <div class="hello">
    <h1>我是demo1</h1>
    <formData
    ref="formData"
    :getData = "getData"
    :type = "type"
    ></formData>
    <p><button @click="showCompoent">展示formData</button></p>
  </div>
</template>

<script>
import formData from './common/formData'
export default {
  name: 'demo1',
  data(){
    return{
        type:'demo1'
    }
  },
  components:{
      formData
  },
  methods:{
      getData(obj){
          console.log(obj);
      },
      showCompoent(){
          this.$refs.formData.changeStatus();
      }
  }
}
</script>

