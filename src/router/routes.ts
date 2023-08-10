export const constantRoute = [
  // 登录
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录",
      hidden: true,
    },
  },

  // layout
  {
    path: "/",
    name: "layout",
    component: () => import("@/layout/index.vue"),
    meta: {
      title: "layout",
      hidden: false,
    },
    children: [
      {
        path: "/home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "首页",
          hidden: false,
        },
      },
      {
        path: "/ceshi",
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "测试",
          hidden: false,
        },
      },
    ],
  },

  // 404
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404/index.vue"),
    meta: {
      title: "404",
      hidden: true,
    },
  },

  // 任意
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    name: "any",
    meta: {
      title: "任意路由",
      hidden: true,
    },
  },
];
