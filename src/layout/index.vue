<template>
  <div class="layout_container">
    <div class="layout_slider">
      <Logo></Logo>

      <el-scrollbar class="scrollbar">
        <!-- 左侧菜单 -->
        <el-menu background-color="#001529" text-color="#fff">
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>

    <!-- 顶部导航 -->
    <div class="layout_tabbar">2222</div>

    <!-- 主体 -->
    <div class="layout_main">333</div>
  </div>
</template>

<script setup lang="ts">
import Logo from "./logo/index.vue";
import Menu from "./menu/index.vue";
import useUserStore from "@/store/modules/user";

const userStore = useUserStore();
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    color: #fff;
    background-color: $base-menu-background;

    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);

      .el-menu {
        border-right: none;
      }
    }
  }

  .layout_tabbar {
    position: fixed;
    top: 0;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
  }

  .layout_main {
    position: fixed;
    left: $base-menu-width;
    top: $base-tabbar-height;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    padding: 20px;
    overflow: auto;
  }
}
</style>
