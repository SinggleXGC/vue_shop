import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
//导入全局样式
import './assets/css/global.css'
//导入element配置文件
import '@/plugins/element'
//导入element样式
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
