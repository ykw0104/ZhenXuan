<template>
  <el-card>
    <el-form inline>
      <!-- 一级分类 -->
      <el-form-item label="一级分类">
        <el-select
          v-model="categoryStore.c1Id"
          @change="handler"
          :disabled="scene === 1"
        >
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
        <el-select
          v-model="categoryStore.c2Id"
          :disabled="scene === 1"
          @change="handler1"
        >
          <el-option
            v-for="c2 in categoryStore.c2Arr"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <!-- 三级分类 -->
      <el-form-item label="三级分类">
        <el-select v-model="categoryStore.c3Id" :disabled="scene === 1">
          <el-option
            v-for="c3 in categoryStore.c3Arr"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import useCategoryStore from "@/store/modules/category.ts";

defineProps(["scene"]);

const categoryStore = useCategoryStore();

onMounted(() => {
  // 请求一级分类
  getC1();
});

const getC1 = () => {
  categoryStore.getC1();
};

// 一级分类下拉菜单change事件
const handler = () => {
  // 清空二级,三级的旧数据
  categoryStore.c2Id = "";
  categoryStore.c3Arr = [];
  categoryStore.c3Id = "";

  categoryStore.getC2();
};

// 二级分类下拉菜单change事件
const handler1 = () => {
  // 清空三级的旧数据
  categoryStore.c3Id = "";

  categoryStore.getC3();
};
</script>

<script lang="ts">
export default {
  name: "Category",
};
</script>

<style scoped lang="scss"></style>
