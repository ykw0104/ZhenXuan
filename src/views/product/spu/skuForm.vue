<template>
  <el-form label-width="100px">
    <el-form-item label="SKU名称">
      <el-input v-model="skuParams.skuName" placeholder="SKU名称"></el-input>
    </el-form-item>

    <el-form-item label="价格(元)">
      <el-input
        v-model="skuParams.price"
        type="number"
        placeholder="价格(元)"
      ></el-input>
    </el-form-item>

    <el-form-item label="重量(g)">
      <el-input
        v-model="skuParams.weight"
        type="number"
        placeholder="重量(g)"
      ></el-input>
    </el-form-item>

    <el-form-item label="SKU描述">
      <el-input
        v-model="skuParams.skuDesc"
        type="textarea"
        placeholder="SKU描述"
      ></el-input>
    </el-form-item>

    <el-form-item label="平台属性">
      <el-form :inline="true" label-width="80px">
        <el-form-item
          v-for="item in attrArr"
          :key="item.id"
          :label="item.attrName"
        >
          <el-select v-model="item.attrIdAndValueId">
            <el-option
              v-for="attrValue in item.attrValueList"
              :key="attrValue.id"
              :label="attrValue.valueName"
              :value="`${item.id}:${attrValue.id}`"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>

    <el-form-item label="销售属性">
      <el-form :inline="true" label-width="80px">
        <el-form-item
          v-for="item in saleArr"
          :key="item.id"
          :label="item.saleAttrName"
        >
          <el-select v-model="item.saleIdAndValueId">
            <el-option
              v-for="saleAttrValue in item.spuSaleAttrValueList"
              :key="saleAttrValue.id"
              :label="saleAttrValue.saleAttrValueName"
              :value="`${item.id}:${saleAttrValue.id}`"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>

    <el-form-item label="图片名称">
      <el-table ref="table" border :data="imgArr">
        <el-table-column
          type="selection"
          width="80px"
          align="center"
        ></el-table-column>
        <el-table-column label="图片">
          <template #="{ row }">
            <img :src="row.imgUrl" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="imgName"></el-table-column>
        <el-table-column label="操作">
          <template #="{ row }">
            <el-button type="danger" size="small" @click="handler(row)">
              设置默认
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import type {
  SaleAttr,
  SaleAttrResponseData,
  SpuData,
  SpuHasImg,
  SpuImg,
  SkuData,
} from "@/api/product/spu/type";
import { reqAttr } from "@/api/product/attr";
import {
  reqSpuImageList,
  reqSpuHasSaleAttr,
  reqAddSku,
} from "@/api/product/spu";
import type { Attr, AttrResponseData } from "@/api/product/attr/type";
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";

const attrArr = ref<Attr[]>([]);
const saleArr = ref<SaleAttr[]>([]);
const imgArr = ref<SpuImg[]>([]);

const skuParams = reactive<SkuData>({
  category3Id: "", //三级分类的ID
  spuId: "", //已有的SPU的ID
  tmId: "", //SPU品牌的ID
  skuName: "", //sku名字
  price: "", //sku价格
  weight: "", //sku重量
  skuDesc: "", //sku的描述
  skuAttrValueList: [],
  skuSaleAttrValueList: [],
  skuDefaultImg: "", //sku图片地址
});

const table = ref();

const $emit = defineEmits(["changeScene"]);

const cancel = () => {
  $emit("changeScene", { flag: 0, params: "" });
};

const initSkuData = async (
  c1Id: number | string,
  c2Id: number | string,
  spu: SpuData,
) => {
  skuParams.category3Id = spu.category3Id;
  skuParams.spuId = spu.id as number;
  skuParams.tmId = spu.tmId;

  // 请求数据
  const result: AttrResponseData = await reqAttr(c1Id, c2Id, spu.category3Id);
  const result1: SaleAttrResponseData = await reqSpuHasSaleAttr(
    spu.id as number,
  );
  const result2: SpuHasImg = await reqSpuImageList(spu.id as number);

  attrArr.value = result.data;
  saleArr.value = result1.data;
  imgArr.value = result2.data;
};

// 设置默认图片
const handler = (row: any) => {
  imgArr.value.forEach((item) => {
    table.value.toggleRowSelection(item, false);
  });

  table.value.toggleRowSelection(row, true);
  skuParams.skuDefaultImg = row.imgUrl;
};

// 保存按钮
const save = async () => {
  skuParams.skuAttrValueList = attrArr.value.reduce((prev: any, next: Attr) => {
    if (next.attrIdAndValueId) {
      const [attrId, valueId] = next.attrIdAndValueId.split(":");
      prev.push({
        attrId,
        valueId,
      });
    }

    return prev;
  }, []);

  skuParams.skuSaleAttrValueList = saleArr.value.reduce(
    (prev: any, next: SaleAttr) => {
      if (next.saleIdAndValueId) {
        const [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(":");
        prev.push({
          saleAttrId,
          saleAttrValueId,
        });
      }

      return prev;
    },
    [],
  );

  // 添加sku
  const result: any = await reqAddSku(skuParams);
  if (result.code === 200) {
    ElMessage.success("添加SKU成功");
    $emit("changeScene", { flag: 0, params: "" });
  } else {
    ElMessage.error("添加SKU失败");
  }
};

defineExpose({
  initSkuData,
});
</script>

<style scoped lang="scss"></style>
