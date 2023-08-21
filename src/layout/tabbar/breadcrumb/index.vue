<template>
  <el-icon style="margin-right: 10px" @click="changeIcon">
    <component :is="layoutSettingStore.fold ? `Fold` : `Expand`"></component>
  </el-icon>

  <!-- 面包屑 -->
  <el-breadcrumb :separator-icon="ArrowRight">
    <template v-for="item in $route.matched" :key="item.name">
      <el-breadcrumb-item v-if="item.meta.title" :to="item.path">
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span style="margin: 0 5px">{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ArrowRight } from "@element-plus/icons-vue";
import useLayoutSettingStore from "@/store/modules/setting.ts";
import { useRoute } from "vue-router";

const layoutSettingStore = useLayoutSettingStore();
const $route = useRoute();

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
