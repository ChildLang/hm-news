// 导入vue
import Vue from 'vue'
// 导入主组件
import App from './App.vue'
// rem插件
import 'amfe-flexible'
// 导入样式
import './styles/common.less'
import './styles/iconfont.less'
// 导入路由配置
import router from './router/index.js'
// 按需导入vant组件库
import { Form, Button, Field, Toast } from 'vant'
// 导入通用组件
import NewsHeader from './components/NewsHeader.vue'
import NewsLogo from './components/NewsLogo.vue'
// 导入axios,挂载到Vue原型上
import axios from 'axios'
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:3000'
// 配置组件
Vue.component('newsheader', NewsHeader)
Vue.component('news-logo', NewsLogo)
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
