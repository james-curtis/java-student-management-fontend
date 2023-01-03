<template>
  <div class="p-4">
    <GrowCard :loading="loading" class="enter-y" />
    <SiteAnalysis class="!mt-4 enter-y" :loading="loading" />
    <a-row>
      <a-col :span="24">
        <a-card :loading="loading" :bordered="false" title="最近一周访问量统计" :style="{ marginTop: '24px' }">
          <a-row>
            <a-col :span="6">
              <HeadInfo title="今日IP" :content="loginfo.todayIp" icon="environment" />
            </a-col>
            <a-col :span="6">
              <HeadInfo title="今日访问" :content="loginfo.todayVisitCount" icon="team" />
            </a-col>
            <a-col :span="6">
              <HeadInfo title="总访问量" :content="loginfo.totalVisitCount" icon="rise" />
            </a-col>
          </a-row>
          <LineMulti :chartData="lineMultiData" height="50vh" type="line" :option="{ legend: { top: 'bottom' } }" />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import GrowCard from '../components/GrowCard.vue';
  import SiteAnalysis from '../components/SiteAnalysis.vue';
  import LineMulti from '/@/components/chart/LineMulti.vue';
  import HeadInfo from '/@/components/chart/HeadInfo.vue';
  import { getLoginfo, getVisitInfo } from '../api';

  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
  }, 500);

  const loginfo = ref({});
  const lineMultiData = ref([]);

  function initLogInfo() {
    getLoginfo(null).then((res) => {
      if (res.success) {
        Object.keys(res.result).forEach((key) => {
          res.result[key] = res.result[key] + '';
        });
        loginfo.value = res.result;
      }
    });
    getVisitInfo(null).then((res) => {
      if (res.success) {
        lineMultiData.value = [];
        res.result.forEach((item) => {
          lineMultiData.value.push({ name: item.type, type: 'ip', value: item.ip });
          lineMultiData.value.push({ name: item.type, type: 'visit', value: item.visit });
        });
      }
    });
  }

  initLogInfo();
</script>
