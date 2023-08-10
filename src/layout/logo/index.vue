<template>
  <div class="logo">
    <!-- <img src="../../../public/logo.jpeg" />
    <p>Yomiya</p> -->
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.logo {
  display: flex;
  align-items: center;
  width: 100%;
  height: $base-menu-logo-height;
  padding: 20px;
  color: #fff;
  text-align: center;

  img {
    width: 40px;
    height: 40px;
  }

  p {
    margin-left: 10px;
    font-size: $base-logo-title-fontSize;
  }
}
</style>
