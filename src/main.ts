import { createApp } from "vue";
import App from "@/App.vue";

// 引入路由
import router from "@/router";

// 引入pinia
import pinia from "@/store";

// 引入element-plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
//@ts-ignore
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

// svg插件需要的配置代码
import "virtual:svg-icons-register";

// 全局组件
import globalComponent from "@/components";

// scss
import "@/styles/index.scss";

import "default-passive-events";

const app = createApp(App);

// 安装element-plus
app.use(ElementPlus, {
  locale: zhCn,
});
//  注册全局组件
app.use(globalComponent);
app.use(router);
// 路由守卫
import "./permisstion.ts";

app.use(pinia);

app.mount("#app");
