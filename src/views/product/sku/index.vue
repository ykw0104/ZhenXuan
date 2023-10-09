<template>
  <el-card>
    <el-table :data="skuArr" border style="margin: 10px 0">
      <el-table-column
        label="序号"
        type="index"
        align="center"
        width="80px"
      ></el-table-column>

      <el-table-column
        prop="skuName"
        label="名称"
        show-overflow-tooltip
        width="150px"
      ></el-table-column>

      <el-table-column
        prop="skuDesc"
        label="描述"
        show-overflow-tooltip
        width="150px"
      ></el-table-column>

      <el-table-column label="图片" width="150px">
        <template #="{ row }">
          <el-image
            :src="row.skuDefaultImg"
            style="width: 100px; height: 100px"
            :cover="true"
          />
        </template>
      </el-table-column>

      <el-table-column
        prop="weight"
        label="重量(g)"
        width="150px"
      ></el-table-column>

      <el-table-column
        prop="price"
        label="价格(元)"
        width="150px"
      ></el-table-column>

      <el-table-column label="操作" width="250px" fixed="right">
        <template #="{ row }">
          <el-button type="primary" size="small" icon="Top"></el-button>
          <el-button type="warning" size="small" icon="Edit"></el-button>
          <el-button type="info" size="small" icon="InfoFilled"></el-button>
          <el-button type="danger" size="small" icon="Delete"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 20, 30, 40]"
      :background="true"
      layout="prev, pager, next, jumper,->,total,sizes"
      :total="total"
      @current-change="getHasSku"
      @size-change="handler"
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { reqSkuList } from "@/api/product/sku";
import type { SkuResponseData, SkuData } from "@/api/product/sku/type";

const pageNo = ref<number>(1);
const pageSize = ref<number>(10);
const total = ref<number>(0);
const skuArr = ref<SkuData[]>([]);

onMounted(() => {
  getHasSku();
});

const getHasSku = async (pager = 1) => {
  pageNo.value = pager;

  const result: SkuResponseData = await reqSkuList(
    pageNo.value,
    pageSize.value,
  );

  if (result.code === 200) {
    total.value = result.data.total;
    skuArr.value = result.data.records;
  }
};

// 分页器 下拉菜单 改变
const handler = () => {
  getHasSku();
};
</script>

<script lang="ts">
export default {
  name: "SkuIndex",
};
</script>

<style scoped lang="scss"></style>
