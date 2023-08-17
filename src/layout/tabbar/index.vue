<template>
  <div class="tabbar">
    <div class="tabbar_left">
      <!-- 左侧 面包屑-->
      <BreadCrumb />
    </div>

    <div class="tabbar_right">
      <!-- 右侧 setting-->
      <Setting />
    </div>
  </div>
</template>

<script setup lang="ts">
import BreadCrumb from "./breadcrumb/index.vue";
import Setting from "./setting/index.vue";
</script>

<style scoped lang="scss">
.tabbar {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  // background-image: linear-gradient(to right, #302b2b89, #fffbfb);
  background-color: #f5f2f2;

  .tabbar_left {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }

  .tabbar_right {
    display: flex;
    align-items: center;
  }
}
</style>
