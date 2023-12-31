// 保存token
export const SET_TOKEN = (token: string) => {
  localStorage.setItem("TOKEN", token);
};

// 获取token
export const GET_TOKEN = () => {
  return localStorage.getItem("TOKEN");
};

// 删除token
export const REMOVE_TOKEN = () => {
  localStorage.removeItem("TOKEN");
};
