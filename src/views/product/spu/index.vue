<template>
  <div>
    <!-- 三级分类 -->
    <Category :scene="scene"></Category>

    <el-card sytle="margin:10px 0">
      <!-- 添加SPU -->
      <el-button type="primary" icon="Plus">添加SPU</el-button>

      <!-- 显示内容 -->
      <el-table style="margin: 10px 0" border>
        <el-table-column
          label="序号"
          align="center"
          type="index"
          width="80px"
        ></el-table-column>
        <el-table-column label="SPU名称"></el-table-column>
        <el-table-column label="SPU描述"></el-table-column>
        <el-table-column label="SPU操作"></el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 7, 9]"
        layout="prev, pager, next, jumper,->,sizes,total"
        :total="400"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const scene = ref<number>(0);
const pageNo = ref<number>(1);
const pageSize = ref<number>(3);
</script>

<style scoped lang="scss"></style>
