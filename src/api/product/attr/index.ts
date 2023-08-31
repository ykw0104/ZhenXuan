import request from "@/utils/request";
import type { CategoryResponseData } from "./type.ts";

enum API {
  //获取一级分类接口地址
  C1_URL = "/admin/product/getCategory1",
  //获取二级分类接口地址
  C2_URL = "/admin/product/getCategory2/",
  //获取三级分类接口地址
  C3_URL = "/admin/product/getCategory3/",
  //获取分类下已有的属性与属性值
  ATTR_URL = "/admin/product/attrInfoList/",
  //添加或者修改已有的属性的接口
  ADDORUPDATEATTR_URL = "/admin/product/saveAttrInfo",
  //删除某一个已有的属性
  DELETEATTR_URL = "/admin/product/deleteAttr/",
}

// 获取一级分类
export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL);

// 获取二级分类
export const reqC2 = (category1Id: number) =>
  request.get<any, CategoryResponseData>(API.C2_URL + category1Id);

// 获取三级分类
export const reqC3 = (category2Id: number) =>
  request.get<any, CategoryResponseData>(API.C3_URL + category2Id);
