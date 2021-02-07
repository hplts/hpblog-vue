import router from "./router";
import { Message } from 'element-ui';
// 路由判断登录 根据路由配置文件的参数
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
      const token = localStorage.getItem('token')//获取当前用户token
      //当前用户是否登录
      if(token){
        next()
      }else {
          Message({
              showClose: true,
              duration: 2*1000,
              message: '你还没有登录',
              type: 'error'
          });
        next({
          path:'/login'
        })
      }
    }else {
      next()
    }
})