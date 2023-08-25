<template>
  <div>
    <el-card class="box-card">
      <!-- 顶部按钮 -->
      <el-button type="primary" icon="Plus">添加品牌</el-button>
    </el-card>

    <!-- 表格 -->
    <el-table :data="trademarkArr" style="margin: 10px 0" :border="true">
      <el-table-column label="序号" type="index" width="80px" align="center" />
      <el-table-column label="品牌名称" prop="tmName">
        <!-- <template #="{ row }">
          <pre style="color: #ec2121dc">{{ row.tmName }}</pre>
        </template> -->
      </el-table-column>
      <el-table-column label="品牌LOGO">
        <template #="{ row }">
          <el-image
            :src="row.logoUrl"
            style="width: 100px; height: 100px"
            fit="cover"
          />
        </template>
      </el-table-column>
      <el-table-column label="品牌操作">
        <template>
          <el-button type="primary" size="small" icon="Edit"></el-button>
          <el-button type="primary" size="small" icon="Delete"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="limit"
      :page-sizes="[3, 5, 7, 9]"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="total"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { reqHasTrademark } from "@/api/product/trademark/index.ts";
import type {
  Records,
  TradeMarkResponseData,
} from "@/api/product/trademark/type.ts";

const pageNo = ref<number>(1);
const limit = ref<number>(3);
const total = ref<number>(0);
const trademarkArr = ref<Records>([]);

const getHasTrademark = async () => {
  const result: TradeMarkResponseData = await reqHasTrademark(
    pageNo.value,
    limit.value,
  );
  if (result.code === 200) {
    total.value = result.data.total;
    trademarkArr.value = result.data.records;
  }
};

onMounted(() => {
  getHasTrademark();
});
</script>

<style scoped lang="scss"></style>
