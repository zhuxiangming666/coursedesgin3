<template>
  <div>
    <!--学生表-->
    <el-table :data="studentCurr" style="width: 100%">
      <el-table-column label="学号" prop="studid"></el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="联系方式" prop="tel"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="{}">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" @change="searchByName" />
        </template>
        <template slot-scope="scope">
          <!-- <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">修改</el-button> -->
           <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)"  circle></el-button>
           <el-button type="danger" icon="el-icon-delete"  @click="handleDelete(scope.$index, scope.row)" circle></el-button>
          <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="paging.currPage"
      :page-size="paging.pageSize"
      layout="prev, pager, next, jumper"
      :total="studentSel.length"
    ></el-pagination>
  </div>
</template>
<style scoped lang="less">
</style>
<script >
import Qs from "qs";
import XLSX from "xlsx";
export default {
  data() {
    return {
      //分页相关
      paging: {
        pageSize: 8,
        currPage: 1
      },
      search: "",
      allStudent: [],
      studentSel: [],
      studentCurr: [],
      flag: 0 //0表示进行修改状态，1表示添加状态
    };
  },
  methods: {
    //init当修改数据时，要初始化
    init: function() {
      let that = this;
      this.$axios
        .get("/api/admin/optStudent/getStudent.php")
        .then(function(response) {
          that.allStudent = response.data.msg;
          that.searchByName();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //查询名字
    searchByName: function() {
      this.studentSel = this.allStudent.filter(
        data =>
          !this.search ||
          data.name.toLowerCase().includes(this.search.toLowerCase())
      );
      this.paging.currPage =1;
      console.log(this.studentSel);
      this.onLoadCurrent();
    },
    //加载指定页数的
    onLoadCurrent: function() {
      let firstIndex = this.paging.pageSize * (this.paging.currPage - 1);
      this.studentCurr = [];
      for (let i = firstIndex; i < firstIndex + this.paging.pageSize; i++) {
        if (this.studentSel[i]) this.studentCurr.push(this.studentSel[i]);
      }
    },
    //页面改变
    handleCurrentChange() {
      this.onLoadCurrent();
    },
    //修改学生信息
    handleEdit(index, row) {
      //let that = this;
      console.log(index, row);
      var upPro = this.$prompt(`请输入${row.name}的电话`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputType: "text"
      });
      upPro.then(
        ({ value }) => {
          let upTel = this.$axios({
            method: "post",
            url: "/api/admin/optStudent/upStudent.php",
            transformRequest: [
              function(data) {
                // 对 data 进行任意转换处理
                return Qs.stringify(data);
              }
            ],
            data: {
              studid: row.studid,
              tel: value
            }
          });
          upTel.then(
            res => {
              if (res.data.msg === true) {
                this.$message({
                  type: "success",
                  duration: 1000,
                  message: "数据更新成功",
                  center: true,
                  onClose: () => {
                    this.init();
                  }
                });
              } else {
                this.$message({
                  type: "error",
                  message: "更新失败",
                  duration: 1000,
                  center: true
                });
              }
            },
            () => {
              this.$message({
                type: "info",
                message: "更新异常"
              });
            }
          );
        },
        () => {
          this.$message({
            type: "info",
            message: "取消更新"
          });

          // upPro.catch(() => {
          //    });
        }
      );
    },
    //删除学生信息
    handleDelete(index, row) {
      //let that = this;
      let confirmdel = this.$confirm(
        "此操作将永久删除该文件, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      );
      confirmdel.then(() => {
          var delStudent = this.$axios({
            method: "post",
            url: "/api/admin/optStudent/delStudent.php",
            transformRequest: [
              function(data) {
                // 对 data 进行任意转换处理
                return Qs.stringify(data);
              }
            ],
            data: {
              studid: row.studid,
            }
          });

          delStudent.then((res)=>{
            if (res.data.msg === true) {
                this.$message({
                  type: "success",
                  duration: 1000,
                  message: "删除成功",
                  center: true,
                  onClose: () => {
                    this.init();
                  }
                });
              } else {
                this.$message({
                  type: "error",
                  message: "删除失败",
                  duration: 1000,
                  center: true
                });
              }
          },()=>{
            console.log("删除异常");
          })
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
        },() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        }
      );
    },
  },
  mounted() {
    this.init();
  }
};
</script>
