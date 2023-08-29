<template>
  <div>
    <el-card class="box-card">
      <!-- 顶部按钮 -->
      <el-button type="primary" icon="Plus" @click="addTrademark">
        添加品牌
      </el-button>

      <!-- 表格 -->
      <el-table :data="trademarkArr" style="margin: 10px 0" :border="true">
        <el-table-column
          label="序号"
          type="index"
          width="80px"
          align="center"
        />
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
          <template #="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateTrademark"
            ></el-button>
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
        @current-change="getHasTrademark"
        @size-change="changePageNo"
      />
    </el-card>

    <el-dialog v-model="dialogFormVisible" title="添加品牌">
      <el-form style="width: 80%">
        <!-- 添加商品 -->
        <el-form-item label="品牌名称" label-width="80px">
          <el-input placeholder="输入品牌名称"></el-input>
        </el-form-item>

        <!-- 添加LOGO -->
        <el-form-item label="品牌LOGO" label-width="80px">
          <el-upload
            class="avatar-uploader"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>

      <!-- 确认/取消 按钮 -->
      <template #footer>
        <el-button type="primary" size="default" @click="cancel">
          取消
        </el-button>
        <el-button type="primary" size="default" @click="confirm">
          确定
        </el-button>
      </template>
    </el-dialog>
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

const getHasTrademark = async (pager = 1) => {
  pageNo.value = pager;

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

// 页码发生变化
const changePageNo = () => {
  getHasTrademark();
};

const dialogFormVisible = ref<boolean>(false);

// 添加品牌
const addTrademark = () => {
  dialogFormVisible.value = true;
};
// 修改品牌
const updateTrademark = () => {
  dialogFormVisible.value = true;
};
// 取消
const cancel = () => {
  dialogFormVisible.value = false;
};
// 确定
const confirm = () => {
  dialogFormVisible.value = false;
};
</script>

<style scoped lang="scss">
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
