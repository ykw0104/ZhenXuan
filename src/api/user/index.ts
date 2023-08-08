// 用户相关的接口
import request from "@/utils/request";
import type { loginForm, loginResponseData, userResponseData } from "./type";

//项目用户相关的请求地址
enum API {
  LOGIN_URL = "/user/login",
  USERINFO_URL = "/user/info",
}

// 用户登录
export const reqLogin = (data: loginForm) => {
  return request.post<any, loginResponseData>(API.LOGIN_URL, data);
};

// 获取用户信息
export const reqUserInfo = () => {
  return request.get<any, userResponseData>(API.USERINFO_URL);
};
