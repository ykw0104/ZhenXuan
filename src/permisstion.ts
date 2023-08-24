import router from "@/router";

// 进度条
import npgrogress from "nprogress";
import "nprogress/nprogress.css";

import useUserStore from "./store/modules/user";
import pinia from "./store";

import setting from "./setting.ts";

const userStore = useUserStore(pinia);

// 进度条配置
npgrogress.configure({ showSpinner: false });

// 前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  document.title = setting.title + to.meta.title;

  npgrogress.start();

  const token = userStore.token;
  const username = userStore.username;

  if (token) {
    if (to.path === "/login") {
      next({ path: "/" });
    } else {
      if (username) {
        // 有用户信息
        next();
      } else {
        try {
          // 没有用户信息,发请求获取
          await userStore.userInfo();
          next();
        } catch (error) {
          // token过期 | 用户手动修改了本地存储的token
          // 退出登录 -> 清空用户数据
          await userStore.userLogout();
          next({ path: "/login", query: { redirect: to.path } });
        }
      }
    }
  } else {
    if (to.path === "/login") {
      next();
    } else {
      next({ path: "/login", query: { redirect: to.path } });
    }
  }
});

// 后置守卫
router.afterEach((to: any, from: any) => {
  npgrogress.done();
});
