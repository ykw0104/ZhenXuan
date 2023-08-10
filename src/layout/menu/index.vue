<template>
  <template v-for="(item, index) in menuList" :key="item.path">
    <!-- 没有子路由-->
    <template v-if="!item.children">
      <el-menu-item v-if="!item.meta.hidden" :index="item.path">
        <template #title>
          <span>图标&nbsp;</span>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <!-- 有一个子路由 -->
    <template v-if="item.children && item.children.length === 1">
      <el-menu-item
        v-if="!item.children[0].meta.hidden"
        :index="item.children[0].path"
      >
        <template #title>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <!-- 有二个以及二个以上的子路由 -->
    <el-sub-menu
      v-if="item.children && item.children.length > 1"
      :index="item.path"
    >
      <template #title>
        <span>{{ item.meta.title }}</span>
      </template>

      <!-- 递归自己 -->
      <Menu :menuList="item.children"></Menu>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
defineProps(["menuList"]);
</script>

<script lang="ts">
export default {
  name: "Menu",
};
</script>

<style scoped lang="scss"></style>
