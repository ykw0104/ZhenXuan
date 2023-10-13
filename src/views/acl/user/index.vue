<template>
  <div>
    <el-card>
      <el-form inline class="form">
        <el-form-item label="用户名:">
          <el-input placeholder="请输入用户名"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card style="margin: 10px 0">
      <el-button type="primary">添加用户</el-button>
      <el-button type="danger">批量删除</el-button>

      <!-- 表格展示 -->
      <el-table :data="userArr" style="margin: 10px 0" border>
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column
          type="index"
          label="#"
          align="center"
        ></el-table-column>
        <el-table-column prop="id" label="id" align="center"></el-table-column>
        <el-table-column
          prop="username"
          label="用户名字"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="name"
          label="用户名称"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="roleName"
          label="用户角色"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新时间"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="操作"
          width="280px"
          fixed="right"
          align="center"
        >
          <template #="{ row }">
            <el-button type="primary" size="small" icon="User">
              分配角色
            </el-button>
            <el-button type="primary" size="small" icon="Edit">编辑</el-button>
            <el-button type="danger" size="small" icon="Delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[5, 7, 9, 11]"
        :background="true"
        layout="prev, pager, next, jumper,->,sizes,total"
        :total="total"
        @current-change="getHasUser"
        @size-change="handler"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  reqUserInfo,
  reqAddOrUpdateUser,
  reqAllRole,
  reqSetUserRole,
  reqRemoveUser,
  reqSelectUser,
} from "@/api/acl/user/index.ts";
import type {
  SetRoleData,
  UserResponseData,
  Records,
  User,
  AllRoleResponseData,
  AllRole,
} from "@/api/acl/user/type";

const pageNo = ref<number>(1);
const pageSize = ref<number>(5);

const total = ref<number>(0);
const userArr = ref<User[]>([]);

onMounted(() => {
  getHasUser();
});
const getHasUser = async (pager = 1) => {
  pageNo.value = pager;
  const result: UserResponseData = await reqUserInfo(
    pageNo.value,
    pageSize.value,
  );
  if (result.code === 200) {
    total.value = result.data.total;
    userArr.value = result.data.records;
  }
};

const handler = () => {
  getHasUser();
};
</script>

<script lang="ts">
export default {
  name: "UserIndex",
};
</script>

<style scoped lang="scss">
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .el-form-item {
    margin: 0;
  }
}
</style>
