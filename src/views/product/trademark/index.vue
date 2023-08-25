<template>
  <div>
    <el-card class="box-card">
      <!-- 顶部按钮 -->
      <el-button type="primary" icon="Plus">添加品牌</el-button>
    </el-card>

    <!-- 表格 -->
    <el-table style="margin: 10px 0" :border="true">
      <el-table-column label="序号" width="80px" align="center" />
      <el-table-column label="品牌名称" />
      <el-table-column label="品牌LOGO" />
      <el-table-column label="品牌操作" />
    </el-table>

    <!-- 分页 -->
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="limit"
      :page-sizes="[3, 5, 7, 9]"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="400"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const pageNo = ref<number>(1);
const limit = ref<number>(3);
</script>

<style scoped lang="scss"></style>
