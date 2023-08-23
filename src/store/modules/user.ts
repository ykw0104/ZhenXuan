import { defineStore } from "pinia";
import { reqLogin, reqUserInfo } from "@/api/user";
import type { loginForm, loginResponseData } from "@/api/user/type";
import type { UserState } from "./types/types.ts";
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from "@/utils/token.ts";
import { constantRoute } from "@/router/routes.ts";

const useUserStore = defineStore("User", {
  state: (): UserState => {
    return {
      // 用户token
      token: GET_TOKEN(),
      // 菜单路由
      menuRoutes: constantRoute,

      username: "",
      avatar: "",
    };
  },

  actions: {
    // 登录
    async userLogin(data: loginForm) {
      const result: loginResponseData = await reqLogin(data);
      if (result.code === 200) {
        // 登录成功, 存储token
        this.token = result.data.token as string;
        // 本地持久化
        // localStorage.setItem("TOKEN", result.data.token as string);
        SET_TOKEN(result.data.token as string);

        return "ok";
      } else {
        return Promise.reject(new Error(result.data.message));
      }
    },

    // 获取用户信息
    async userInfo() {
      const result = await reqUserInfo();
      if (result.code === 200) {
        this.username = result.data.checkUser.username;
        this.avatar = result.data.checkUser.avatar;
      }
    },

    // 退出登录
    userLogout() {
      // 没有退出登录接口
      // 清空
      this.token = "";
      this.username = "";
      this.avatar = "";
      REMOVE_TOKEN();
    },
  },

  getters: {},
});

export default useUserStore;
