import Vue from 'vue'
import VueRouter from 'vue-router'
import Blogs from '../views/Blogs'
import Login from '../views/Login'
import BlogEdit from '../views/BlogEdit'
import BlogDetail from '../views/BlogDetail'
import Register from "../views/Register";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: {name: 'Blogs'}
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: Blogs
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  { 
    path: '/blog/add',
    name: 'BlogEdit',
    component: BlogEdit,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/blog/:blogId',
    name: 'BlogDetail',
    component: BlogDetail
  },
  {
    path: '/blog/:blogId/edit',
    name: 'BlogEdit',
    component: BlogEdit,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }

  
]

const router = new VueRouter({
  routes
})

export default router
