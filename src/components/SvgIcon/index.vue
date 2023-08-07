<template>
  <div>
    <svg :style="{ width, height }">
      <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>
  </div>
</template>

<script setup lang="ts">
defineProps({
  // svg的name
  name: String,

  prefix: {
    type: String,
    default: "#icon-",
  },

  //svg宽度
  width: {
    type: String,
    default: "16px",
  },
  //svg高度
  height: {
    type: String,
    default: "16px",
  },

  //svg颜色
  color: {
    type: String,
    default: "",
  },
});
</script>

<style scoped lang="scss"></style>
