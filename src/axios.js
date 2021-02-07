import axios from 'axios'
import { Message } from 'element-ui'
import store from './store'
import router from './router'
axios.defaults.baseURL='http://localhost:8088'
//前置拦截
axios.interceptors.request.use(config =>{
    return config;
})

axios.interceptors.response.use(response =>{
    let res = response.data;
    //console.log(res);
    if(res.code==200){
        return response;
    } else{
        Message({
            showClose: true,
            duration: 2*1000,
            message: '输入有误，请检查你输入的用户名与密码！',
            type: 'error'
          });
        return Promise.reject(response.data.msg);
    }
},
error=>{
    //console.log(error.response);
    if (error.response.status===401) {
        store.commit("REMOVE_INFO");
        router.replace("/blogs").then(r => {r});
    }
    if(error.response.data) {
        error.message = error.response.data.msg
      }
    Message({
        showClose: true,
        duration: 2*1000,
        message: error.message,
        type: 'error'
      });
      return Promise.reject(error);
    }
)