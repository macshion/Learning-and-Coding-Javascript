<template>
  <div class="container">
    <div class="main-con">
        <div class="head-con">
            <div class="top-one line-bottom">
                <div class="top-one-child">
                    <img class="log" src="../../assets/img/logo3.png"/>
                    <div class="opration">
                        <el-button type="text" class="login" @click = "openLogin()">登录</el-button>
                        <el-button class="logon" type="primary">注册有礼</el-button>
                    </div>
                </div>
            </div>    
            <div class="top-one top-two">
                <div class="top-one-child">
                    <el-menu
                        :default-active="activeIndex"
                        class="el-menu-demo"
                        mode="horizontal"
                        @select="handleSelectMenu"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b">
                        <el-menu-item v-for = "(item,index) in menuList" index="1" :key="index"
                            @mouseenter.native="showType(index)"
                            @mouseleave.native="hiddenType(index)">{{item.name}}</el-menu-item>
                    </el-menu>
                </div>  
                <div :class="isShow ? 'type-detail type-detail-show':'type-detail type-detail-hidden'">
                    <div class="ul-con">
                        <ul>
                            <li v-for = "(item,index) in menuListChild" :key="index">
                              {{item}}
                            </li>
                        </ul>
                    </div>
                </div>  
            </div>
        </div>
        <div class="banner-con">
            <div class="pic-con">
                <el-carousel trigger="click" height="360px">
                    <el-carousel-item v-for="item in imgList" :key="item.id">
                        <img class="banner-img" :src="item.src"/>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
        <div>
          <el-tabs v-model="activeName" type="card" @tab-click="handleClickTab">
            <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
            <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
            <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
          </el-tabs>
        </div>
        <div class="btn-con">
          <el-button type="primary" v-display-key="'5'">我是a权限</el-button>
          <el-button type="primary" v-display-key="'4'">我是c权限</el-button>
          <el-button type="primary" v-display-key="'10'">我是b权限</el-button>
          <p class="demo-sass">测试sass全局引入</p>
        </div>
    </div>
  </div>
</template>

<script>
import url from '../../requet/apiUrl'
import {postRequest} from '../../api/api'
// import { getList } from '../api/index'
export default {
  name: "index",
  data() {
    return {
      msg: "msg页面",
      activeIndex: null,
      obj:{
        a:'这是obj的a属性'
      },
      activeName: 'first',
      searchHead:null,
      demo:null,
      nav: [
        {
          name: "微服务",
          id: 1,
          types: [
            { childName: "11", id: 11, childType: [1, 2, 3] },
            { childName: "11", id: 11, childType: [1, 2, 3] }
          ]
        }
      ],
      imgList: [
        { id: 1, src: require("../../assets/img/banner1.jpeg") },
        { id: 2, src: require("../../assets/img/banner2.jpeg") },
        { id: 3, src: require("../../assets/img/banner3.jpeg") }
      ],
      menuList:[],
      menuListChild:[],
      restaurants: [],
      state: "",
      isShow:false
    };
  },
  created(){
    this.getList();
    // this.$message('666');
  },
  //一对多 watch （观察者）
  //多对一 computed （计算） 1，1 2 缓存性
  //methods (方法)
  computed:{
  
  },
  methods: {
    async getList(){
      try{
        let listData = await postRequest(url.getMenuList,{});
        this.menuList = listData.data;
      }
      catch(error){
        console.log(error);
      }
    },
   handleClickTab(tab,event){
      console.log(tab, event);
   },
    handleSelectMenu(key, keyPath) {
      console.log(key, keyPath);
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    handleIconClick(ev) {
      console.log(ev);
    },
    //展示细分类
    showType(index) {
        this.isShow = true;
        this.menuListChild = this.menuList[index].children;
    },
    openLogin() {
        
    },
    hiddenType(type){
        this.isShow = false;
    }
  },
  mounted() {
    // this.restaurants = this.loadAll();
  }
};
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  .main-con {
    width: 100%;
    // margin: 0 auto;
    // min-width: 1200px;
    height: 100%;
    // 2px solid #387ee8
    .el-menu--horizontal > .el-menu-item.is-active,
    .el-menu--horizontal > .el-menu-item:hover {
      border-bottom: 2px solid #409eff !important;
      color: #409eff !important;
    }

    .head-con {
      width: 100%;
      margin: 0 auto;
      position: fixed;
      transition: all 0.3s;
      top: 0;
      left: 0;
      z-index: 99;
      // width: 1200px;
      // margin: 0 auto;

      .el-menu.el-menu--horizontal {
        background: none !important;
        li {
          background: none !important;
        }
        border: none;
      }
      .line-bottom {
        transition: all 0.3s;
        border-bottom: 1px solid #2b2f33;
      }
      .top-two {
        position: relative;
      }
      .top-one {
        // z-index: 10;
        width: 100%;
        .top-one-child {
          width: 1200px;
          margin: 0 auto;
          text-align: left;
          .log {
            margin-left: 14px;
          }
          .opration {
            float: right;
            height: 45px;
            width: 500px;
            text-align: right;
            .el-autocomplete{
              .el-input{
                .el-input__inner{
                  background: rgba(46,51,64,.5)!important;
                }
              }
            }
            button:first-child {
              color: white;
              margin-right: 5px;
            }
            button:first-child:hover {
              color: #66b1ff;
            }
            button:last-child {
              margin-top: 2px;
            }
          }
        }
         .type-detail {
            transition: all 0.3s;
            position: absolute;
            width: 100%;
            top: 60px;
            background: rgb(31, 34, 41);
            z-index: -1;
            overflow: hidden;
            .ul-con{
                width: 1200px;
                margin: 0 auto;
                ul{
                    margin: 0;
                    li{
                        display: inline-block;
                        width: 186px;
                        text-align: left;
                        float: left;
                        margin-right: 40px;
                        margin-top: 15px;
                        padding-left: 14px;
                        color: white;
                        opacity: 0.6;
                        font-size: 14px;
                    }
                }
            }
          }
          .type-detail-hidden{
               height: 0;
          }
          .type-detail-show{
             height: 200px;
          }
      }
    }
    .head-con:hover {
      background: #242a37;
      .line-bottom {
        border-bottom: 1px solid #6c6c6c;
      }
    }
    .banner-con {
      width: 100%;
      height: 500px;
      .pic-con {
        .el-carousel__item:nth-child(2n) {
          background-color: #99a9bf;
        }

        .el-carousel__item:nth-child(2n + 1) {
          background-color: #d3dce6;
        }
        .banner-img {
          width: 100%;
          height: 360px;
        }
      }
    }
    .btn-con{
      margin-top: 50px;
      .demo-sass{
        @include fontColor
      }
    }
  }
}
</style>
