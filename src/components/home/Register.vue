<template>
  <div>
    <div class="from">
      <div style="margin-top:15px">
        <el-input placeholder="请输入账号" v-model="account" @change="checkAccount">
          <template slot="prepend">账号:</template>
        </el-input>
      </div>
      <div style="margin-top:15px">
        <el-input placeholder="请输入密码" v-model="password1" show-password>
          <template slot="prepend">密码:</template>
        </el-input>
      </div>
      <div style="margin-top:15px">
        <el-input placeholder="请再次输入密码" v-model="password2" show-password @change="checkTowPwd">
          <template slot="prepend">确认密码:</template>
        </el-input>
      </div>
      <div style="margin-top: 30px">
        <el-row>
          <el-button type="primary" plain @click.native="submit">提交</el-button>
          <el-button type="danger" plain @click.native="reset">重置</el-button>
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
      registered: false,
      status: false,
      account: "",
      password1: "",
      password2: ""
    };
  },
  methods: {
    checkAccount() {
      //发请求校验
      this.$axios({
        method: "post",
        url: "/api/home/checkAccount.php",
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
          console.log(res.data.msg);
          if (res.data.msg === "true") {
            this.$message({
              type: "error",
              message: "该账号已被注册",
              duration: 1000,
              center: true,
            });
            this.registered = true;
          } else {
            this.registered = false;
          }
        })
        .catch(error => console.log(error));
    },
    checkTowPwd() {
      if (this.password1 !== this.password2) {
        this.$message({
              type: "warning",
              message: "两次密码不一致",
              duration: 1000,
              center: true,
            });
        this.status = false;
      } else {
        this.status = true;
      }
    },
    submit() {
      if (!(this.password2&&this.password1&&this.account)) {
        this.$message(
          {
              type: "warning",
              message: "信息不全，不能提交",
              duration: 1000,
              center: true,
            }
        );
      } else {
        //当两次密码不同且账号没有被注册时侯才能注册
        if (this.status && !this.registered) {
          //提交注册
          this.$axios({
            method: "post",
            url: "/api/home/register.php",
            transformRequest: [
              function(data) {
                // 对 data 进行任意转换处理
                return Qs.stringify(data);
              }
            ],
            data: {
              account: this.account,
              password: this.password1
            }
          })
            .then(res => {
              let data = res.data;
              if (data.msg === true) {
                this.$message({
                  type: "success",
                  message: "注册成功",
                  duration: 1000,
                  center: true
                });
                this.registered = false;
              } else {
                this.$message({
                  type: "error",
                  message: "你必须输入未注册的学生账号，才能注册",
                  duration: 1000,
                  center: true
                });
              }
            })
            .catch(error => console.log(error));
        } else {
          this.$message({
            type: "error",
            message: "两次密码不一致或者账号已被注册",
            duration: 1000,
            center: true
          });
        }
      }
    },
    reset() {
      this.password2 = "";
      this.password1 = "";
      this.account = "";
    }
  }
};
</script>
