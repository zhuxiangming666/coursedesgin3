<template>
  <div>
    <!--书籍表-->
    <template>
      <el-table :data="bookCurr" style="width: 100%">
        <el-table-column label="编号" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.bid }}</span>
          </template>
        </el-table-column>
        <el-table-column label="书名" width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>书名: {{ scope.row.name }}</p>
              <p>详情: {{ scope.row.detail }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="数量" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.count }}</span>
          </template>
        </el-table-column>
        <el-table-column label="种类" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.tname }}</span>
          </template>
        </el-table-column>
       <el-table-column align="right">
        <template slot="header" slot-scope="{}">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" @change="searchByName" />
        </template>
        <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)"  circle></el-button>
           <el-button type="danger" icon="el-icon-delete"  @click="handleDelete(scope.$index, scope.row)" circle></el-button>
        </template>
      </el-table-column>
      </el-table>
    </template>
    <!--按种类分类的退出按钮-->
    <el-switch
        style="display: block"
        v-model="searchBy"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-text="按种类查找"
        @change="changeSearch">
    </el-switch>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="paging.currPage"
      :page-size="paging.pageSize"
      layout="prev, pager, next, jumper"
      :total="bookSel.length"
    ></el-pagination>
  </div>
</template>
<style scoped lang="less">
</style>
<script >
import Qs from "qs";
export default {
  data() {
    return {
      //分页相关
      paging: {
        pageSize: 8,
        currPage: 1
      },
      searchBy : false,
      status: 0,
      search: "",
      allBook: [],
      bookSel: [],
      bookCurr: []
    };
  },
  methods: {
    //init当修改数据时，要初始化
    init: function() {
      let that = this;
      this.$axios
        .get("/api/admin/book/getBooks.php")
        .then(function(response) {
          that.allBook = response.data.msg;
          that.searchBy = that.$store.state.searchBy.isOpen;
          that.searchByName();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    changeSearch : function(){
        console.log("扩展");
        let flag = this.searchBy;
        let type = this.$store.state.searchBy.type;
        let obj = {
            isOpen : flag,
            type,
        };
        this.$store.commit("setSearchBy",obj);
        this.init();
    },
    //查询名字
    searchByName: function() {
      if(!this.$store.state.searchBy.isOpen){
        this.bookSel = this.allBook.filter(
        data =>
          !this.search ||
          data.name.toLowerCase().includes(this.search.toLowerCase())
        );
      }else{
        this.bookSel = this.allBook.filter(
        data =>
          !this.$store.state.searchBy.type ||
          data.tname.toLowerCase().includes(this.$store.state.searchBy.type.toLowerCase())
        );
      }
      this.paging.currPage = 1;
      console.log(this.bookSel);
      this.onLoadCurrent();
    },
    //加载指定页数的
    onLoadCurrent: function() {
      let firstIndex = this.paging.pageSize * (this.paging.currPage - 1);
      this.bookCurr = [];
      for (let i = firstIndex; i < firstIndex + this.paging.pageSize; i++) {
        if (this.bookSel[i]) this.bookCurr.push(this.bookSel[i]);
      }
    },
    //页面改变
    handleCurrentChange() {
      this.onLoadCurrent();
    },
    //修改书籍信息
    handleEdit(index, row) {
      //let that = this;
      console.log(index, row);
      var upPro = this.$prompt(`请输入${row.name}的新数量`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^\d+$/,
        inputErrorMessage: '请输入整数'
      });
      upPro.then(
        ({ value }) => {
          let upTel = this.$axios({
            method: "post",
            url: "/api/admin/book/upBookCount.php",
            transformRequest: [
              function(data) {
                // 对 data 进行任意转换处理
                return Qs.stringify(data);
              }
            ],
            data: {
              bid : row.bid,
              count : value,
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
    //删除书籍信息
    handleDelete(index, row) {
      let confirmdel = this.$confirm(
        "此操作将永久删除数据, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      );
      confirmdel.then(
        () => {
          var delBook = this.$axios({
            method: "post",
            url: "/api/admin/book/delBook.php",
            transformRequest: [
              function(data) {
                // 对 data 进行任意转换处理
                return Qs.stringify(data);
              }
            ],
            data: {
                bid: row.bid,
            }
          });

          delBook.then(
            res => {
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
            },
            () => {
              console.log("删除异常");
            }
          );
        },
        () => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        }
      );
    }
  },
  mounted() {
    this.init();
  },
  watch:{
    $route(to,from){
        if(from.path.toLowerCase() === "/admin/booktype"){
            this.init();
        }
    }
    },
};
</script>
