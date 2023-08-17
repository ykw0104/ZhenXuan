<template>
  <div class="layout_container">
    <div :class="{ fold: layoutSettingStore.fold }" class="layout_slider">
      <Logo></Logo>

      <el-scrollbar class="scrollbar">
        <!-- 左侧菜单 -->
        <el-menu
          background-color="#001529"
          text-color="#fff"
          active-text-color="yellowgreen"
          :default-active="$route.path"
          :collapse="layoutSettingStore.fold"
        >
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>

    <div :class="{ fold: layoutSettingStore.fold }" class="layout_tabbar">
      <!-- 顶部导航 -->
      <Tabbar />
    </div>

    <div :class="{ fold: layoutSettingStore.fold }" class="layout_main">
      <!-- 主体 -->
      <Main />
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from "./logo/index.vue";
import Menu from "./menu/index.vue";
import Tabbar from "./tabbar/index.vue";
import Main from "./main/index.vue";
import { useRoute } from "vue-router";
import useUserStore from "@/store/modules/user";
import useLayoutSettingStore from "@/store/modules/setting.ts";

const userStore = useUserStore();
const layoutSettingStore = useLayoutSettingStore();
const $route = useRoute();
</script>

<script lang="ts">
export default {
  name: "Layout",
};
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
    transition: all 0.3s;

    &.fold {
      width: $base-menu-min-width;
    }

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
    transition: all 0.3s;

    &.fold {
      left: $base-menu-min-width;
      width: calc(100vw - $base-menu-min-width);
    }
  }

  .layout_main {
    position: fixed;
    left: $base-menu-width;
    top: $base-tabbar-height;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;

    &.fold {
      left: $base-menu-min-width;
      width: calc(100vw - $base-menu-min-width);
    }
  }
}
</style>
