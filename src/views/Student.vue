<template>
  <div class="studentPage">
    <header>
      <el-row :gutter="20">
        <el-col :span="4">图书馆管理系统</el-col>
        <el-col :span="6" :offset="10">{{date}}</el-col>
        <el-col :span="4"></el-col>
      </el-row>
    </header>
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
        <!--学生管理-->
        <el-menu-item index="/student/findbook">
          <i class="el-icon-s-management"></i>
          <span>书籍查询</span>
        </el-menu-item>
        <el-menu-item index="/student/myorder">
          <i class="el-icon-tickets"></i>
          <span>我的借书单</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="20">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </el-col>
  </div>
</template>

<style scoped lang="less">
.studentPage {
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
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    getTime() {
      this.initTimer();
      setInterval(() => {
        this.initTimer();
      }, 60000);
    },
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
    }
  },
  mounted() {
    //显示时间
    this.getTime();
  }
};
</script>
