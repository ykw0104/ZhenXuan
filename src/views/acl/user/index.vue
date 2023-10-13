<template>
  <div>
    <el-card>
      <el-form inline class="form">
        <el-form-item label="用户名:">
          <el-input placeholder="请输入用户名"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card style="margin: 10px 0">
      <el-button type="primary">添加用户</el-button>
      <el-button type="danger">批量删除</el-button>

      <!-- 表格展示 -->
      <el-table style="margin: 10px 0" border>
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column label="#" align="center"></el-table-column>
        <el-table-column label="id" align="center"></el-table-column>
        <el-table-column label="用户名字" align="center"></el-table-column>
        <el-table-column label="用户名称" align="center"></el-table-column>
        <el-table-column label="用户角色" align="center"></el-table-column>
        <el-table-column label="创建时间" align="center"></el-table-column>
        <el-table-column label="更新时间" align="center"></el-table-column>
        <el-table-column
          label="操作"
          width="260px"
          fixed="right"
          align="center"
        ></el-table-column>
      </el-table>

      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[5, 7, 9, 11]"
        :background="true"
        layout="prev, pager, next, jumper,->,sizes,total"
        :total="400"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const pageNo = ref<number>(1);
const pageSize = ref<number>(5);
</script>

<script lang="ts">
export default {
  name: "UserIndex",
};
</script>

<style scoped lang="scss">
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .el-form-item {
    margin: 0;
  }
}
</style>
