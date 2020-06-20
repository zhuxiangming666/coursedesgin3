<template>
    <div>
    <el-col :span="4">
      <el-menu
        :default-active="this.$route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        router
        active-text-color="#ffd04b">
        <!--学生管理-->
        <el-menu-item index="/student/findbook">
         <i class="el-icon-s-management"></i>
            <span>书籍查询</span>
        </el-menu-item>
        <el-menu-item index="/student/myorder">
         <i class="el-icon-tickets"></i>
            <span>我的借书单</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="20">
        <router-view></router-view>
    </el-col>
    </div>
</template>

<style scoped lang="less">

</style>

<script>

export default {
    methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
    },
}
</script>
