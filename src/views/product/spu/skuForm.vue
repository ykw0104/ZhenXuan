<template>
  <el-form label-width="100px">
    <el-form-item label="SKU名称">
      <el-input placeholder="SKU名称"></el-input>
    </el-form-item>

    <el-form-item label="价格(元)">
      <el-input type="number" placeholder="价格(元)"></el-input>
    </el-form-item>

    <el-form-item label="重量(g)">
      <el-input type="number" placeholder="重量(g)"></el-input>
    </el-form-item>

    <el-form-item label="SKU描述">
      <el-input type="textarea" placeholder="SKU描述"></el-input>
    </el-form-item>

    <el-form-item label="平台属性">
      <el-form :inline="true" label-width="50px">
        <el-form-item
          v-for="item in attrArr"
          :key="item.id"
          :label="item.attrName"
        >
          <el-select>
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
      <el-form :inline="true">
        <el-form-item
          v-for="item in saleArr"
          :key="item.id"
          :label="item.saleAttrName"
        >
          <el-select>
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
      <el-table border :data="imgArr">
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
          <template #="{ row, $index }">
            <el-button type="danger" size="small">设置默认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>

    <el-form-item>
      <el-button type="primary">保存</el-button>
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
} from "@/api/product/spu/type";
import { reqAttr } from "@/api/product/attr";
import { reqSpuImageList, reqSpuHasSaleAttr } from "@/api/product/spu";
import type { Attr, AttrResponseData } from "@/api/product/attr/type";
import { ref } from "vue";

const attrArr = ref<Attr[]>([]);
const saleArr = ref<SaleAttr[]>([]);
const imgArr = ref<SpuImg[]>([]);

const $emit = defineEmits(["changeScene"]);

const cancel = () => {
  $emit("changeScene", { flag: 0, params: "" });
};

const initSkuData = async (
  c1Id: number | string,
  c2Id: number | string,
  spu: SpuData,
) => {
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

defineExpose({
  initSkuData,
});
</script>

<style scoped lang="scss"></style>
