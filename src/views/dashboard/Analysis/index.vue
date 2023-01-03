<template>
  <suspense>
    <div>
      <IndexDef v-if="indexStyle === 0" />
      <IndexChart v-if="indexStyle === 1" />
      <IndexBdc v-if="indexStyle === 2" />
      <IndexTask v-if="indexStyle === 3" />
      <index-student v-if="indexStyle === 4" />
      <div style="width: 100%; text-align: right; margin-top: 20px">
        请选择首页样式：
        <a-radio-group v-model:value="indexStyle">
          <a-radio :value="0">默认</a-radio>
          <a-radio :value="1">销量统计</a-radio>
          <a-radio :value="2">业务统计</a-radio>
          <a-radio :value="3">我的任务</a-radio>
          <a-radio :value="4">学生管理系统</a-radio>
        </a-radio-group>
      </div>
    </div>
  </suspense>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import IndexDef from './homePage/IndexDef.vue';
  import IndexChart from './homePage/IndexChart.vue';
  import IndexBdc from './homePage/IndexBdc.vue';
  import IndexTask from './homePage/IndexTask.vue';
  import IndexStudent from './homePage/IndexStudent.vue';

  const indexStyle = ref(4);
</script>
