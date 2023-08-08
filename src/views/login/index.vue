<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form">
          <el-form-item>
            <el-input
              v-model="loginForm.username"
              :prefix-icon="User"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="loginForm.password"
              type="password"
              show-password
              :prefix-icon="Lock"
            ></el-input>
          </el-form-item>
          <el-form-item class="button_item">
            <el-button class="login_btn" type="primary">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from "@element-plus/icons-vue";
import { reactive } from "vue";

const loginForm = reactive({
  username: "admin",
  password: "111111",
});
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url("@/assets/images/background.jpg") no-repeat center/cover;

  .login_form {
    position: relative;
    top: 30vh;
    width: 80%;
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 8px;

    .button_item {
      margin: 0;

      .login_btn {
        width: 100%;
      }
    }
  }
}
</style>
