<template>
  <div>
    <BasicTable class="table-area" @register="registerTable" :rowSelection="rowSelection" :search-info="searchInfo">
      <!--插槽:table标题-->
      <template #tableTitle>
        <a-button type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined"> 新增 </a-button>
        <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出 </a-button>
        <j-upload-button type="primary" preIcon="ant-design:import-outlined" @click="onImportXls"> 导入 </j-upload-button>
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="batchHandleDelete">
                <Icon icon="ant-design:delete-outlined" />
                删除
              </a-menu-item>
            </a-menu>
          </template>
          <a-button
            >批量操作
            <Icon icon="mdi:chevron-down" />
          </a-button>
        </a-dropdown>
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)" />
      </template>
      <!--字段回显插槽-->
      <template #htmlSlot="{ text }">
        <div v-html="text"></div>
      </template>
      <!--省市区字段回显插槽-->
      <template #pcaSlot="{ text }">
        {{ getAreaTextByCode(text) }}
      </template>
      <template #fileSlot="{ text }">
        <span v-if="!text" style="font-size: 12px; font-style: italic">无文件</span>
        <a-button v-else :ghost="true" type="primary" preIcon="ant-design:download-outlined" size="small" @click="downloadFile(text)">下载 </a-button>
      </template>
    </BasicTable>
    <ScoreModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>

<script lang="tsx" setup>
  import { ref, reactive, computed, unref, inject, watch, h } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { useModal } from '/@/components/Modal';
  import ScoreModal from './components/ScoreModal.vue';
  import { scoreColumns as columns, scoreFormSchema as searchFormSchema } from './user.data';
  import {
    scoreList as list,
    scoreDelete as deleteOne,
    scoreDeleteBatch as batchDelete,
    scoreImportUrl as getImportUrl,
    scoreExportXlsUrl as getExportUrl,
    getScoreStat,
  } from './user.api';
  import { downloadFile } from '/@/utils/common/renderUtils';
  import { isEmpty } from '/@/utils/is';
  import { useMessage } from '/@/hooks/web/useMessage';

  //接收主表id
  const mainId = inject('mainId') || '';
  const selectedRow = inject('selectedRow') || [];
  //提示弹窗
  const $message = useMessage();
  const checkedKeys = ref<Array<string | number>>([]);
  //注册model
  const [registerModal, { openModal }] = useModal();
  const searchInfo = reactive({});

  const scoreStat = reactive({
    total: 0,
    average: 0,
  });

  async function reloadScoreStat() {
    const stat = await getScoreStat(unref(mainId) as string);
    Object.assign(scoreStat, stat);
  }
  function useSummaryRows(tableData: Recordable[]) {
    reloadScoreStat();
    const currentScoreTotal = tableData.reduce((prev, next) => {
      prev += next.score;
      return prev;
    }, 0);
    return [
      {
        studentId_dictText: <div style={{ textAlign: 'left' }}>当前页平均值</div>,
        score: Number(currentScoreTotal / tableData.length).toFixed(2),
      },
      {
        studentId_dictText: <div style={{ textAlign: 'left' }}>当前页合计</div>,
        score: Number(currentScoreTotal).toFixed(2),
      },
      {
        studentId_dictText: <div style={{ textAlign: 'left' }}>总平均值</div>,
        score: Number(scoreStat.average).toFixed(2),
      },
      {
        studentId_dictText: <div style={{ textAlign: 'left' }}>总合计</div>,
        score: Number(scoreStat.total).toFixed(2),
      },
    ];
  }
  //注册table数据
  const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
      title: '学生成绩',
      api: list,
      columns,
      canResize: false,
      useSearchForm: false,
      actionColumn: {
        width: 120,
        fixed: 'right',
      },
      showSummary: true,
      summaryFunc: useSummaryRows,
      footerTableProps: { rowSelection: { type: 'checkbox' } },
    },
    exportConfig: {
      name: '学生成绩',
      url: getExportUrl,
    },
    importConfig: {
      url: getImportUrl,
      success: handleSuccess,
    },
  });

  const [registerTable, { reload }, { rowSelection, selectedRowKeys }] = tableContext;

  watch(mainId, async () => {
    searchInfo['studentId'] = unref(mainId);
    reload();
  });

  /**
   * 新增事件
   */
  function handleAdd() {
    if (isEmpty(unref(mainId))) {
      $message.createMessage.warning('请选择一个主表信息');
      return;
    }
    const selectedRowRaw = unref(selectedRow);
    openModal(true, {
      isUpdate: false,
      showFooter: true,
      record: { studentId: [{ label: selectedRowRaw['realname'], value: selectedRowRaw['id'] }] },
    });
  }

  /**
   * 编辑事件
   */
  function handleEdit(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
      showFooter: true,
    });
  }

  /**
   * 详情
   */
  function handleDetail(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
      showFooter: false,
    });
  }

  /**
   * 删除事件
   */
  async function handleDelete(record) {
    await deleteOne({ id: record.id }, handleSuccess);
  }

  /**
   * 批量删除事件
   */
  async function batchHandleDelete() {
    await batchDelete({ ids: selectedRowKeys.value }, handleSuccess);
  }

  /**
   * 成功回调
   */
  function handleSuccess() {
    (selectedRowKeys.value = []) && reload();
  }

  /**
   * 操作栏
   */
  function getTableAction(record) {
    return [
      {
        label: '编辑',
        onClick: handleEdit.bind(null, record),
      },
    ];
  }

  /**
   * 下拉操作栏
   */
  function getDropDownAction(record) {
    return [
      {
        label: '详情',
        onClick: handleDetail.bind(null, record),
      },
      {
        label: '删除',
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, record),
        },
      },
    ];
  }
</script>
<style lang="less" scoped>
  .jeecg-basic-table-form-container {
    .table-page-search-submitButtons {
      display: block;
      margin-bottom: 24px;
      white-space: nowrap;
    }

    .query-group-cust {
      width: calc(50% - 15px);
      min-width: 100px !important;
    }

    .query-group-split-cust {
      width: 30px;
      display: inline-block;
      text-align: center;
    }

    &.p-0 {
      padding: 0;
    }
  }

  @import '/@/assets/less/BasicTable.less';

  .table-area {
    .footerTableAlign();
  }
</style>
