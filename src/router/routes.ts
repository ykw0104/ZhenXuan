export const constantRoute = [
  // 登录
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
  },

  // 首页
  {
    path: "/",
    name: "layout",
    component: () => import("@/layout/index.vue"),
  },

  // 404
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404/index.vue"),
  },

  // 任意
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    name: "any",
  },
];
