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
      <el-button type="primary" @click="addUser">添加用户</el-button>
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
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateUser(row)"
            >
              编辑
            </el-button>
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

    <!-- 抽屉 -->
    <el-drawer v-model="drawer">
      <template #header>
        <h4>添加用户</h4>
      </template>

      <!-- 内容 -->
      <template #default>
        <el-form ref="formRef" :rules="rules" :model="userParams">
          <el-form-item label="用户姓名" prop="username">
            <el-input
              placeholder="请输入用户姓名"
              v-model="userParams.username"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="name">
            <el-input
              placeholder="请输入用户昵称"
              v-model="userParams.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户密码" prop="password">
            <el-input
              type="password"
              placeholder="请输入用户密码"
              v-model="userParams.password"
              show-password
            ></el-input>
          </el-form-item>
        </el-form>
      </template>

      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="save">确定</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from "vue";
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
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";

const pageNo = ref<number>(1);
const pageSize = ref<number>(5);

const total = ref<number>(0);
const userArr = ref<User[]>([]);

const drawer = ref<boolean>(false);

// form组件实例
const formRef = ref<FormInstance>();

// 请求参数
const userParams = reactive<User>({
  username: "",
  name: "",
  password: "",
});

// 校验规则
const validateUsername = (_rule: any, value: any, callback: any) => {
  if (value.trim().length >= 5) {
    callback();
  } else {
    callback(new Error("用户名字至少5位"));
  }
};
const validateName = (_rule: any, value: any, callback: any) => {
  if (value.trim().length >= 5) {
    callback();
  } else {
    callback(new Error("用户昵称至少5位"));
  }
};
const validatePassword = (_rule: any, value: any, callback: any) => {
  if (value.trim().length >= 6) {
    callback();
  } else {
    callback(new Error("用户密码至少6位"));
  }
};
const rules = reactive<FormRules<typeof userParams>>({
  username: [
    {
      required: true,
      message: "请输入用户名字",
      trigger: "blur",
    },
    { validator: validateUsername, trigger: "blur" },
  ],
  name: [
    {
      required: true,
      message: "请输入用户昵称",
      trigger: "blur",
    },
    { validator: validateName, trigger: "blur" },
  ],
  password: [
    {
      required: true,
      message: "请输入用户昵称",
      trigger: "blur",
    },
    { validator: validatePassword, trigger: "blur" },
  ],
});

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

// 添加用户
const addUser = () => {
  drawer.value = true;
  // 清空抽屉存的上次数据
  Object.assign(userParams, {
    username: "",
    name: "",
    password: "",
  });

  nextTick(() => {
    // 清空上传的数据
    formRef.value?.resetFields();
  });
};

// 更新用户抽屉
const updateUser = async (_row: User) => {
  drawer.value = true;
};

// 抽屉的保存按钮
const save = async () => {
  // 表单验证
  await formRef.value?.validate((valid) => {
    console.log(valid);
  });

  // 添加或更新用户
  const result = await reqAddOrUpdateUser(userParams);
  if (result.code === 200) {
    drawer.value = false;
    ElMessage.success(userParams.id ? "更新成功" : "添加成功");
    getHasUser();
  } else {
    drawer.value = false;
    ElMessage.error(userParams.id ? "更新失败" : "添加失败");
  }
};

// 抽屉的关闭抽屉
const cancel = () => {
  drawer.value = false;
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
