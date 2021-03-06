import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'

//相当于servlet
Vue.use(VueRouter)
//home路径有权限。
const routes = [
  {path:'/',redirect:'/login'},
  {path:'/login',component:Login},
  {path:'/home',component:Home}
]

const router = new VueRouter({
  routes
})
//beforeEach为路由,挂载路由导航守卫
router.beforeEach((to,from,next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数表示 放行
  if(to.path==='/login') return next();
  //获取token
  const tokenStr=window.sessionStorage.getItem('token');
  if(!tokenStr) return next('/login');
  next();
})


export default router
