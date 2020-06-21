<template>
  <div class="adminPage">
    <header>
      <el-row :gutter="20">
        <el-col :span="4">图书馆管理系统</el-col>
        <el-col :span="6" :offset="10">{{date}}</el-col>
        <el-col :span="4"></el-col>
      </el-row>
    </header>
    <el-row>
      <!-- 导航栏-->
      <el-col :span="4">
        <el-menu
          :default-active="this.$route.path"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          router
          active-text-color="#ffd04b"
        >
          <!--图书管理-->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-management"></i>
              <span>图书管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/admin/BookType">图书种类</el-menu-item>
              <el-menu-item index="/admin/Book">书籍查看</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!--订单管理-->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-tickets"></i>
              <span slot="title">订单管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/admin/ordering">借书订单</el-menu-item>
              <el-menu-item index="/admin/ordered">还书订单</el-menu-item>
              <el-menu-item index="/admin/allorder">所有订单</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!--学生管理-->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>学生管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/admin/optstudent">学生管理</el-menu-item>
              <el-menu-item index="/admin/addStudent">导入名单</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
      <!--内容-->
      <el-col :span="20">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="less">
.adminPage {
  width: 100%;
  height: 100%;
  background-color: #ccccd6;
  header {
    background-color: #404040;
    color: #ddd;
    font-size: 20px;
    height: 50px;
    line-height: 50px;
  }
}
</style>

<script>
export default {
  data() {
    return {
      date: ""
    };
  },
  methods: {
    //获取时间
    initTimer() {
      let time = {};
      let d = new Date();
      time.year = d.getFullYear();
      time.month = d.getMonth() + 1;
      time.date = d.getDate();
      let days = new Array("日", "一", "二", "三", "四", "五", "六");
      time.day = days[d.getDay()];
      time.hour = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
      time.min = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
      this.date =
        time.year +
        "/" +
        time.month +
        "/" +
        time.date +
        " 星期" +
        time.day +
        "  " +
        time.hour +
        ":" +
        time.min;
    },
    getTime() {
      this.initTimer();
      setInterval(() => {
        this.initTimer();
      }, 60000);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  mounted() {
    //显示时间
    this.getTime();
  }
};
</script>
