import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import "./axios"
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import './permission'// 路由拦截
Vue.config.productionTip = false
Vue.prototype.$axios=axios

Vue.use(ElementUI)
Vue.use(mavonEditor)
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
