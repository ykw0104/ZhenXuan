import request from "@/utils/request";

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
