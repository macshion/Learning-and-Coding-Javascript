<template>
  <div class="home">
  <Button
  :type = "type"
  :text = "texts"
  ></Button>
  </div>
</template>

<script>
// @ is an alias to /src
import Button from './button.vue'
export default {
  name: 'render',
  components: {
      Button
  },
  data(){
      return{
          type:null,
          texts:null
      }
  }  
}
</script>
