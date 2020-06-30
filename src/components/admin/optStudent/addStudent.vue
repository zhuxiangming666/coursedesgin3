<template>
  <div>
    <!--导入execl表格-->
    <el-row :gutter="20">
        <el-col :span="6">
            <el-upload
        ref="upload"
        action="/"
        :show-file-list="false"
        :on-change="importExcel"
        :auto-upload="false"
      >
        <el-button slot="trigger" icon="el-icon-upload" size="small" type="primary">上传文件</el-button>
      </el-upload>
        </el-col>
        <el-col :span="6" :offset="12"><el-button size="small" type="success" @click="submitSheet">确定提交</el-button></el-col>    
      
    </el-row>
    <!--学生表-->
    <el-table :data="studentSel" style="width: 100%">
      <el-table-column label="学号" prop="studid"></el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="联系方式" prop="tel"></el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currPage"
      :page-size="pageSize"
      layout="prev, pager, next, jumper"
      :total="student.length"
    ></el-pagination>
  </div>
</template>

<style scoped lang="less">
</style>
<script>
import Qs from "qs";
import XLSX from "xlsx";
export default {
  data() {
    return {
      xlsxJson: [],
      wb: null,
      student: [],
      studentSel: [],
      currPage: 1,
      pageSize: 8
    };
  },
  methods: {
    //页数变化时候
    handleCurrentChange: function(val) {
      this.initPages();
    },
    //分页
    initPages: function() {
      //第一个下标
      this.studentSel = [];
      let index = (this.currPage - 1) * this.pageSize;
      for (let i = index; i < index + this.pageSize; i++) {
        if (this.student[i]) {
          this.studentSel.push(this.student[i]);
        }
      }
      this.studentSel;
    },
    importExcel(file) {
      // let file = file.files[0] // 使用传统的input方法需要加上这一步
      const types = file.name.split(".")[1];
      const fileType = ["xlsx", "xlc", "xlm", "xls", "xlt", "xlw", "csv"].some(
        item => item === types
      );
      if (!fileType) {
        this.$message({
          type: "warning",
          duration: 1000,
          message: "格式有误",
          center: true
        });
        return;
      }
      this.file2Xce(file).then(tabJson => {
        if (tabJson && tabJson.length > 0) {
          //   this.xlsxJson = tabJson[0];
          this.student = tabJson[0].sheet;
          this.initPages();
        }
      });
    },
    file2Xce(file) {
      return new Promise(function(resolve, reject) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const data = e.target.result;
          this.wb = XLSX.read(data, {
            type: "binary"
          });
          const result = [];
          this.wb.SheetNames.forEach(sheetName => {
            result.push({
              sheetName: sheetName,
              sheet: XLSX.utils.sheet_to_json(this.wb.Sheets[sheetName])
            });
          });
          resolve(result);
        };
        reader.readAsBinaryString(file.raw);
        // reader.readAsBinaryString(file) // 传统input方法
      });
    },
    //提交数据
    submitSheet() {
          let subaxios = this.$axios({
            method: "post",
            url: "/api/admin/optStudent/addStudents.php",
            transformRequest: [
              function(data) {
                // 对 data 进行任意转换处理
                return Qs.stringify(data);
              }
            ],
            data: {
                sheet : this.student,
            }
          });
          subaxios.then(value=>{
              let failCount = 0;
              let successCount = 0;
              let arr = value.data.msg;
              for (let i = 0; i < arr.length; i++) {
                  if(arr[i]){
                      successCount++;
                  }else{
                      failCount++;
                  }
              }
              this.$message({
                type: "default",
                duration: 100000,
                message: `一共有${arr.length}条数据,成功插入${successCount}条数据`,
                center: true,
              });
          },reason=>{
              console.log(reason);
          })
    }
  }
};
</script>
