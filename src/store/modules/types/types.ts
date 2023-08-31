import type { RouteRecordRaw } from "vue-router";
import type { CagegoryObj } from "@/api/product/attr/type.ts";

export interface UserState {
  token: string | null;
  menuRoutes: RouteRecordRaw[];
  username: string;
  avatar: string;
}

export interface CategoryState {
  c1Id: string | number;
  c1Arr: CagegoryObj[];
}
