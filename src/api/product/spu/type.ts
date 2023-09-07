export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

export interface SpuData {
  id?: number;
  spuName: string;
  description: string;
  category3Id: string | number;
  tmId: string | number; // 品牌Id
  spuSaleAttrList: null; // SPU属性
  spuImageList: null; // SPU照片
}

export type Records = SpuData[];

export interface HasSpuResponseData extends ResponseData {
  data: {
    records: SpuData[];
    total: number;
    size: number;
    current: number;
    searchCount: boolean;
    pages: number;
  };
}
