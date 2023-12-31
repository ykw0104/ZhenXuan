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
      <el-select
        v-model="saleAttrIdAndValueName"
        :placeholder="
          unSelectSaleAttr.length
            ? `还未选择${unSelectSaleAttr.length}个`
            : `无`
        "
      >
        <el-option
          v-for="item in unSelectSaleAttr"
          :key="item.id"
          :label="item.name"
          :value="`${item.id}:${item.name}`"
        ></el-option>
      </el-select>

      <el-button
        :disabled="!saleAttrIdAndValueName"
        style="margin-left: 10px"
        type="primary"
        icon="Plus"
        @click="addSaleAttr"
      >
        添加属性
      </el-button>

      <el-table :data="saleAttr" style="margin: 10px 0" border>
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"
        ></el-table-column>

        <el-table-column
          prop="saleAttrName"
          label="销售属性名字"
          width="120px"
        ></el-table-column>

        <el-table-column label="销售属性值">
          <!-- 销售属性 -->
          <template #="{ row }">
            <el-tag
              v-for="(item, index) in row.spuSaleAttrValueList"
              :key="item.id"
              style="margin: 0 5px"
              class="mx-1"
              closable
              @close="row.spuSaleAttrValueList.splice(index, 1)"
            >
              {{ item.saleAttrValueName }}
            </el-tag>

            <el-input
              v-if="row.flag"
              v-model="row.saleAttrValue"
              placeholder="请你输入属性值"
              size="small"
              style="width: 100px"
              @blur="toLook(row)"
            ></el-input>
            <el-button
              v-else
              type="primary"
              size="small"
              icon="Plus"
              @click="toEdit(row)"
            ></el-button>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="120px">
          <template #="{ $index }">
            <el-button
              type="danger"
              size="small"
              icon="Delete"
              @click="saleAttr.splice($index, 1)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" :disabled="!saleAttr.length" @click="save">
        保存
      </el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import type { SpuData } from "@/api/product/spu/type";
import { ref, computed } from "vue";
import {
  reqAllTradeMark,
  reqSpuImageList,
  reqSpuHasSaleAttr,
  reqAllSaleAttr,
  reqAddOrUpdateSpu,
} from "@/api/product/spu";
import type {
  SaleAttrValue,
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
// 未有的销售属性
const unSelectSaleAttr = computed(() => {
  const unSelectArr = allSaleAttr.value.filter((item) => {
    return saleAttr.value.every((item1) => {
      return item.name !== item1.saleAttrName;
    });
  });

  return unSelectArr;
}); // 未有的销售属性

const spuParams = ref<SpuData>({
  category3Id: "", //收集三级分类的ID
  spuName: "", //SPU的名字
  description: "", //SPU的描述
  tmId: "", //品牌的ID
  spuImageList: [],
  spuSaleAttrList: [],
}); // SPU

const saleAttrIdAndValueName = ref<string>(""); //未选择的销售属性的ID与属性的名字

const dialogVisible = ref<boolean>(false);
const dialogImageUrl = ref<string>("");

const cancel = () => {
  $emit("changeScene", { flag: 0, params: "update" });
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

// 添加销售属性
const addSaleAttr = () => {
  /*
    "baseSaleAttrId": number,
    "saleAttrName": string,
    "spuSaleAttrValueList": SpuSaleAttrValueList
    */
  const [baseSaleAttrId, saleAttrName] =
    saleAttrIdAndValueName.value.split(":");

  const newSaleAttr: SaleAttr = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: [],
  };

  saleAttr.value.push(newSaleAttr);
  saleAttrIdAndValueName.value = "";
};

// 属性值按钮的点击
const toEdit = (row: SaleAttr) => {
  row.flag = true;

  row.saleAttrValue = "";
};

// input失去焦点
const toLook = (row: SaleAttr) => {
  const { baseSaleAttrId, saleAttrValue } = row;

  const newSaleAttrValue: SaleAttrValue = {
    baseSaleAttrId,
    saleAttrValueName: saleAttrValue as string,
  };

  if (saleAttrValue?.trim() === "") {
    ElMessage.error("属性值不能为空");
    return;
  }

  const repeat = row.spuSaleAttrValueList.find((item) => {
    return item.saleAttrValueName === saleAttrValue;
  });
  if (repeat) {
    ElMessage.error("属性值重复");
    return;
  }

  row.spuSaleAttrValueList.push(newSaleAttrValue);

  row.flag = false;
};

// 保存按钮
const save = async () => {
  // 照片墙
  spuParams.value.spuImageList = imgList.value.map((item: any) => {
    return {
      imgName: item.name,
      imgUrl: (item.response && item.response.data) || item.url,
    };
  });

  // 销售属性的数据
  spuParams.value.spuSaleAttrList = saleAttr.value;

  const result = await reqAddOrUpdateSpu(spuParams.value);

  if (result.code === 200) {
    ElMessage.success(spuParams.value.id ? "更新成功" : "添加成功");
    $emit("changeScene", {
      flag: 0,
      params: spuParams.value.id ? "update" : "add",
    });
  } else {
    ElMessage.error(spuParams.value.id ? "更新失败" : "添加失败");
  }
};

// 添加新的spu
const initAddSpu = async (c3Id: number | string) => {
  //清空数据
  Object.assign(spuParams.value, {
    category3Id: "", //收集三级分类的ID
    spuName: "", //SPU的名字
    description: "", //SPU的描述
    tmId: "", //品牌的ID
    spuImageList: [],
    spuSaleAttrList: [],
  });

  //清空照片
  imgList.value = [];

  //清空销售属性
  saleAttr.value = [];
  saleAttrIdAndValueName.value = "";

  // 存储数据
  spuParams.value.category3Id = c3Id;

  const result: AllTradeMark = await reqAllTradeMark();
  const result1: HasSaleAttrResponseData = await reqAllSaleAttr();

  allTradeMark.value = result.data;
  allSaleAttr.value = result1.data;
};

// 对外暴露
defineExpose({ iniHasSpuData, initAddSpu });
</script>

<style scoped lang="scss"></style>
