import { createApp } from "vue";
import App from "@/App.vue";

// 引入element-plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
//@ts-ignore
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

// svg插件需要的配置代码
import "virtual:svg-icons-register";

const app = createApp(App);

// 安装element-plus
app.use(ElementPlus, {
  locale: zhCn,
});
app.mount("#app");
