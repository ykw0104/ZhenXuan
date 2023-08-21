<template>
  <div>Home: {{ userStore.username }}</div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import useUserStore from "@/store/modules/user";

const userStore = useUserStore();
onMounted(() => {
  // 请求用户信息
  userStore.userInfo();
});

onMounted(() => {});
</script>

<style scoped lang="scss"></style>
