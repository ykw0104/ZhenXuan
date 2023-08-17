<template>
  <el-button :icon="Refresh" circle size="small" />
  <el-button :icon="FullScreen" circle size="small" />
  <el-button :icon="Setting" circle size="small" />

  <img
    src="../../../public/logo.jpeg"
    style="width: 24px; height: 24px; margin: 0 10px"
  />

  <el-dropdown>
    <span class="el-dropdown-link">
      admin
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { Refresh, FullScreen, Setting } from "@element-plus/icons-vue";
</script>

<style scoped lang="scss"></style>
