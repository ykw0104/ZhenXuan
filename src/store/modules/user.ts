import { defineStore } from "pinia";
import { reqLogin } from "@/api/user";
import type { loginForm } from "@/api/user/type";

const useUserStore = defineStore("User", {
  state: () => {
    return {
      token: localStorage.getItem("TOKEN"),
    };
  },

  actions: {
    // 登录
    async userLogin(data: loginForm) {
      const result: any = await reqLogin(data);
      if (result.code === 200) {
        // 登录成功, 存储token
        this.token = result.data.token;
        // 本地持久化
        localStorage.setItem("TOKEN", result.data.token);

        return "ok";
      } else {
        return Promise.reject(new Error(result.data.message));
      }
    },
  },

  getters: {},
});

export default useUserStore;
