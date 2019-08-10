<template>
  <div class="hello">
        <h1>相亲简历</h1>
        <p>姓名:<input v-model="name"/></p>
        <p>年龄:<input  v-model="age"/></p>
        <p>漂亮否:
            <input type="radio" v-model="isBeaut" name="isBeaut" value="1">漂亮<br/>
            <input type="radio" v-model="isBeaut" name="isBeaut" value="2">不漂亮
        </p> 
        <p v-if="type == 'demo1'">学历：<input /></p>
        <p><button @click="submit">提交</button></p>

  </div>
</template>

<script>
export default {
  name: 'demo1',
  props:['getData','type'],
  data(){
    return{
        name:null,
        age:null,
        isBeaut:null,
        isShow:false
    }
  },
  methods:{
      submit(){
          let obj = {
              name:this.name,
              age:this.age,
              isBeaut:this.isBeaut
          }
          this.getData(obj)
          console.log(this.type);
      },
      changeStatus(){
          this.isShow = !this.isShow;
      }
  }
}
</script>

