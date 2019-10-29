<template>
  <div class="con">
      <div class="main">
         <h2>网易云计算基础服务</h2>
         <div>
             <label>账号 : </label>
             <el-input 
                v-model="user.userName"
                placeholder="请输入账号"
                v-focus
                >

             </el-input>
         </div>
          <div>
             <label>密码 : </label>
             <el-input type="password" 
                v-model="user.passWord"
                placeholder="请输入密码">

             </el-input>
         </div>
          <div class="verify">
             <label>验证码 : </label>
             <el-input 
                v-model="user.verifyCode"
                placeholder="验证码"
             >

             </el-input>
             <span class="verifySpan" @click="refreshVerifyCode()">
                {{verifyText}}
             </span>
         </div>
         <div>
             <label>记住我 : </label>
             <span class="remember-span">
                <el-radio v-model="user.rememberMe" label="1">是</el-radio>
                <el-radio v-model="user.rememberMe" label="2">否</el-radio>
             </span>
             <p><el-button @click="login">登录</el-button></p>
         </div>
        
      </div>
  </div>
</template>

<script>
import url from '../../requet/apiUrl'
import {postRequest} from '../../api/api'
export default {
  name: 'login',
  data(){
      return{
          user:{
            userName:null,  
            passWord:null,
            verifyCode:null,
            rememberMe:'1'
          },
          verifyText:"验证码",
          userValue:[],
          errorMsg: [
            '请输入账号',
            '请输入密码',
            '请输入验证码'
          ],
      }
  },
  directives:{
      focus:{
        inserted:(el) => {
            let input = el.querySelector('input');
            input.focus();
        },
        update:(el) => {
            //input
            let valDom = el.querySelector('input');
            //input value
            let value = valDom.value;
            let span = document.createElement('span');
            span.innerText = '限制6位';
            span.className = 'limt-span-userName';
            let spanDom = el.querySelector('span');
            if(value.length > 6){
                valDom.style.border = '1px red solid';
                !spanDom && el.appendChild(span);
            }else{
                valDom.style.border = '1px #DCDFE6 solid';
                spanDom && el.removeChild(spanDom);
            }
        }
      }
  
  },
  methods:{
      async login(){
            //   let obj = 
         this.userValue = [];
         this.userValue.push(this.user.userName);
         this.userValue.push(this.user.passWord);
         this.userValue.push(this.user.verifyCode);
          for(let i = 0,len = this.userValue.length; i < len; i++){
                let val = this.userValue[i];
                if (!val) {
                    this.$message.warning(this.errorMsg[i]);
                    this.refreshVerifyCode();
                    return;
                }
          }
          if (this.verifyText.toUpperCase() != this.user.verifyCode.toUpperCase()) {
              this.$message.warning('验证码错误');
              this.verifyText = null;
              this.refreshVerifyCode();
              return; 
          }
            let {userName,passWord} = this.user;
            let params = {
                userName,
                password:passWord
            }
          //登录的接口
            //then
            // postRequest(url.loginUrl,params).then(res => console.log(res));
            //es7 会有一个弊端 当请求发生错误的时候 不会执行下面的代码
            try{
                let loginData = await postRequest(url.loginUrl,params);
                if(loginData.code == "200"){
                    this.user.rememberMe == '1'?
                    this.setCookie(this.user.userName,this.user.passWord,this.user.rememberMe,10):
                    this.clearCookie(this.user.userName,this.user.passWord,this.user.rememberMe);
                    //
                    sessionStorage.setItem('token',loginData.data.token);
                    this.$message.success('登录成功!');
                    setTimeout(()=>{
                        this.$router.push('/index');
                    },1000)
                }
            }
            catch(error){
                console.log('登录失败',error);
            }
            // let {userName,passWord,rememberMe} = this.user;

           
            // if
        //   loginApi(params,(data)=>{
        //       console.log(data);
        //   });
       },

       setCookie(userName,passWord,rememberMe,exDays){
           let exDate = new Date(); //获取时间
           exDate.setTime(exDate.getTime() + 24*60*60*exDays);  //保存的时间
           window.document.cookie = "userName" + "=" + userName + ";" + exDate.toGMTString();
           window.document.cookie = "passWord" + "=" + passWord + ";" + exDate.toGMTString();
           window.document.cookie = "rememberMe" + "=" + rememberMe + ";" + exDate.toGMTString();
       },
       //清除cookie
       clearCookie(){
           this.setCookie("","",'2',-1)
       },
       getCookie(){
           let cookieVal = document.cookie;
           if(cookieVal.length > 0){
               let arr = cookieVal.split('; ');
               for(let i = 0,j = arr.length;i < j; i++){
                   let arrVal = arr[i].split('=');
                   arrVal[0] == 'userName' ? 
                   this.user.userName = arrVal[1] : 
                   arrVal[0] == 'passWord' ? 
                   this.user.passWord = arrVal[1] : 
                   this.user.rememberMe = arrVal[1]
               }
           }
       },
    //   生成(刷新)验证码
      refreshVerifyCode(){
          let code = '';
          //验证码长度
          let verifyCodeLength = 4;
          //随机数
          let random = new Array(2, 3, 4, 5, 6, 7, 8, 9, 
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R',
            'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'h', 'i', 
            'j', 'k', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
          ); 
          for (let i = 0; i < verifyCodeLength; i++) {
            let charIndex = Math.floor(Math.random() * random.length); //取得随机数的索引
            code += random[charIndex];  //根据索引取得随机数加到code上
          }
          this.verifyText = code;
        //   this.user.verifyCode = code;
      },
  },
  created(){
      this.getCookie();
      this.refreshVerifyCode();
  }
}
</script>
<style lang="scss">

 
.con{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #1989fa;
    opacity: 0.6;
    .main{
        width: 500px;
        height: 400px;
        margin: 50px auto 0 auto;
        background: #fff;
        border-radius: 5px;
        padding: 10px 0;
        div{
            position: relative;
            margin-bottom: 10px;
            .limt-span-userName{
                position: absolute;
                color: red;
                transition: all 0.3s;
                font-size: 14px;
                right: -10px;
                top: 8px;
            }
            .el-input {
                width:300px!important;
            }
            .el-input__inner {
                width:200px!important;
            }

            label{
                display: inline-block;
                width: 100px;
                text-align: right;
            }
            .remember-span{
                display: inline-block;
                width: 250px;
                padding-left: 50px;
                text-align: left;
                label{
                    width:40px;
                }
            }
        }
        .verify{
            position: relative;
            .el-input{
                text-align: left;
            }
            .el-input__inner {
                width:100px!important;
                margin-left: 50px;
            }
            .verifySpan{
                display: inline-block;
                position: absolute;
                vertical-align: middle;
                height: 40px;
                width: 80px;
                border-radius: 5px;
                border: 1px solid #C0C4CC;
                right: 100px;
                bottom: 10px;
                cursor: pointer;
                line-height: 40px;
                text-align: center;
            }
        }
    }
}

</style>
