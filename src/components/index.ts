// 全局组件
import SvgIcon from "./SvgIcon/index.vue";
import Pagination from "./Pagination/index.vue";

import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const allGlobalComponent: any = {
  SvgIcon,
  Pagination,
};

export default {
  install(app: any) {
    Object.keys(allGlobalComponent).forEach((key) => {
      //注册为全局组件
      app.component(key, allGlobalComponent[key]);
    });

    // 全局注册element图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  },
};
