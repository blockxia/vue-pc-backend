import Vue from 'vue'
import Router from 'vue-router'
//  import {Message, Loading} from 'element-ui'
//  const HelloWorld = () => import('@/components/HelloWorld')
const Index = () => import('@/views/index')
const workItemManager = () => import('@/views/workItemManager')
const Login = () => import('@/views/login')
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: Index,
      meta: {
        isShow: true
      }
    },
    {
      path: '/Login',
      name: 'login',
      component: Login,
      meta: {
        isShow: true
      }
    },
    {
      path: '/workItemManager',
      name: 'workItemManager',
      component: workItemManager,
      meta: {
        isShow: true
      }
    }
  ]
})

/* const options = {
  fullscreen: true,
  text: 'Loading',
  background: 'rgba(0, 0, 0, 0.7)'
} */
/* router.beforeEach((to, from, next) => {
  if (to.name !== 'login') {
    Loading.service(options)
  }
  // 是否有权限进入此路由
  next()
})
router.onError(error => {
  console.log(error)
  Message.error('请求异常，请检查网络环境')
})
router.afterEach(to => {
  setTimeout(() => {
    Loading.service(options).close()
  }, 2000)
}) */
export default router
