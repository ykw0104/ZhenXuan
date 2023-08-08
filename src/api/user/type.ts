// 登录请求
export interface loginForm {
  username: string;
  password: string;
}

// 登录返回
interface dataType {
  token: string;
}
export interface loginResponseData {
  code: number;
  data: dataType;
}

// 用户信息
interface userInfo {
  userId: number;
  avatar: string;
  username: string;
  password: string;
  desc: string;
  roles: string[];
  buttons: string[];
  routes: string[];
  token: string;
}
interface user {
  checkUser: userInfo;
}
export interface userResponseData {
  code: number;
  data: user;
}
