import request from "@/utils/request";

enum API {
  //获取已有的商品的数据-SKU
  SKU_URL = "/admin/product/list/",
  //上架
  SALE_URL = "/admin/product/onSale/",
  //下架的接口
  CANCELSALE_URL = "/admin/product/cancelSale/",
  //获取商品详情的接口
  SKUINFO_URL = "/admin/product/getSkuInfo/",
  //删除已有的商品
  DELETESKU_URL = "/admin/product/deleteSku/",
}
