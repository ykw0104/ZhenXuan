<template>
  <div>
    <router-view v-slot="{ Component }">
      <!-- 过渡动画 -->
      <transition name="fade">
        <component v-if="flag" :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import useLayoutSettingStore from "@/store/modules/setting.ts";
import { watch, ref, nextTick } from "vue";

// 组件的销毁
const flag = ref(true);

const layoutSettingStore = useLayoutSettingStore();
// 监听tabbar的刷新按钮
watch(
  () => layoutSettingStore.refresh,
  () => {
    // 销毁组件
    flag.value = false;
    nextTick(() => {
      // 创建组件
      flag.value = true;
    });
  },
);
</script>

<script lang="ts">
export default {
  name: "Main",
};
</script>

<style scoped lang="scss">
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.5s;
}

.fade-enter-to {
  opacity: 1;
}
</style>
