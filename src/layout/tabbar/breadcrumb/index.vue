<template>
  <el-icon style="margin-right: 10px" @click="changeIcon">
    <component :is="layoutSettingStore.fold ? `Fold` : `Expand`"></component>
  </el-icon>

  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ArrowRight } from "@element-plus/icons-vue";
import { ref } from "vue";
import useLayoutSettingStore from "@/store/modules/setting.ts";

const layoutSettingStore = useLayoutSettingStore();

const changeIcon = () => {
  layoutSettingStore.fold = !layoutSettingStore.fold;
};
</script>

<script lang="ts">
export default {
  name: "Breadcrumb",
};
</script>

<style scoped lang="scss"></style>
