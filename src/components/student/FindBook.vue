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
            <el-button type="primary" @click.native="borrowBook(scope.$index, scope.row)">借书</el-button>
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
      @change="changeSearch"
    ></el-switch>
    <!--分页-->
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
      searchBy: false,
      status: 0, //status按照种类或者名字查询,0表示名字，1表示种类
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
        .get("/api/student/book/getBooks.php")
        .then(
          response => {
            that.allBook = response.data.msg;
            that.searchBy = that.$store.state.searchBy.isOpen;
            that.searchByName();
          },
          reason => {
            console.log(reason);
          }
        )
        .catch(function(error) {
          console.log(error);
        });
    },
    changeSearch: function() {
      if(this.status === 1 ){
          this.status = 0;
      }else{
          this.status = 1;
      }
        console.log(this.status);
    },
    //查询名字
    searchByName: function() {
      if (this.status === 0) {
        this.bookSel = this.allBook.filter(
          data =>
            !this.search ||
            data.name.toLowerCase().includes(this.search.toLowerCase())
        );
      } else {
        this.bookSel = this.allBook.filter(
          data =>
            !this.search ||
            data.tname
              .toLowerCase()
              .includes(this.search.toLowerCase())
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
    //借书
    borrowBook(index, row) {
      //   console.log(row);
      let orderPromise = this.$axios({
        method: "post",
        url: "/api/student/book/borrowBook.php",
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
        orderPromise.then(value=>{
          if(value.data.msg === true){
              this.$message({
                  type: "success",
                  duration: 1000,
                  center: true,
                  message: "借书订单生成，等待管理员批准",
              })
          }else{
              this.$message({
                  type: "warning",
                  duration : 1000,
                  center : true,
                  message : "不符合条件"
              })
          }
        },reason=>{
            console.log(reason)
        })
    },
  },
  mounted() {
    this.init();
  },
  watch: {
    $route(to, from) {
      if (from.path.toLowerCase()) {
        this.init();
      }
    }
  }
};
</script>

