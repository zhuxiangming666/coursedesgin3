<template>
  <div class="add">
    <el-tabs v-model="activeName" type="card" stretch @tab-click="handleClick">
      <el-tab-pane label="添加书籍" name="first">
        <el-form ref="form1" :model="form1" label-width="80px">
          <el-form-item label="种类:" label-width="80px">
            <el-select v-model="form1.btype" placeholder="请选择活动区域">
              <el-option
                v-for="(item,index) in btype"
                :key="index"
                :label="item.tname"
                :value="item.tid"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="书名:" label-width="80px">
            <el-input v-model="form1.name"></el-input>
          </el-form-item>
          <el-form-item label="数量:" label-width="80px">
            <el-input v-model="form1.count" type="number"></el-input>
          </el-form-item>
          <el-form-item label="简诉" label-width="80px">
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form1.detail"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" plain @click.native="submit">提交</el-button>
            <el-button type="danger" plain @click.native="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="添加种类" name="second">
        <el-form ref="form2" :model="form2" label-width="80px">
          <el-form-item label="种类名:" label-width="80px">
            <el-input v-model="form2.tname"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" plain @click.native="submit2">提交</el-button>
            <el-button type="danger" plain @click.native="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped lang="less">
.add {
  box-sizing: border-box;
  background-color: #fff;
  margin: 100px auto;
  width: 400px;
  height: 400px;
}
</style>

<script>
import Qs from "qs";
import Login from "@/components/home/Login";
import Register from "@/components/home/Register";
export default {
  data() {
    return {
      activeName: "first", //表示当前是登入还是注册
      form1: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        count: 0,
        btype: "",
        detail: ""
      },
      form2: {
        tname : ""
      },
      btype: []
    };
  },
  methods: {
    init() {
      let orderPromise = this.$axios({
        method: "get",
        url: "/api/admin/book/getBookType.php"
      });
      orderPromise.then(
        value => {
          this.btype = value.data.msg;
          // console.log(value.data);
          console.log(this.form1.btype);
        },
        reason => {
          console.log(reason);
        }
      );
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //提交添加书籍的信息
    submit() {
      // console.log(this.form1);
      if (!(this.form1.detail && this.form1.detail && this.form1.btype)) {
        this.$message({
          type: "warning",
          duration: 100000,
          message: "输入不能为空",
          center: true
        });
      } else {
        this.$axios({
          method: "post",
          url: "/api/admin/book/addBook.php",
          transformRequest: [
            function(data) {
              // 对 data 进行任意转换处理
              return Qs.stringify(data);
            }
          ],
          data: {
            detail: this.form1.detail,
            count: this.form1.count,
            name: this.form1.name,
            btype: this.form1.btype
          }
        })
          .then(
            res => {
              if (res.data.msg === "添加成功") {
                this.$message(
                  {
                    type: "success",
                    message: "添加成功",
                    duration: 100000,
                    center: true
                  },
                  reason => {
                    console.log(reason);
                  }
                );
              }
            },
            reason => {
              console.log(reason);
            }
          )
          .catch(error => console.log(error));
      }
    },
    submit2() {
      // console.log(this.form1);
      if (!(this.form2.tname)) {
        this.$message({
          type: "warning",
          duration: 1000,
          message: "输入不能为空",
          center: true
        });
      } else {
        this.$axios({
          method: "post",
          url: "/api/admin/book/addType.php",
          transformRequest: [
            function(data) {
              // 对 data 进行任意转换处理
              return Qs.stringify(data);
            }
          ],
          data: {
            tname: this.form2.tname
          }
        })
          .then(
            res => {
              if (res.data.msg === "添加成功") {
                this.$message(
                  {
                    type: "success",
                    message: "添加成功",
                    duration: 1000,
                    center: true,
                    onClose: ()=>{
                      this.init();
                    }
                  },
                  reason => {
                    console.log(reason);
                  }
                );
              }
            },
            reason => {
              console.log(reason);
            }
          )
          .catch(error => console.log(error));
      }
    },
    //重置登入的信息
    reset() {}
  },
  components: {
    // "my-login": Login,
    // "my-register": Register
  },
  mounted() {
    this.init();
  }
};
</script>
