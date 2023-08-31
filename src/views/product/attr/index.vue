<template>
  <div>
    <!-- 分类组件-->
    <Category />

    <!-- 内容 -->
    <el-card style="margin: 10px 0">
      <el-button type="primary" icon="Plus" :disabled="!categoryStore.c3Id">
        添加属性
      </el-button>

      <el-table :data="attrArr" border style="margin: 10px 0">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"
        ></el-table-column>

        <el-table-column
          label="属性名称"
          width="120px"
          prop="attrName"
        ></el-table-column>

        <el-table-column label="属性值名称">
          <template #="{ row }">
            <el-tag
              v-for="item in row.attrValueList"
              :key="item.id"
              style="margin: 5px"
            >
              {{ item.valueName }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="120px">
          <template #="{ row }">
            <el-button type="primary" size="small" icon="Edit"></el-button>
            <el-button type="danger" size="small" icon="Delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import useCategoryStore from "@/store/modules/category";
import { ref, watch } from "vue";
import { reqAttr } from "@/api/product/attr";
import type { AttrResponseData, Attr } from "@/api/product/attr/type";
import { ElMessage } from "element-plus";

const categoryStore = useCategoryStore();
watch(
  () => categoryStore.c3Id,
  () => {
    attrArr.value = [];
    categoryStore.c3Id && getAttr();
  },
);

const attrArr = ref<Attr[]>([]);
const getAttr = () => {
  const { c1Id, c2Id, c3Id } = categoryStore;

  reqAttr(c1Id, c2Id, c3Id)
    .then((result: AttrResponseData) => {
      // 保存数据
      attrArr.value = result.data;
    })
    .catch((error) => {
      ElMessage.error(error);
    });
};
</script>

<script lang="ts">
export default {
  name: "AttrIndex",
};
</script>

<style scoped lang="scss"></style>
