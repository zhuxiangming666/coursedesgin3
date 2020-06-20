<template>
  <div>
    <el-upload
      ref="upload"
      action="/"
      :show-file-list="false"
      :on-change="importExcel"
      :auto-upload="false"
    >
      <el-button slot="trigger" icon="el-icon-upload" size="small" type="primary">上传文件</el-button>
    </el-upload>
  </div>
</template>

<style scoped lang="less">
</style>

<script>
import XLSX from "xlsx";
export default {
  data() {
    return {
      xlsxJson: [],
      wb: null
    };
  },
  methods: {
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
          this.xlsxJson = tabJson;
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
    }
  },
  created() {
	  console.log(this.$message);
  },
};
</script>
