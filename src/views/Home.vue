<template>
  <div class="home">
    <el-tabs v-model="activeName" type="card" stretch @tab-click="handleClick">
      <el-tab-pane label="登入" name="first">
        <my-login></my-login>
      </el-tab-pane>
      <el-tab-pane label="注册" name="second">
        <my-register></my-register>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped lang="less">
.home {
  background-color: #fff;
  margin: 200px auto;
  width: 400px;
  height: 300px;
}
</style>

<script>
import Login from "@/components/home/Login";
import Register from "@/components/home/Register";
export default {
  data() {
    return {
      activeName: "first" //表示当前是登入还是注册
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
  components: {
    "my-login": Login,
    "my-register": Register
  }
};
</script>
