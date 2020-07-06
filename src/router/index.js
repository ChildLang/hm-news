import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/User.vue'
import UserEdit from '../views/UserEdit.vue'
import MyFollows from '../views/MyFollows.vue'
import Comment from '../views/Comment.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login, name: 'login' },
    { path: '/register', component: Register, name: 'register' },
    { path: '/user', component: User, name: 'user' },
    { path: '/useredit', component: UserEdit, name: 'useredit' },
    { path: '/myfollows', component: MyFollows, name: 'myfollows' },
    { path: '/mycomment', component: Comment, name: 'mycomment' }
  ]
})
// 全局的导航守卫（路由的钩子函数 beforeEach afterEach）
// to: 到哪儿去
// from: 从哪儿来
// next(): 代表放行
const pages = ['/user', '/useredit']
router.beforeEach(function(to, from, next) {
  const token = localStorage.getItem('token')
  console.log(to)
  console.log(from)
  // if (pages.includes(to.path)) {
  //   if (token) {
  //     next()
  //   } else {
  //     router.push('/login')
  //   }
  // } else {
  //   next()
  // }
  if (pages.includes(to.path)) {
    if (!token) {
      router.push('/login')
      return
    }
  }
  next()
})
export default router
