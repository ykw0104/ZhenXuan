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

        <el-table-column label="品牌名称" prop="tmName"></el-table-column>

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
            <!-- 编辑 -->
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateTrademark(row)"
            ></el-button>
            <!-- 删除 -->
            <el-popconfirm
              :title="`确认删除${row.tmName}?`"
              width="250px"
              icon="Delete"
              icon-color="#F56C6C"
              @confirm="removeTrademark(row.id)"
            >
              <template #reference>
                <el-button type="danger" icon="Delete" size="small"></el-button>
              </template>
            </el-popconfirm>
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

    <el-dialog
      v-model="dialogFormVisible"
      :title="trademarkParams.id ? '修改品牌' : '添加品牌'"
    >
      <!-- 商品表单 -->
      <el-form
        ref="formRef"
        :model="trademarkParams"
        :rules="rules"
        style="width: 80%"
      >
        <el-form-item label="品牌名称" prop="tmName" label-width="100px">
          <el-input
            v-model="trademarkParams.tmName"
            placeholder="输入品牌名称"
          ></el-input>
        </el-form-item>

        <el-form-item label="品牌LOGO" prop="logoUrl" label-width="100px">
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="trademarkParams.logoUrl"
              :src="trademarkParams.logoUrl"
              class="avatar"
            />
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
import { ref, onMounted, reactive, nextTick } from "vue";
import { ElMessage } from "element-plus";
import {
  reqHasTrademark,
  reqAddOrUpdateTrademark,
  reqDeleteTrademark,
} from "@/api/product/trademark/index.ts";
import type {
  Records,
  TradeMarkResponseData,
  TradeMark,
} from "@/api/product/trademark/type.ts";
import type { UploadProps } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";

const pageNo = ref<number>(1);
const limit = ref<number>(3);
const total = ref<number>(0);
const trademarkArr = ref<Records>([]);
const dialogFormVisible = ref<boolean>(false);
const trademarkParams = reactive<TradeMark>({
  tmName: "",
  logoUrl: "",
});
const formRef = ref<FormInstance>();

// 表单校验
const validatorTmName = (_rule: any, value: any, callback: any) => {
  if (value.trim().length >= 2) {
    callback();
  } else {
    callback(new Error("品牌名称位数大于等于2位"));
  }
};
const validatorLogoUrl = (_rule: any, value: any, callback: any) => {
  if (value) {
    callback();
  } else {
    callback(new Error("请上传图片"));
  }
};
const rules = reactive<FormRules<typeof trademarkParams>>({
  tmName: [
    { required: true, message: "品牌名称不能为空", trigger: "blur" },
    { validator: validatorTmName, trigger: "blur" },
  ],
  logoUrl: [{ required: true }, { validator: validatorLogoUrl }],
});

// 获取品牌数据
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

// 添加品牌
const addTrademark = () => {
  dialogFormVisible.value = true;
  // 清空表数据
  trademarkParams.id = 0;
  trademarkParams.tmName = "";
  trademarkParams.logoUrl = "";

  // formRef.value?.clearValidate("tmName");
  // formRef.value?.clearValidate("logoUrl");
  nextTick(() => {
    formRef.value!.clearValidate("tmName");
    formRef.value!.clearValidate("logoUrl");
  });
};

// 修改品牌
const updateTrademark = (row: TradeMark) => {
  nextTick(() => {
    formRef.value!.clearValidate("tmName");
    formRef.value!.clearValidate("logoUrl");
  });

  dialogFormVisible.value = true;

  // trademarkParams.tmName = row.tmName;
  // trademarkParams.logoUrl = row.logoUrl;
  // trademarkParams.id = row.id;
  Object.assign(trademarkParams, row);
};

// 取消
const cancel = () => {
  dialogFormVisible.value = false;
};

// 确定
const confirm = async () => {
  await formRef.value?.validate();

  // 请求 添加/修改商品
  const result: any = await reqAddOrUpdateTrademark(trademarkParams);
  if (result.code === 200) {
    dialogFormVisible.value = false;
    ElMessage.success(trademarkParams.id ? "修改品牌成功" : "添加品牌成功");

    // 重新获取数据
    getHasTrademark(trademarkParams.id ? pageNo.value : 1);
  } else {
    dialogFormVisible.value = false;
    ElMessage.error(trademarkParams.id ? "修改品牌失败" : "添加品牌失败");
  }
};

// 上传图片之前
const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (
    rawFile.type == "image/png" ||
    rawFile.type == "image/jpeg" ||
    rawFile.type == "image/gif"
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true;
    } else {
      ElMessage({
        type: "error",
        message: "上传文件大小小于4M",
      });
      return false;
    }
  } else {
    ElMessage({
      type: "error",
      message: "上传文件格式务必PNG|JPG|GIF",
    });
    return false;
  }
};

//图片上传成功钩子
const handleAvatarSuccess: UploadProps["onSuccess"] = (response) => {
  //response:即为当前这次上传图片post请求服务器返回的数据
  //收集上传图片的地址,添加一个新的品牌的时候带给服务器
  trademarkParams.logoUrl = response.data;
  //图片上传成功,清除掉对应图片校验结果
  formRef.value?.clearValidate("logoUrl");
};

// 删除品牌
const removeTrademark = async (id: number) => {
  const result = await reqDeleteTrademark(id);
  if (result.code === 200) {
    ElMessage.success("删除成功");
    getHasTrademark(
      trademarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1,
    );
  } else {
    ElMessage.error("删除失败");
  }
};
</script>

<script lang="ts">
export default {
  name: "Trademark",
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
