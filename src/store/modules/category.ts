import { defineStore } from "pinia";
import { reqC1 } from "@/api/product/attr/index.ts";
import type { CategoryResponseData } from "@/api/product/attr/type.ts";
import type { CategoryState } from "./types/types.ts";

const useCategoryStore = defineStore("Category", {
  state: (): CategoryState => {
    return {
      c1Arr: [],
      c1Id: "",
    };
  },

  actions: {
    // 获取一级分类
    async getC1() {
      const result: CategoryResponseData = await reqC1();
      if (result.code === 200) {
        this.c1Arr = result.data;
      }
    },
  },

  getters: {},
});

export default useCategoryStore;
