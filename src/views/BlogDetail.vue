<template> 
    <div class="m-content">
      <div class="closePage">
        <router-link :to="{name:'Blogs'}">关闭</router-link>
      </div>
      <div class="mblog">
          <h2> {{ blog.title }}</h2>
          <el-link icon="el-icon-edit" v-if="ownBlog">
              <router-link :to="{name: 'BlogEdit', params: {blogId: blog.id}}" >编辑</router-link>
          </el-link>
          <el-link icon="el-icon-delete" v-if="ownBlog" @click="del()">删除</el-link>
          <el-divider></el-divider>
          <div class="markdown-body" v-html="blog.content"></div>
      </div>

    </div>
</template>

<script>
import 'github-markdown-css'
export default {
    name:"BlogDetail.vue",
     data() {
      return {
        blog: {
          id: "",
          title: "",
          content: ""
        },
        //判断该篇博客是否是自己写的
        ownBlog: false
      }
    },
    methods:{
      del(){
        this.$axios.get('/delBlog/'+ this.blog.id).then((res) =>{
          // console.log(res);
          const data = res.data;
          if (data.code=='200'){
            this.$message({
              type: 'info',
              duration: 1*1000,
              message: '删除成功！'
            });
            this.$router.push("/blogs").catch();
          }
        })
      }
    },
    created() {
      const blogId = this.$route.params.blogId;
      //console.log(blogId)
      const _this = this;
      this.$axios.get('/blog/' + blogId).then(res => {
        const blog = res.data.data;
        _this.blog.id = blog.id;
        _this.blog.title = blog.title;

        //将内容转化为markdown形式
        var MardownIt = require("markdown-it");
        var md = new MardownIt();
        var result = md.render(blog.content);
        _this.blog.content = result;
        //判断是否是自己写的博客，如果是的话，ownBlog=true
        _this.ownBlog = (blog.userId === _this.$store.state.userInfo.id);

      })
    }
}
</script>

<style scoped>
  .mblog {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    width: 100%;
    min-height: 700px;
    padding: 20px 15px;
  }
  .closePage{
    margin-left: 20px;
    width: 40px;
    height: 20px;
    text-decoration: none;
  }
  .m-content{
    width: 1000px;
    margin: 50px auto;
  }
</style>