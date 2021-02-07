<template>
  <div class="m-content">
    <h3>欢迎来到hp的博客</h3>
    <el-alert v-if="!hasLogin"
        title="如果没有账号，请注册！"
        type="warning"
        center :closable="false"
        show-icon>
        <el-link type="success" href="#/register">前往注册</el-link>
    </el-alert>
    <div class="block">
      <el-avatar :size="50" :src="getImage()"></el-avatar>
      <div>{{ user.username }}</div>
    </div>
    <div class="maction">
      <span><el-link href="#/blogs">主页</el-link></span>
      <el-divider direction="vertical"></el-divider>
      <span><el-link type="success" href="#/blog/add">发表博客</el-link></span>
      <el-divider direction="vertical"></el-divider>
      <span v-show="!hasLogin"><el-link type="primary" href="#/login">登录</el-link></span>
      <span v-show="hasLogin"><el-link type="danger" @click="logout">退出</el-link></span>
    </div>

  </div>
</template>

<script>
  export default {
    name: "Header",
    inject: ['reload'],
    data() {
      return {
        user: {
          username: '请先登录',
          avatar: 'logo.png'
        },
        hasLogin: false
      }
    },
    methods:{
      //获取头像
      getImage(){
        return require("@//assets//image//"+this.user.avatar);
      },
      logout() {
        const _this = this;
        //console.log(localStorage.getItem("token"));
        this.$axios.get("/logout", {
          headers: {
            "Authorization": localStorage.getItem("token")
          }
        }).then(() => {
          _this.$store.commit("REMOVE_INFO");
         _this.reload();
          //console.log(res);
        })
      }
    },
    created() {
      if(this.$store.state.userInfo) {
        this.user.username = this.$store.state.userInfo.username;
        this.user.avatar = this.$store.state.userInfo.avatar;
        this.hasLogin = true;
        //console.log(this.user.username);
      }
    } 
  }
</script>

<style scoped>
  .m-content {
    max-width: 960px;
    margin: 0 auto;
    text-align: center;
  }
  .maction {
    margin: 10px 0;
  }
</style>