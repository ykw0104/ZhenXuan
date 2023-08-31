<template>
  <el-card>
    <el-form inline>
      <!-- 一级分类 -->
      <el-form-item label="一级分类">
        <el-select v-model="categoryStore.c1Id">
          <el-option
            v-for="c1 in categoryStore.c1Arr"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <!-- 二级分类 -->
      <el-form-item label="二级分类">
        <!-- <el-select>
          <el-option label="1"></el-option>
          <el-option label="2"></el-option>
        </el-select> -->
      </el-form-item>

      <!-- 三级分类 -->
      <el-form-item label="三级分类">
        <!-- <el-select>
          <el-option label="1"></el-option>
        </el-select> -->
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import useCategoryStore from "@/store/modules/category.ts";

const categoryStore = useCategoryStore();

onMounted(() => {
  getC1();
});

const getC1 = () => {
  categoryStore.getC1();
};
</script>

<script lang="ts">
export default {
  name: "Category",
};
</script>

<style scoped lang="scss"></style>
