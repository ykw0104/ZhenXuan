<template>
  <div ref="first" style="width: 100%; height: 800px"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as echarts from "echarts";

const first = ref();

onMounted(() => {
  const myChart = echarts.init(first.value);

  myChart.setOption({
    title: {
      text: "ECharts 入门示例",
    },
    tooltip: {},
    xAxis: {
      data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
    },
    yAxis: {},
    series: [
      {
        name: "销量",
        type: "bar",
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  });
});
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  height: 400px;
}
</style>
