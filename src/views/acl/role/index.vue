<template>
  <div>
    <el-card>
      <el-form>
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
      <el-button type="primary" icon="Plus">添加职位</el-button>
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
            <el-button type="primary" icon="Edit" size="small">编辑</el-button>
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

const setttingStore = useLayOutSettingStore();

const pageNo = ref(1);
const pageSize = ref(10);
// 搜索关键字
const keyword = ref("");

// 所有职位
const allRole = ref<RoleData[]>([]);
const total = ref(0);

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
</script>

<script lang="ts">
export default {
  name: "RoleIndex",
};
</script>

<style scoped lang="scss">
.el-form {
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
