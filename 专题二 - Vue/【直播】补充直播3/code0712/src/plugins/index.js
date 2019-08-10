//插件的入口文件
import msg from './msg.vue'
import table from './table.vue'
let plugin = {}

plugin.install = function(Vue,options){
    //添加组件
    Vue.component(msg.name,msg);
    Vue.component(table.name,table);
}
export default plugin