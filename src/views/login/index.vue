<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          ref="loginForms"
          class="login_form"
          :model="loginForm"
          :rules="rules"
        >
          <el-form-item prop="username">
            <el-input
              class="login_input"
              v-model="loginForm.username"
              :prefix-icon="User"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              class="login_input"
              v-model="loginForm.password"
              type="password"
              show-password
              :prefix-icon="Lock"
            ></el-input>
          </el-form-item>
          <el-form-item class="button_item">
            <el-button
              class="login_btn"
              type="primary"
              :loading="loading"
              @click="login"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
import useUserStore from "@/store/modules/user.ts";
import { useRouter, useRoute } from "vue-router";
import { ElNotification } from "element-plus";
import { getTime } from "@/utils/time.ts";

const useStore = useUserStore();
const $router = useRouter();
const $route = useRoute();

// 登录按钮的加载
const loading = ref(false);

// 表单
const loginForms = ref();

// 登录信息
const loginForm = reactive({
  username: "admin",
  password: "atguigu123",
});

// 登录
const login = async () => {
  // 表单校验
  await loginForms.value.validate();

  // 按钮加载效果开启
  loading.value = true;

  try {
    await useStore.userLogin(loginForm);

    const redirect: any = $route.query.redirect;
    //跳转页面
    $router.push({ path: redirect || "/" });

    // 登录成功信息
    ElNotification({
      type: "success",
      message: "登录成功",
      title: `${getTime()}好`,
    });
    // 按钮加载效果关闭
    loading.value = false;
  } catch (error) {
    // 按钮加载效果关闭
    loading.value = false;
    // 登录失败信息
    ElNotification({
      type: "error",
      message: (error as Error).message,
    });
  }
};

// 自定义校验规则
const validatorUserName = (_rule: any, value: any, callback: any) => {
  if (value.length >= 5) {
    callback();
  } else {
    callback(new Error("账号长度至少五位"));
  }
};
const validatorPassword = (_rule: any, value: any, callback: any) => {
  if (value.length >= 6) {
    callback();
  } else {
    callback(new Error("密码长度至少六位"));
  }
};
// 表单校验
const rules = reactive({
  username: [{ validator: validatorUserName, trigger: "change" }],
  password: [{ validator: validatorPassword, trigger: "change" }],
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
    width: 60%;
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 8px;

    .login_input {
      --el-input-focus-border-color: #303122;
    }

    .button_item {
      margin: 0;

      .login_btn {
        width: 100%;
        --el-button-bg-color: #303122;
        --el-button-active-bg-color: #303122;
        --el-button-active-border-color: #303122;
        --el-button-border-color: #303122;
        --el-button-hover-bg-color: #73767a;
        --el-button-hover-border-color: #73767a;
      }
    }
  }
}
</style>
