<template>
  <el-card>
    <el-form inline>
      <!-- 一级分类 -->
      <el-form-item label="一级分类">
        <el-select>
          <el-option label="1"></el-option>
          <el-option label="2"></el-option>
        </el-select>
      </el-form-item>

      <!-- 二级分类 -->
      <el-form-item label="二级分类">
        <el-select>
          <el-option label="1"></el-option>
          <el-option label="2"></el-option>
        </el-select>
      </el-form-item>

      <!-- 三级分类 -->
      <el-form-item label="三级分类">
        <el-select>
          <el-option label="1"></el-option>
          <el-option label="2"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts"></script>

<script lang="ts">
export default {
  name: "Category",
};
</script>

<style scoped lang="scss"></style>
