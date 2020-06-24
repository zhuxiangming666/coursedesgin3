<template>
  <div>
    <!--学生表-->
    <el-table :data="bookTypeCurr" style="width: 100%">
      <el-table-column label="编号" prop="tid"></el-table-column>
      <el-table-column label="种类" prop="tname"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="{}">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" @change="searchByName" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">查看书籍</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="paging.currPage"
      :page-size="paging.pageSize"
      layout="prev, pager, next, jumper"
      :total="bookTypeSel.length"
    ></el-pagination>
    <el-button></el-button>
  </div>
</template>
<style scoped lang="less">
</style>
<script >
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
      allBookType: [],
      bookTypeSel: [],
      bookTypeCurr: [],
    };
  },
  methods: {
    //init当修改数据时，要初始化
    init: function() {
      let that = this;
      this.$axios
        .get("/api/admin/book/getBookType.php")
        .then(function(response) {
          that.allBookType = response.data.msg;
          that.searchByName();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //跳转到book组件，并使用查看种类模式
    handleEdit(index, row){
        let obj = {
            isOpen : true,
            type : row.tname,
        };
        console.log(obj.type);
        this.$store.commit("setSearchBy",obj);
        this.$router.push(`book`);
    },
    //查询名字
    searchByName: function() {
      this.bookTypeSel = this.allBookType.filter(
        data =>
          !this.search ||
          data.tname.toLowerCase().includes(this.search.toLowerCase())
      );
      this.paging.currPage =1;
      this.onLoadCurrent();
    },
    //加载指定页数的
    onLoadCurrent: function() {
      let firstIndex = this.paging.pageSize * (this.paging.currPage - 1);
      this.bookTypeCurr = [];
      for (let i = firstIndex; i < firstIndex + this.paging.pageSize; i++) {
        if (this.bookTypeSel[i]) this.bookTypeCurr.push(this.bookTypeSel[i]);
      }
    },
    //页面改变
    handleCurrentChange() {
      this.onLoadCurrent();
    },
  },
  
  mounted() {
    this.init();
  },
};
</script>
