<template>
  <el-container class="home_container">
<!--container布局容器，flex布局，当子元素包含header或者footer，垂直上下排列，否则水平左右排列-->
<!--header顶栏容器-->
    <el-header>
      <div class="home_title">博客管理平台</div>
      <div class="home_userinfoContainer">
        <el-dropdown @command="handleCommand">
  <span class="el-dropdown-link home_userinfo">
    {{currentUserName}}<i class="el-icon-arrow-down el-icon--right home_userinfo"></i>
  </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="sysMsg" disabled>系统消息</el-dropdown-item>
            <el-dropdown-item command="MyArticle" disabled>我的文章</el-dropdown-item>
            <el-dropdown-item command="MyHome" disabled>个人主页</el-dropdown-item>
            <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>

    <el-container>
<!--aside侧边栏容器-->
      <el-aside width="200px">
<!--        设置default-active能在浏览器刷新后仍可以定位到之前选中的路由-->
<!--        绑定menu和router进行动态渲染-->
        <el-menu
          default-active="0"
          class="el-menu-vertical-demo" style="background-color: #ECECEC" router>
          <!--添加router或者router="true"使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转-->
          <template v-for="(item,index) in this.$router.options.routes" v-if="!item.hidden">
            <!--遍历router，依次渲染routes属性hidden为false的路由并与菜单绑定-->
            <!--一级菜单-->
            <el-submenu :index="index+''" v-if="item.children.length>1" :key="index"><!--设置唯一标识key，减少重复渲染，提升性能-->
              <!--如果该路由包含两个或者两个以上的子路由-->
              <template slot="title">
                <i :class="item.iconCls"></i><!--设置route对应icon和name-->
                <span>{{item.name}}</span>
              </template>
              <el-menu-item v-for="child in item.children" v-if="!child.hidden" :index="child.path" :key="child.path">
                {{child.name}}
              </el-menu-item>
            </el-submenu>

            <template v-else>
              <el-menu-item :index="item.children[0].path">
                <i :class="item.children[0].iconCls"></i>
                <span slot="title">{{item.children[0].name}}</span>
              </el-menu-item>
            </template>
          </template>
        </el-menu>
      </el-aside>
<!--main主要区域容器-->
      <el-main>
<!--      面包屑：显示当前页面的路径，快速返回之前的任意页面。-->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-text="this.$router.currentRoute.name"></el-breadcrumb-item>
          </el-breadcrumb>
<!--        keep-alive 是 Vue 的内置组件，当它包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。
            和 transition 相似，keep-alive 是一个抽象组件：它自身不会渲染成一个 DOM 元素，也不会出现在父组件链中。
            在组件切换过程中将状态保留在内存中，防止重复渲染DOM，减少加载时间及性能消耗，提高用户体验性-->
<!--        通过keep-alive包裹需要缓存的组件进行缓存-->
          <keep-alive>
<!--        缓存组件路由出口-->
            <router-view v-if="this.$route.meta.keepAlive"></router-view>
          </keep-alive>
<!--        不缓存组件路由出口-->
          <router-view v-if="!this.$route.meta.keepAlive"></router-view>
        </el-main>

    </el-container>

  </el-container>
</template>
<script>
  import {getRequest} from '../utils/api'
  export default{
    methods: {
      handleCommand(command){
        var _this = this;
        if (command == 'logout') {
          this.$confirm('注销登录吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(function () {
            getRequest("/logout")
            _this.currentUserName = '游客';
            _this.$router.replace({path: '/'});
          }, function () {
            //取消
          })
        }
      }
    },
    mounted: function () {
      // this.$alert('友情提示', {
      //   confirmButtonText: '确定',
      //   callback: action => {
      //   }
      // });
      var _this = this;
      getRequest("/currentUserName").then(function (msg) {
        _this.currentUserName = msg.data;
      }, function (msg) {
        _this.currentUserName = '游客';
      });
    },
    data(){
      return {
        currentUserName: ''
      }
    }
  }
</script>
<style>
  .home_container {
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
  }

  .el-header {
    background-color: #20a0ff;
    color: #333;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .el-aside {
    background-color: #ECECEC;
  }

  .el-main {
    background-color: #fff;
    color: #000;
    text-align: center;
  }

  .home_title {
    color: #fff;
    font-size: 22px;
    display: inline;
  }

  .home_userinfo {
    color: #fff;
    cursor: pointer;
  }

  .home_userinfoContainer {
    display: inline;
    margin-right: 20px;
  }
</style>
