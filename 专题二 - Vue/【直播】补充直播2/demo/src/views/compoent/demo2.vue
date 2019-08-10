<template>
  <div class="hello">
    <h1>我是demo2</h1>
    <formData
    :getData = "getData"
    :type="type"
    ></formData>
  </div>
</template>

<script>
import formData from './common/formData'
export default {
  name: 'demo2',
  data(){
    return{
      type:'demo2'
    }
  },
  components:{
      formData
  },
  methods:{
      getData(obj){
          console.log(obj);
      }
  }
}
</script>

