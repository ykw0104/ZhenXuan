<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
      <el-input
        v-model="spuParams.spuName"
        placeholder="请输入SPU名称"
      ></el-input>
    </el-form-item>

    <el-form-item label="SPU品牌">
      <el-select v-model="spuParams.tmId">
        <el-option
          v-for="item in allTradeMark"
          :key="item.id"
          :label="item.tmName"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="SPU描述">
      <el-input
        v-model="spuParams.description"
        type="textarea"
        placeholder="请输入SPU的描述"
      ></el-input>
    </el-form-item>

    <el-form-item label="SPU图片">
      <el-upload
        v-model:file-list="imgList"
        action="/api/admin/product/fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :before-upload="handlerUpload"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img
          w-full
          :src="dialogImageUrl"
          alt="Preview Image"
          style="width: 100%; height: 100%"
        />
      </el-dialog>
    </el-form-item>

    <el-form-item label="SPU销售属性">
      <el-select>
        <el-option label="1" value="1"></el-option>
        <el-option label="2" value="2"></el-option>
      </el-select>

      <el-button style="margin-left: 10px" type="primary" icon="Plus">
        添加属性值
      </el-button>

      <el-table style="margin: 10px 0" border>
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"
        ></el-table-column>

        <el-table-column label="销售属性名字" width="120px"></el-table-column>
        <el-table-column label="销售属性值"></el-table-column>
        <el-table-column label="操作" width="120px"></el-table-column>
      </el-table>
    </el-form-item>

    <el-form-item>
      <el-button type="primary">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import type { SpuData } from "@/api/product/spu/type";
import { ref } from "vue";
import {
  reqAllTradeMark,
  reqSpuImageList,
  reqSpuHasSaleAttr,
  reqAllSaleAttr,
} from "@/api/product/spu";
import type {
  HasSaleAttr,
  SaleAttr,
  SpuImg,
  Trademark,
  AllTradeMark,
  SpuHasImg,
  SaleAttrResponseData,
  HasSaleAttrResponseData,
} from "@/api/product/spu/type";
import { ElMessage } from "element-plus";

const $emit = defineEmits(["changeScene"]);

const allTradeMark = ref<Trademark[]>([]); // 所有品牌数据
const imgList = ref<SpuImg[]>([]); // 图片列表
const saleAttr = ref<SaleAttr[]>([]); // 已有SPU的销售属性
const allSaleAttr = ref<HasSaleAttr[]>([]); // 所有的销售属性

// SPU
const spuParams = ref<SpuData>({
  category3Id: "", //收集三级分类的ID
  spuName: "", //SPU的名字
  description: "", //SPU的描述
  tmId: "", //品牌的ID
  spuImageList: [],
  spuSaleAttrList: [],
});

const dialogVisible = ref<boolean>(false);
const dialogImageUrl = ref<string>("");

const cancel = () => {
  $emit("changeScene", 0);
};

const iniHasSpuData = async (spu: SpuData) => {
  spuParams.value = spu;

  // 所有品牌数据
  const result: AllTradeMark = await reqAllTradeMark();
  // 图片列表
  const result1: SpuHasImg = await reqSpuImageList(spu.id as number);
  // 已有SPU的销售属性
  const result2: SaleAttrResponseData = await reqSpuHasSaleAttr(
    spu.id as number,
  );
  // 所有的销售属性
  const result3: HasSaleAttrResponseData = await reqAllSaleAttr();

  allTradeMark.value = result.data;
  imgList.value = result1.data.map((item) => {
    return {
      name: item.imgName,
      url: item.imgUrl,
    };
  });
  saleAttr.value = result2.data;
  allSaleAttr.value = result3.data;
};

// 照片墙的图片预览
const handlePictureCardPreview = (file: any) => {
  dialogImageUrl.value = file.url;
  dialogVisible.value = true;
};

// 照片墙的图片删除
const handleRemove = () => {
  console.log(11);
};

// 照片墙上传之前
const handlerUpload = (file: any) => {
  if (
    file.type == "image/png" ||
    file.type == "image/jpeg" ||
    file.type == "image/gif"
  ) {
    if (file.size / 1024 / 1024 < 3) {
      return true;
    } else {
      ElMessage({
        type: "error",
        message: "上传文件务必小于3M",
      });
      return false;
    }
  } else {
    ElMessage({
      type: "error",
      message: "上传文件务必PNG|JPG|GIF",
    });
    return false;
  }
};

// 对外暴露
defineExpose({ iniHasSpuData });
</script>

<style scoped lang="scss"></style>
