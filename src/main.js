// 导入vue
import Vue from 'vue'
// 导入主组件
import App from './App.vue'
// rem插件
import 'amfe-flexible'
// 导入样式
import './styles/common.less'
import './styles/iconfont.less'
// 导入路由配置文件
import router from './router/index.js'
// 按需导入vant组件库
import { Form, Button, Field, Toast } from 'vant'
// 导入通用组件
import NewsHeader from './components/NewsHeader.vue'
import NewsLogo from './components/NewsLogo.vue'
import NewsNav from './components/NewsNav.vue'
// 导入日期插件moment
import moment from 'moment'
// 导入axios,挂载到Vue原型上
import axios from 'axios'
Vue.prototype.$axios = axios
// 配置axios的基准地址
axios.defaults.baseURL = 'http://localhost:3000'
// axios配置拦截器
axios.interceptors.request.use(function(config) {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})
axios.interceptors.response.use(function(res) {
  console.log(res)
  const { statusCode, message } = res.data
  if (statusCode === 401 && message === '用户信息验证失败') {
    Toast.fail(message)
    router.push('/login')
    localStorage.removeItem('token')
    localStorage.removeItem('id')
  }
  return res
})
// 添加全局过滤器 （过滤日期格式）
Vue.filter('time', function(input) {
  return moment(input).format('YYYY-MM-DD')
})
// 注册组件
Vue.component('newsheader', NewsHeader)
Vue.component('news-logo', NewsLogo)
Vue.component('news-nav', NewsNav)
// 初始化组件
Vue.use(Form)
Vue.use(Button)
Vue.use(Field)
Vue.use(Toast)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
