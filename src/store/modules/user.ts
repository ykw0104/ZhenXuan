import { defineStore } from "pinia";
import { reqLogin, reqUserInfo, reqLogout } from "@/api/user";
import type { UserState } from "./types/types.ts";
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from "@/utils/token.ts";
import { constantRoute } from "@/router/routes.ts";
import type {
  loginFormData,
  loginResponseData,
  userInfoReponseData,
} from "@/api/user/type.ts";

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
    async userLogin(data: loginFormData) {
      const result: loginResponseData = await reqLogin(data);
      if (result.code === 200) {
        // 登录成功, 存储token
        this.token = result.data as string;
        // 本地持久化
        // localStorage.setItem("TOKEN", result.data.token as string);
        SET_TOKEN(result.data as string);

        return "ok";
      } else {
        return Promise.reject(new Error(result.data));
      }
    },

    // 获取用户信息
    async userInfo() {
      const result: userInfoReponseData = await reqUserInfo();
      if (result.code === 200) {
        this.username = result.data.name;
        this.avatar = result.data.avatar;

        return "ok";
      } else {
        return Promise.reject(new Error(result.message));
      }
    },

    // 退出登录
    async userLogout() {
      const result: any = await reqLogout();
      if (result.code === 200) {
        // 清空
        this.token = "";
        this.username = "";
        this.avatar = "";
        REMOVE_TOKEN();

        return "ok";
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
  },

  getters: {},
});

export default useUserStore;
