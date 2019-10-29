<template id="vTable">  
    <table>
        <thead>
            <tr class="thTr" v-for="(tr,index) in rownum" :key="index">
                <th v-for="(th,index) in thLabel[index]" :key="index">{{th.label}}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(tr,index) in datas" :key="index">
                <td v-for="(td,index) in labelProp" :key="index">
                    {{tr[td]}}
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default{
        name:"v-table",
        props:{
            datas:{ //内容数组
                type:Array
            },
            thLabel:{   //表头数组
                type:Array
            }
        },
  
        computed:{
            rownum:function(){  //表头行数
                return this.thLabel.length;
            },
            labelProp:function(){   //获取对象字段的key
                let thLabel = this.thLabel;
                let labelArr = [];
                for(let i = 0,len = thLabel.length; i<len; i++) //拿到每一行
                    for(let j = 0; j < thLabel[i].length; j++){ //拿到每一个th对象
                        for (const key in thLabel[i][j]) {  //循环th对象 拿到key
                           if(key == 'prop'){
                             labelArr.push(thLabel[i][j][key])
                           }
                        }
                    }
                
                return labelArr;
            }
        },
        mounted:function(){
            this.$nextTick(function(){
                let thLabel = this.thLabel;
                let thTr = document.getElementsByClassName('thTr'); //所有表头的dom
                for(let i = 0,len = thLabel.length; i<len; i++){    
                    for(let j  = 0; j < thLabel[i].length; j++){
                        for (const key in thLabel[i][j]) {
                           key == 'rowspan' && thTr[i].childNodes[j].setAttribute('rowspan',thLabel[i][j][key]);
                           key == 'colspan' && thTr[i].childNodes[j].setAttribute('colspan',thLabel[i][j][key]);
                        }
                    }
                }
            })
        }   
    }
</script>
<style scope>
table {
  border: 1px solid #EBEEF5;
  height: 200px;
  width: 300px;
  text-align: center;
  margin-left: 40px; 
}
table td {
    border: 1px solid #EBEEF5;
    position: relative;
    color: #606266; 
}
table th {
    text-align: center;
    border: 1px solid #EBEEF5;
    background-color: #F5F7FA;
    color: #909D8F;
    line-height: 60px; 
}

</style>