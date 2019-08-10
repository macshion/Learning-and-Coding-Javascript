<template>
  <div class="hello">
      {{msg}}
  </div>
</template>

<script>
import {queryGoods} from '../api/shop'
export default {
  name: 'demo',
  props: {
   // msg: "大家晚上好"
  },
  data(){
      return{
          msg: "大家晚上好"
      }
  }
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
