import Vue from 'vue'
import { 
    Button,
    Input,
    Message,
    Radio, 
    Menu,
    Submenu,
    MenuItem,
    Icon,
    Autocomplete,
    //轮播图
    Carousel,
    CarouselItem,
    
    MessageBox,
    Loading,
    //下面是tab
    Tabs,
    TabPane,
} from 'element-ui'

Vue.use(Button);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Icon);
Vue.use(Autocomplete);
Vue.use(Input);
Vue.use(Radio);
Vue.use(Tabs);
Vue.use(TabPane);

Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$message = Message;