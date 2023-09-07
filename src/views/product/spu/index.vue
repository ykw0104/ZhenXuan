<template>
  <div>
    <!-- 三级分类 -->
    <Category :scene="scene"></Category>

    <el-card sytle="margin:10px 0">
      <!-- 添加SPU -->
      <el-button type="primary" icon="Plus" :disabled="!categoryStore.c3Id">
        添加SPU
      </el-button>

      <!-- 显示内容 -->
      <el-table style="margin: 10px 0" border :data="records">
        <el-table-column
          label="序号"
          align="center"
          type="index"
          width="80px"
        ></el-table-column>
        <el-table-column label="SPU名称" prop="spuName"></el-table-column>
        <el-table-column
          label="SPU描述"
          prop="description"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="SPU操作">
          <template #="{ row, $index }">
            <el-button
              type="primary"
              size="small"
              icon="Plus"
              title="添加SKU"
            ></el-button>
            <el-button
              type="warning"
              size="small"
              icon="Edit"
              title="修改SKU"
            ></el-button>
            <el-button
              type="info"
              size="small"
              icon="View"
              title="查看SKU"
            ></el-button>
            <el-button
              type="danger"
              size="small"
              icon="Delete"
              title="删除SKU"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 7, 9]"
        layout="prev, pager, next, jumper,->,sizes,total"
        :total="total"
        @current-change="getHasSpu"
        @size-change="changeSize"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { reqHasSpu } from "@/api/product/spu";
import useCategoryStore from "@/store/modules/category";
import type { HasSpuResponseData, Records } from "@/api/product/spu/type";

const categoryStore = useCategoryStore();

const scene = ref<number>(0);
const pageNo = ref<number>(1);
const pageSize = ref<number>(3);
const total = ref<number>(0);

// SPU数据
const records = ref<Records>([]);

// 获取SPU
const getHasSpu = async (pager = 1) => {
  pageNo.value = pager;

  const result: HasSpuResponseData = await reqHasSpu(
    pageNo.value,
    pageSize.value,
    categoryStore.c3Id,
  );

  if (result.code === 200) {
    records.value = result.data.records;
    total.value = result.data.total;
  }
};

// c3Id改变, 获取SPU数据
watch(
  () => categoryStore.c3Id,
  () => {
    if (!categoryStore.c3Id) return;
    getHasSpu();
  },
  {
    immediate: true,
  },
);

const changeSize = () => {
  getHasSpu();
};
</script>

<script lang="ts">
export default {
  name: "SpuIndex",
};
</script>

<style scoped lang="scss"></style>
