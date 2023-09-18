<template>
  <el-tabs v-model="activeName" class="demo-tabs">
    <el-tab-pane label="first" name="first"><First /></el-tab-pane>
    <el-tab-pane label="second" name="second">Config</el-tab-pane>
    <el-tab-pane label="third" name="third">Role</el-tab-pane>
    <el-tab-pane label="fourth" name="fourth">Task</el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { ref } from "vue";
import First from "./first.vue";
const activeName = ref("first");
</script>

<style scoped lang="scss"></style>
