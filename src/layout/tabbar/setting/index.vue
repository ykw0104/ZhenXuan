<template>
  <el-button :icon="Refresh" circle size="small" @click="updateRefresh" />
  <el-button :icon="FullScreen" circle size="small" @click="fullScreen" />
  <el-button :icon="Setting" circle size="small" />

  <img
    :src="userStore.avatar"
    style="width: 24px; height: 24px; margin: 0 10px; border-radius: 10%"
  />

  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { Refresh, FullScreen, Setting } from "@element-plus/icons-vue";
import useLayoutSettingStore from "@/store/modules/setting.ts";
import useUserStore from "@/store/modules/user";
import { useRouter, useRoute } from "vue-router";

// 用户信息
const userStore = useUserStore();
const $router = useRouter();
const $route = useRoute();

// 更新
const layoutSettingStore = useLayoutSettingStore();
const updateRefresh = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh;
};

// 全屏
const fullScreen = () => {
  //全屏属性(全屏:true / 不是全屏:false)
  const full = document.fullscreenElement;
  if (!full) {
    // 全屏
    document.documentElement.requestFullscreen();
  } else {
    // 退出全屏
    document.exitFullscreen();
  }
};

// 退出登录
const logout = () => {
  // 1. 向服务器发请求[退出登录接口]
  // 2. 清空数据[token | username | avatar]
  userStore.userLogout();
  // 3. 跳转到登录页
  $router.push({ path: "/login", query: { redirect: $route.path } });
};
</script>

<script lang="ts">
export default {
  name: "Setting",
};
</script>
<style scoped lang="scss"></style>
