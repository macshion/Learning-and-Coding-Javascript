<template>
  <div class="home">
    <h1>{{msg}}</h1>
    <input placeholder="请输入值" v-model="value"/>
    <button @click="submit">提交</button>
    <vue-msg ref="msg"></vue-msg>
    <v-table
    :datas = "tableData"
    :thLabel = "thLabel"
    ></v-table>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {

  },
  data(){
    return{
      msg:'大家晚上好',
      value:null,
        tableData:[
            {'a':'1','b':'2','c':'3','d':'8'},
            {'a':'4','b':'5','c':'6','d':'9'}
        ],
        thLabel:[
            [
                {prop:'a',label:'th[1][1]',rowspan:'2'},
                {label:'th[1][2]',colspan:'2'},
                {label:'th[1][3]'}
            ],
            [
                {prop:'c',label:'th[2][1]'},
                {prop:'b',label:'th[2][2]'},
                {prop:'d',label:'th[2][3]'}
            ]
        ]
    }
  },
  methods:{
    submit(){
      if(!this.value){
        this.$nextTick(()=>{
          this.$refs.msg.msgPlugin('值不能为空',500)
        })
        // alert('请填写值')
      }
    }
  }
}
</script>
