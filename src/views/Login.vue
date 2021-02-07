<template>
    <div class="m-content">
        <el-container>
            <el-header>hp'blog</el-header>
            <el-container>
                <el-container>
                    <el-main>
                        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="用户名" prop="username">
                                <el-input v-model="ruleForm.username"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" prop="password">
                                <el-input v-model="ruleForm.password" type="password"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                                <el-button @click="resetForm('ruleForm')">重置</el-button>
                                <el-button type="danger" @click="returnBack()">返回</el-button>
                            </el-form-item>
                        </el-form>
                    </el-main>
                    <el-footer>Footer</el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    data() {
      return {
        ruleForm: {
          username:'',
          password:''
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const _this = this;
            this.$axios.post("/login",this.ruleForm).then(res=>{
              const jwt = res.headers.authorization
              const userInfo = res.data.data
                //把数据共享出去

              _this.$store.commit("SET_TOKEN",jwt);
              _this.$store.commit("SET_USERINFO",userInfo);
                //获取数据
              //console.log(_this.$store.state.userInfo);
              _this.$router.push("/blogs");       
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      returnBack(){
        this.$router.push("/");
      }
    },
    beforeCreate(){
      if(this.$store.state.userInfo) {
        this.$router.push("/blogs");
      }
    }
        
}
</script>

<style scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-main {

    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .demo-ruleForm{
    width: 400px;
    margin: 20px auto;
  }
</style>