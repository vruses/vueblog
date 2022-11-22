import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import './styles/element-variables.scss'
import 'font-awesome/css/font-awesome.min.css'
import './utils/filter_utils.js'
Vue.use(ElementUI)
Vue.config.productionTip = false//阻止vue生成production提示
window.bus = new Vue();//vue2中vue的实例化形式
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
