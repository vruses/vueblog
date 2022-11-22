<template>
  <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" class="login-container" label-position="left"
           label-width="0px" v-loading="loading">
<!--    ref和v-model都能绑定数据，但不同与v-model，ref获取的数据类型只能是字符串-->

    <h3 class="login_title">系统登录</h3>
    <el-form-item prop="username">
      <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号" clearable></el-input>
<!--      auto-complete允许开发人员指定用户代理必须在填写表单字段值时提供自动帮助的权限，以及向浏览器提供有关字段中预期信息类型的指导-->
    </el-form-item>

    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>

    <el-checkbox class="login_remember" v-model="checked" label-position="right">记住密码</el-checkbox>
    <el-form-item style="width: 100%">

      <el-button type="primary" @click.native.prevent="submitClick" style="width: 100%">登录</el-button>
<!--      在封装好的组件上使用，所以要加上.native才能click
          prevent就相当于event.preventDefault();
          preventDefault() 方法阻止元素发生默认的行为-->
<!--       如果不使用.native，在子组件tree上绑定click是不会执行的，需要在tree.vue中使用$emit传递事件，再在父组件中接收事件
           使用了.native就可以省略子组件传递事件的操作，可以直接在父组件中使用原生事件-->
<!--      但现在element-ui组件库已经在某些地方把原生的click做了处理了，不使用native，也能照常成功-->
    </el-form-item>

  </el-form>
</template>
<script>
  import {postRequest} from '../utils/api'
  import {putRequest} from '../utils/api'
  export default{
    data(){
      return {
        //表单验证规则,可新增输入为空的判断
        //todo:记住密码功能
        rules: {
          username: [{required: true, message: '请输入用户名', trigger: 'blur'}],//失去焦点触发
          password: [{required: true, message: '请输入密码', trigger: 'blur'}]
        },
        checked: true,//默认记住密码
        loginForm: {
          username:'',
          password: '',
        },
        loading: false//loading变量控制是否加载过渡动画
      }
    },
    methods: {
      //todo:登录鉴权+权限区分
      submitClick: function () {
        var _this = this;//this有可能代表不同的对象，这里希望_this代表原始vue实例
        this.loading = true;//事件处理时间段出现过渡动画
        postRequest('/login', {
          username: this.loginForm.username,
          password: this.loginForm.password
          //返回promise交给resp
        }).then(resp=> {
          _this.loading = false;
          if (resp.status == 200) {
            //成功
            var json = resp.data;
            if (json.status == 'success') {
              _this.$router.replace({path: '/home'});
            } else {
              _this.$alert('登录失败!', '失败!');
            }
          } else {
            //失败
            _this.$alert('登录失败!', '失败!');
          }
        }, resp=> {
          _this.loading = false;
          _this.$alert('找不到服务器⊙﹏⊙∥!', '失败!');
        });
      }
    }
  }
</script>
<style>
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    /*这里body会被margin撑开（脱离文档流，高度塌陷，元素BFC*/
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

  .login_remember {
    margin: 0px 0px 35px 0px;
    text-align: left;
  }
</style>
