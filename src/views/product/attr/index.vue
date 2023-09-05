<template>
  <div>
    <!-- 分类组件-->
    <Category :scene="scene" />

    <!-- 内容 -->
    <el-card style="margin: 10px 0">
      <div v-show="scene === 0">
        <el-button
          type="primary"
          icon="Plus"
          :disabled="!categoryStore.c3Id"
          @click="addAttr"
        >
          添加属性
        </el-button>

        <el-table :data="attrArr" border style="margin: 10px 0">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80px"
          ></el-table-column>

          <el-table-column
            label="属性名称"
            width="120px"
            prop="attrName"
          ></el-table-column>

          <el-table-column label="属性值名称">
            <template #="{ row }">
              <el-tag
                v-for="item in row.attrValueList"
                :key="item.id"
                style="margin: 5px"
              >
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="120px">
            <template #="{ row }">
              <!-- 更新属性 -->
              <el-button
                type="primary"
                size="small"
                icon="Edit"
                @click="updateAttr(row)"
              ></el-button>
              <!-- 删除属性 -->
              <el-popconfirm
                :title="`确认删除${row.attrName}吗?`"
                width="200px"
                @confirm="deleteAttr(row.id)"
              >
                <template #reference>
                  <el-button
                    type="danger"
                    size="small"
                    icon="Delete"
                  ></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div v-show="scene === 1">
        <el-form inline>
          <el-form-item label="属性名称" width="30px">
            <el-input
              v-model="attrParams.attrName"
              placeholder="请输入属性名称"
            ></el-input>
          </el-form-item>
        </el-form>

        <el-button
          type="primary"
          size="default"
          icon="Plus"
          :disabled="!attrParams.attrName"
          @click="addAttrValue"
        >
          添加属性
        </el-button>
        <el-button size="default" @click="cancel">取消</el-button>

        <el-table
          :data="attrParams.attrValueList"
          border
          style="margin: 10px 0"
        >
          <el-table-column
            label="序号"
            width="80px"
            type="index"
            align="center"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{ row, $index }">
              <el-input
                :ref="(vc: any) => (inputArr[$index] = vc)"
                v-if="row.flag"
                v-model="row.valueName"
                placeholder="输入属性值名称"
                size="small"
                @blur="toLook(row, $index)"
              ></el-input>
              <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="属性值操作">
            <template #="{ row, $index }">
              <el-button
                type="danger"
                size="small"
                icon="Delete"
                @click="attrParams.attrValueList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-button
          type="primary"
          size="default"
          icon="Crop"
          :disabled="attrParams.attrValueList.length === 0"
          @click="save"
        >
          保存
        </el-button>
        <el-button size="default" @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import useCategoryStore from "@/store/modules/category";
import { ref, watch, reactive, nextTick, onBeforeUnmount } from "vue";
import { reqAttr, reqAddOrUpdateAttr, reqRemoveAttr } from "@/api/product/attr";
import type {
  AttrResponseData,
  Attr,
  AttrValue,
} from "@/api/product/attr/type";
import { ElMessage } from "element-plus";

// 卡片内容的切换
const scene = ref<number>(0);
const attrArr = ref<Attr[]>([]);
const categoryStore = useCategoryStore();
// 请求的添加属性
const attrParams = reactive<Attr>({
  attrName: "",
  attrValueList: [],
  categoryId: "",
  categoryLevel: 3,
});
// 获取input组件实例
const inputArr = ref<any>([]);

// 获取属性/属性值
const getAttr = () => {
  const { c1Id, c2Id, c3Id } = categoryStore;

  reqAttr(c1Id, c2Id, c3Id)
    .then((result: AttrResponseData) => {
      // 保存数据
      attrArr.value = result.data;
    })
    .catch((error) => {
      ElMessage.error(error);
    });
};

watch(
  () => categoryStore.c3Id,
  () => {
    attrArr.value = [];
    categoryStore.c3Id && getAttr();
  },
  {
    immediate: true,
  },
);

// 添加属性
const addAttr = () => {
  // 初始化和清空数据
  Object.assign(attrParams, {
    attrName: "",
    attrValueList: [],
    categoryId: categoryStore.c3Id,
    categoryLevel: 3,
  });

  scene.value = 1;
};

// 添加属性值
const addAttrValue = () => {
  attrParams.attrValueList.push({ valueName: "", flag: true });

  // 最后的input聚焦
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus();
  });
};

// 修改属性
const updateAttr = (row: Attr) => {
  scene.value = 1;

  Object.assign(attrParams, JSON.parse(JSON.stringify(row)));
};

// 保存
const save = async () => {
  const result: any = await reqAddOrUpdateAttr(attrParams);
  if (result.code === 200) {
    scene.value = 0;
    ElMessage.success(attrParams.id ? "修改成功" : "添加成功");
    getAttr();
  } else {
    ElMessage.error(attrParams.id ? "修改失败" : "添加失败");
  }
};

// 取消
const cancel = () => {
  scene.value = 0;
};

// 编辑 - > 查看
const toLook = (row: AttrValue, $index: number) => {
  // 不能为空
  if (row.valueName.trim() === "") {
    attrParams.attrValueList.splice($index, 1);
    ElMessage.warning("属性值不能为空");
    return;
  }

  // 不能重复
  const repeat = attrParams.attrValueList.find((item) => {
    if (item !== row) {
      return item.valueName === row.valueName;
    }
  });
  if (repeat) {
    attrParams.attrValueList.splice($index, 1);
    ElMessage.warning("属性值重复");
    return;
  }

  row.flag = false;
};

// 查看 -> 编辑
const toEdit = (row: AttrValue, $index: number) => {
  row.flag = true;
  nextTick(() => {
    inputArr.value[$index].focus();
  });
};

// 删除属性
const deleteAttr = async (attrId: number) => {
  const result: any = await reqRemoveAttr(attrId);
  if (result.code === 200) {
    ElMessage.success("删除成功");
    getAttr();
  } else {
    ElMessage.error("删除失败");
  }
};

onBeforeUnmount(() => {
  categoryStore.$reset();
});
</script>

<script lang="ts">
export default {
  name: "AttrIndex",
};
</script>

<style scoped lang="scss"></style>
