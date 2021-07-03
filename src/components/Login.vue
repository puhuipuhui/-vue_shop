<template>
  <div class="login_container">
    <div class="login_box">
        <!-- 头像区域 -->
      <div class="avatar_box">
          <img src="../assets/2.jpg" alt="">
      </div>
      <!-- 登陆表单 -->
      <el-form ref="loginFormref" :model="loginForm" :rules="loginFormrules" label-width="0px" class="login_form">
          <!-- ref相当于返沪Dom对象 -->
          <!-- username -->
        <el-form-item prop="username">
            <el-input v-model="loginForm.username" prefix-icon="iconfont icon-sousuo" >    
            </el-input>
        </el-form-item >
        <!-- passname -->
        <el-form-item prop="password">
            <el-input v-model="loginForm.password" prefix-icon="iconfont icon-mima1" type="password"></el-input>
        </el-form-item>
        <!-- button -->
        <el-form-item class="btns">

            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="resetLoginForm">重置</el-button>
            
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
      return {
        //   登录表单的数据对象
          loginForm: {
              username:'admin',
              password:'123456'
          },
        //   表单验证用户是否合法
          loginFormrules:{
              username:[
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ],
              password:[ 
                    { required: true, message: '请输入用户密码', trigger: 'blur' },
                    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }]
          }
      };
  },
  methods: {
      //点击重置按钮，重置登录表单
      resetLoginForm(){
          this.$refs.loginFormref.resetFields();
      },
    //   表单预验证
      login(){
        //   异步
          this.$refs.loginFormref.validate(async valide=>{
              if(!valide) return ;
                const {data :res}=await this.$http.post('login',this.loginForm);
                if(res.meta.status !==200) return this.$message.error('登陆失败');
                this.$message.success('登陆成功');
                // console.log(res);
                //将登陆成功的token保存到客户端sessionStorage中
                window.sessionStorage.setItem("token",res.data.token);
                // // 编程式导航跳转到后台主页，路由地址是/home
                this.$router.push('/home');
                ;
          })
      }
  }
};
</script>
<style Lang="less" scoped>
.login_container {
    background-color: #2f2da0;
    height: 100%;
}

.login_box {
    width: 450px;
    height: 300px;
    background-color: rgb(252, 252, 252);
    border-radius: 3px;
    position: absolute;
    /* 盒子的左上角位于body中间 */
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    /* translate(-50%,-50%)往上（x轴），往左（y轴）移动自身长宽的50%，使其居于中心位置 */
}
.avatar_box {
    /* 外环 */
        height: 130px;
        width: 130px;
        border: 1px solid rgb(197, 214, 228);
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px;
        position: absolute;
        left: 50%;
        transform: translate(-50%,-50%);
    }
img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
}
.btns{
    display: flex;
    justify-content: flex-end;

}
.login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}

</style>