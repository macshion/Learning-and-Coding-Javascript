<!--
<template>
  <div class="home">
      <div class="btn btn-success" v-if="type == 'suc'">成功</div>
      <div class="btn btn-danger" v-else-if="type == 'danger'">危险</div>
      <div class="btn btn-waring" v-else>警告</div>
  </div>
</template>
 -->
<script>
export default {
    props:{
        type:{
            type:String,
            default:'normal'
        },
        text:{
            type:String,
            default:'normal'
        }
    },
    render(h){
        return h('div',{
            //与v-bind:class 一样
            class:{
                btn:true,
                'btn-success': this.type === 'success',
                'btn-danger': this.type === 'danger',
                'btn-waring': this.type === 'waring',
                'normal': !this.type,
            },
            //DOM属性
            domProps:{
                innerText:this.text ? this.text : '默认'
            },

            on:{
                click:this.handleClick
            }
        })
    },
    methods:{
        handleClick(){
            console.log('我是button的click方法');
        }
    }
   
   
}
</script>
<style scoped>
.btn{
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #ffffff;
}
.btn-success{
    background: green;
}
.btn-waring{
    background: orange
}
.btn-danger{
    background: red;
}
.normal{
    background: #ffffff;
    border: 1px solid #e0e0e0;
    color: black!important;
}
</style>
