import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
//导入全局样式
import './assets/css/global.css'
//导入element配置文件
import '@/plugins/element'
//导入element样式
import 'element-ui/lib/theme-chalk/index.css'
//导入第三方图标
import './assets/fonts/iconfont.css'
//导入axios
import axios from 'axios'
import TreeTable from 'vue-table-with-tree-grid'

//配置请求的根路径
axios.defaults.baseURL='http://127.0.0.1:8888/api/private/v1/'
//config代表请求对象
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios

Vue.component('tree-table', TreeTable)


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
