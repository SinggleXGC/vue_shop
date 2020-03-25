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
import VueQuillEditor from "vue-quill-editor/src";

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)

//配置请求的根路径
axios.defaults.baseURL='http://127.0.0.1:8888/api/private/v1/'
//config代表请求对象
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios

Vue.component('tree-table', TreeTable)

Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal);
  const y = dt.getFullYear();
  const m = (dt.getMonth() + 1 + '').padStart(2, '0');
  const d = (dt.getDate() + '').padStart(2, '0');
  const hh = (dt.getHours() + '').padStart(2, '0');
  const mm = (dt.getMinutes() + '').padStart(2, '0');
  const ss = (dt.getSeconds() + '').padStart(2,'0');

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
