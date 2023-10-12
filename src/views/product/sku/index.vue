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
          <el-button
            :type="row.isSale === 1 ? 'primary' : 'info'"
            size="small"
            :icon="row.isSale === 1 ? 'Bottom' : 'Top'"
            @click="updateSale(row)"
          ></el-button>
          <el-button
            type="warning"
            size="small"
            icon="Edit"
            @click="updateSku"
          ></el-button>
          <el-button
            type="info"
            size="small"
            icon="InfoFilled"
            @click="findSku(row)"
          ></el-button>

          <el-popconfirm title="确认删除吗?" width="200px">
            <template #reference>
              <el-button
                type="danger"
                size="small"
                icon="Delete"
                @confirm="removeSku(row.id)"
              ></el-button>
            </template>
          </el-popconfirm>
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

    <!-- 抽屉组件 -->
    <el-drawer v-model="drawer">
      <template #header>
        <h4>查看商品详情</h4>
      </template>

      <template #default>
        <el-row>
          <el-col :span="6">名称</el-col>
          <el-col :span="18">{{ skuInfo.skuName }}</el-col>
        </el-row>

        <el-row>
          <el-col :span="6">描述</el-col>
          <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
        </el-row>

        <el-row>
          <el-col :span="6">价格</el-col>
          <el-col :span="18">{{ skuInfo.price }}</el-col>
        </el-row>

        <el-row>
          <el-col :span="6">平台属性</el-col>
          <el-col :span="18">
            <el-tag v-for="item in skuInfo.skuAttrValueList" :key="item.id">
              {{ item.valueName }}
            </el-tag>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">销售属性</el-col>
          <el-col :span="18">
            <el-tag v-for="item in skuInfo.skuSaleAttrValueList" :key="item.id">
              {{ item.saleAttrValueName }}
            </el-tag>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">商品图片</el-col>
          <el-col :span="18">
            <el-carousel
              :interval="4000"
              indicator-position="none"
              type="card"
              height="200px"
            >
              <el-carousel-item
                v-for="item in skuInfo.skuImageList"
                :key="item.id"
              >
                <el-image
                  :src="item.imgUrl"
                  fit="cover"
                  style="width: 100%; height: 100%"
                />
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </template>
    </el-drawer>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  reqSkuList,
  reqSaleSku,
  reqCancelSale,
  reqSkuInfo,
  reqRemoveSku,
} from "@/api/product/sku";
import type {
  SkuResponseData,
  SkuData,
  SkuInfoData,
} from "@/api/product/sku/type";
import { ElMessage } from "element-plus";

const pageNo = ref<number>(1);
const pageSize = ref<number>(10);
const total = ref<number>(0);
const skuArr = ref<SkuData[]>([]);

const drawer = ref(false);
const skuInfo = ref<SkuData>({});

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

const updateSale = async (row: SkuData) => {
  if (row.isSale === 1) {
    // 下架
    await reqCancelSale(row.id as number);
    ElMessage.success("下架成功");
    getHasSku(pageNo.value);
  } else {
    // 上架
    await reqSaleSku(row.id as number);
    ElMessage.success("上架成功");
    getHasSku(pageNo.value);
  }
};

const updateSku = () => {
  ElMessage.success("功能尚未完成...");
};

// 查看商品详细
const findSku = async (row: SkuData) => {
  drawer.value = true;
  const result: SkuInfoData = await reqSkuInfo(row.id as number);
  skuInfo.value = result.data;
};

const removeSku = async (id: number) => {
  const result: any = await reqRemoveSku(id);
  if (result.code === 200) {
    ElMessage.success("删除成功");
    getHasSku(skuArr.value.length > 1 ? pageNo.value : pageNo.value - 1);
  } else {
    ElMessage.error("删除失败");
  }
};
</script>

<script lang="ts">
export default {
  name: "SkuIndex",
};
</script>

<style scoped lang="scss">
.el-row {
  margin: 15px 0;

  .el-tag {
    margin: 0 5px 10px;
  }
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
