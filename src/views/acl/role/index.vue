<template>
  <div>
    <el-card>
      <el-form class="search-form">
        <el-form-item label="职位搜索">
          <el-input
            placeholder="请输入关键字"
            v-model.trim="keyword"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" :disabled="keyword === ''" @click="search">
            搜索
          </el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card>
      <el-button type="primary" icon="Plus" @click="addRole">
        添加职位
      </el-button>
      <el-table border :data="allRole">
        <el-table-column
          type="index"
          align="center"
          label="#"
        ></el-table-column>

        <el-table-column label="ID" align="center" prop="id"></el-table-column>

        <el-table-column
          label="职位名称"
          align="center"
          show-overflow-tooltip
          prop="roleName"
        ></el-table-column>

        <el-table-column
          label="创建时间"
          align="center"
          show-overflow-tooltip
          prop="createTime"
        ></el-table-column>

        <el-table-column
          label="更新时间"
          align="center"
          show-overflow-tooltip
          prop="updateTime"
        ></el-table-column>

        <el-table-column
          label="操作"
          fixed="right"
          width="280px"
          align="center"
        >
          <template #="{ row }">
            <el-button type="primary" icon="User" size="small">
              分配权限
            </el-button>
            <el-button
              type="primary"
              icon="Edit"
              size="small"
              @click="updateRole(row)"
            >
              编辑
            </el-button>
            <el-button type="danger" icon="Delete" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 20, 30, 40]"
        layout="prev, pager, next, jumper,->,total,sizes"
        :total="total"
        @current-change="getHasRole"
        @size-change="sizeChange"
      />
    </el-card>

    <!-- 职位的添加和更新 -->
    <el-dialog
      v-model="dialogVisible"
      :title="RoleParams.id ? `更新职位` : `添加职位`"
    >
      <el-form ref="form" :model="RoleParams" :rules="rules">
        <el-form-item label="职位名称" prop="roleName">
          <el-input
            placeholder="请输入职位名称"
            v-model="RoleParams.roleName"
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="() => (dialogVisible = false)">取消</el-button>
          <el-button type="primary" @click="save">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from "vue";
//请求方法
import {
  reqRemoveRole,
  reqAllRoleList,
  reqAddOrUpdateRole,
  reqAllMenuList,
  reqSetPermisstion,
} from "@/api/acl/role";
import type {
  RoleResponseData,
  Records,
  RoleData,
  MenuResponseData,
  MenuList,
} from "@/api/acl/role/type";
//引入骨架的仓库
import useLayOutSettingStore from "@/store/modules/setting";
import { ElMessage } from "element-plus";
import { Search } from "@element-plus/icons-vue";
import type { FormInstance, FormRules } from "element-plus";

const setttingStore = useLayOutSettingStore();

const pageNo = ref(1);
const pageSize = ref(10);
// 搜索关键字
const keyword = ref("");

// 所有职位
const allRole = ref<RoleData[]>([]);
const total = ref(0);

// 对话框显示和隐藏
const dialogVisible = ref(false);

// 收集的新增数据
const RoleParams = reactive<RoleData>({
  roleName: "",
});

// form组件实例
const form = ref<FormInstance>();

// 请求数据
const getHasRole = async (page = 1) => {
  pageNo.value = page;
  const result: RoleResponseData = await reqAllRoleList(
    pageNo.value,
    pageSize.value,
    keyword.value,
  );

  if (result.code === 200) {
    total.value = result.data.total;
    allRole.value = result.data.records;
  }
};
onMounted(() => {
  getHasRole();
});

// 页码变化
const sizeChange = () => {
  getHasRole();
};

// 搜索
const search = () => {
  getHasRole();
  keyword.value = "";
};

// 重置
const reset = () => {
  setttingStore.refresh = !setttingStore.refresh;
};

// 添加职位
const addRole = () => {
  dialogVisible.value = true;

  // 清空数据
  Object.assign(RoleParams, {
    roleName: "",
    id: 0,
  });
  form.value?.clearValidate();
};

// 更新职位
const updateRole = (row: RoleData) => {
  dialogVisible.value = true;
  Object.assign(RoleParams, row);
  form.value?.clearValidate();
};

// 表单校验
const validateRoleName = (_rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("职位不能为空"));
  } else if (value.trim().length < 2) {
    callback(new Error("职位名称至少2位"));
  } else {
    callback();
  }
};
const rules = reactive({
  roleName: [{ required: true, validator: validateRoleName, trigger: "blur" }],
});

// 对话框确认按钮
const save = async () => {
  // 表单校验结果
  await form.value?.validate(async (valid) => {
    if (valid) {
      // 请求添加/更新职位
      const result = await reqAddOrUpdateRole(RoleParams);

      if (result.code === 200) {
        ElMessage.success(RoleParams.id ? "更新成功" : "添加成功");
        dialogVisible.value = false;
        getHasRole(RoleParams.id ? pageNo.value : 1);
      }
    }
  });
};
</script>

<script lang="ts">
export default {
  name: "RoleIndex",
};
</script>

<style scoped lang="scss">
.search-form {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .el-form-item {
    margin-bottom: 0px;
  }
}

.el-card {
  margin-bottom: 10px;
}

.el-table {
  margin: 10px 0;
}
</style>
