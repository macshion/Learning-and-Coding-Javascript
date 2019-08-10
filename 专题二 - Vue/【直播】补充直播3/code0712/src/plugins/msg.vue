<template>
    <div>
        <div class="msg"  ref="msg" :class="{active:msgStatus}">
            <div class="msg-warpper">
                {{text}}
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'vue-msg',
  data(){
    return{
      text:'',
      msgStatus:false,
    }
  },
  methods:{
      msgPlugin ( msg , time){
          this.text = msg;
          this.msgStatus = true;
          !time ? time = 2000 : time = time;
          setTimeout(()=>{
              this.msgStatus = false;
          },time)
      }
  }
}
</script>
<style scope>
.msg{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 0px;
    min-height: 0px;
    text-align: center;
    border-radius: 5px;
    background: black;
    color: #FFF;
    transition: all 0.5s;
    z-index: -1;
    opacity: 0;
}
.msg.active{
    width: 150px;
    min-height: 25px;
    opacity: 1;
    z-index: 11;
}
</style>
