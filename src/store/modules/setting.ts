// layout组件相关
import { defineStore } from "pinia";

const useLayoutSettingStore = defineStore("LayoutSetting", {
  state: () => {
    return {
      // 菜单折叠 或 收起
      fold: false,
    };
  },
});

export default useLayoutSettingStore;