<template>
    <div>
        <template>
      <el-table :data="orderCurr" style="width: 100%">
        <el-table-column label="订单号" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.oid }}</span>
          </template>
        </el-table-column>
        <el-table-column label="书名" >
          <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="借书时间" >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作人">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ !scope.row.tid?"无操作人":scope.row.tid }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否还书">
          <template slot-scope="scope">
            <span style="margin-left: 10px" v-if="scope.row.tid">{{ scope.row.flag == 0?"未归还":"已归还" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否超期">
          <template slot-scope="scope">
            <span style="margin-left: 10px" v-if="scope.row.tid">{{ scope.row.status?"没有超期":"超出期限"}}</span>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!--分页-->
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="paging.currPage"
      :page-size="paging.pageSize"
      layout="prev, pager, next, jumper"
      :total="orderSel.length"
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
      allorder: [],
      orderSel: [],
      orderCurr: []
    };
  },
  methods: {
    //init当修改数据时，要初始化
    init: function() {
      let that = this;
      this.$axios
        .get("/api/student/order/getOrder.php")
        .then(
          response => {
            that.allorder = response.data.msg;
            that.searchBy = that.$store.state.searchBy.isOpen;
            that.searchByName();
            // console.log(response.data);
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
        this.orderSel = this.allorder.filter(
          data =>
            !this.search ||
            data.name.toLowerCase().includes(this.search.toLowerCase())
        );
      } else {
        this.orderSel = this.allorder.filter(
          data =>
            !this.search ||
            data.tname
              .toLowerCase()
              .includes(this.search.toLowerCase())
        );
      }
      this.paging.currPage = 1;
      console.log(this.orderSel);
      this.onLoadCurrent();
    },
    //加载指定页数的
    onLoadCurrent: function() {
      let firstIndex = this.paging.pageSize * (this.paging.currPage - 1);
      this.orderCurr = [];
      for (let i = firstIndex; i < firstIndex + this.paging.pageSize; i++) {
        if (this.orderSel[i]) this.orderCurr.push(this.orderSel[i]);
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
  watch: {
    $route(to, from) {
      if (from.path.toLowerCase()) {
        this.init();
      }
    }
  }
};
</script>
