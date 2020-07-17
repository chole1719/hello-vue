<template>

  <el-container class="home-container">
  <el-header>信息管理系统</el-header>
  <el-container>
    <el-aside width="200px">
      <el-menu
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router>
      <el-submenu :index="item.path" v-for="(item ,i) in itemlist" :key="i">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.name}}</span>
        </template>
          <el-menu-item :index="subitem.path" v-for="(subitem ,i1) in item.child" :key="i1">
            <i :class="subitem.icon"></i>
            <span>{{subitem.name}}</span>
          </el-menu-item>
      </el-submenu>
    </el-menu>
    </el-aside>
    <!-- 内容区域 -->
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      itemlist:[
        {name:'信息管理',
        icon:'el-icon-s-goods',
        path:'/Welcome',
        child:[
          {
            name:'用户管理',
            icon:'el-icon-star-off',
            path:'/User'
          },
          {
            name:'权限管理',
            icon:'el-icon-s-goods',
            path:'/Home'
          }
        ]
        },
        {name:'功能管理',icon:'el-icon-star-on',path:'/User'}
        
      ]
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-header{
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    font-size: 20px;
    vertical-align: -webkit-baseline-middle;
  }
  .el-aside {
    background-color: #545c64;
    color: #333;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
  }
.home-container{
   height: 100%;
  }
</style>
