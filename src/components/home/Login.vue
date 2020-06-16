<template>
  <div>
    <div class="from">
      <div style="margin-top:30px">
        <el-input placeholder="请输入账号" v-model="account" @change="checkAccount">
          <template slot="prepend">账号:</template>
        </el-input>
      </div>
      <div style="margin-top:15px">
        <el-input placeholder="请输入密码" v-model="password" show-password>
          <template slot="prepend">密码:</template>
        </el-input>
      </div>
      <div style="margin-top: 30px">
        <el-row>
          <el-button type="primary" plain size="medium" @click="submit">提交</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
</style>

<script>
import Qs from "qs";
export default {
  data() {
    return {
      account: "",
      password: ""
    };
  },
  methods: {
    checkAccount() {
      //发送信息检查是否有该账号
      this.$axios({
        method: "post",
        url: "/api/checkAccount.php",
        transformRequest: [
          function(data) {
            // 对 data 进行任意转换处理
            return Qs.stringify(data);
          }
        ],
        data: {
          account: this.account
        }
      })
        .then(res => {
          if (res.data.msg !== "true") {
            // console.log("aaaa");
            this.$message("账号不存在");
          }
        })
        .catch(error => console.log(error));
    },
    submit() {
      if (!(this.account || this.password)) {
        this.$message("信息不全，不能提交");
      } else {
        //提交表单
        this.$axios({
          method: "post",
          url: "/api/login.php",
          transformRequest: [
            function(data) {
              // 对 data 进行任意转换处理
              return Qs.stringify(data);
            }
          ],
          data: {
            account: this.account,
            password: this.password
          }
        })
          .then(res => {
            if(res.data.msg == "登入成功"){
              this.$message("登入成功,即将进入主页面");
              if(res.data.right == 1){
                window.location.href = "/admin";
              }else{
                window.location.href = "/student";
              }
             
            }
          })
          .catch(error => console.log(error));
      }
    }
  }
};
</script>
