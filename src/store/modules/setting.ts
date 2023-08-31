// layout组件相关
import { defineStore } from "pinia";

const useLayoutSettingStore = defineStore("LayoutSetting", {
  state: () => {
    return {
      // 菜单折叠 或 收起
      fold: true,
      // tabbar的刷新效果
      refresh: false,
    };
  },
});

export default useLayoutSettingStore;
