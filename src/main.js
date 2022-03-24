import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'

//定义全局组件：在入口文件注册一次之后，在任何组件当中都可以使用
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'

//引入自定义插件
import myPlugins from '@/plugins/myPlugins'
Vue.use(myPlugins,{
  name:'upper'
})

//引入element ui
import {Button, MessageBox} from 'element-ui'

//引入表单校验插件
import '@/plugins/validata'

import router from './router'
import store from './store'
Vue.use(VueRouter)

//统一引入
import * as API from '@/api'

//注册全局组件：第一个参数：组件名字，第二个参数：组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)

Vue.component(Button.name, Button);
//ElementUI注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert


//懒加载
import VueLazyload from 'vue-lazyload'
import loading from '@/assets/1.gif'
Vue.use(VueLazyload, {
  loading
})

//引入MockServer.js----mock数据
import '@/mock/mockServe'

//引入swiper样式
import 'swiper/css/swiper.css'
// import 'swiper/dist/css/swiper.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //全局事件总线$bus配置
  beforeCreate(){
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  router,
  store,
}).$mount('#app')
