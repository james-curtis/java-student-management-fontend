<template>
  <a-spin :spinning="loading">
    <a-form v-bind="formItemLayout">
      <a-row>
        <a-col :span="24">
          <a-form-item label="订单编码" v-bind="validateInfos.orderCode">
            <a-input v-model:value="formData.orderCode" placeholder="请输入订单编码" disabled />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="下单时间" v-bind="validateInfos.xdDate">
            <a-date-picker
              placeholder="请选择下单时间"
              v-model:value="formData.xdDate"
              showTime
              value-format="YYYY-MM-DD HH:mm:ss"
              style="width: 100%"
              :disabled="disabled"
            />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="订单总额" v-bind="validateInfos.money">
            <a-input-number v-model:value="formData.money" placeholder="请输入订单总额" style="width: 100%" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="备注" v-bind="validateInfos.remark">
            <a-input v-model:value="formData.remark" placeholder="请输入备注" :disabled="disabled" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>

    <!-- 子表单区域 -->
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane tab="订单商品" key="cesOrderGoods" :forceRender="true">
        <j-vxe-table
          :keep-source="true"
          resizable
          ref="cesOrderGoodsTableRef"
          :loading="cesOrderGoodsTable.loading"
          :columns="cesOrderGoodsTable.columns"
          :dataSource="cesOrderGoodsTable.dataSource"
          :height="340"
          :disabled="disabled"
          :rowNumber="true"
          :rowSelection="true"
          :toolbar="true"
        />
      </a-tab-pane>
      <a-tab-pane tab="订单客户" key="cesOrderCustomer" :forceRender="true">
        <ces-order-customer-form ref="cesOrderCustomerFormRef" :disabled="disabled" />
      </a-tab-pane>
    </a-tabs>
  </a-spin>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive, computed, toRaw, onMounted } from 'vue';
  import { defHttp } from '/@/utils/http/axios';
  import { useValidateAntFormAndTable } from '/@/hooks/system/useJvxeMethods';
  import { queryCesOrderGoodsListByMainId, queryDataById, saveOrUpdate } from '../CesOrderMain.api';
  import CesOrderCustomerForm from './CesOrderCustomerForm.vue';
  import { JVxeTable } from '/@/components/jeecg/JVxeTable';
  import { cesOrderGoodsColumns } from '../CesOrderMain.data';
  import { Form } from 'ant-design-vue';
  const useForm = Form.useForm;

  export default defineComponent({
    name: 'CesOrderMainForm',
    components: {
      JVxeTable,
      CesOrderCustomerForm,
    },
    props: {
      formDisabled: {
        type: Boolean,
        default: false,
      },
      formData: { type: Object, default: () => {} },
      formBpm: { type: Boolean, default: true },
    },
    emits: ['success'],
    setup(props, { emit }) {
      const loading = ref(false);
      const cesOrderGoodsTableRef = ref();
      const cesOrderGoodsTable = reactive<Record<string, any>>({
        loading: false,
        columns: cesOrderGoodsColumns,
        dataSource: [],
      });
      const cesOrderCustomerFormRef = ref();
      const activeKey = ref('cesOrderGoods');
      const formData = reactive<Record<string, any>>({
        id: '',
        orderCode: '',
        xdDate: '',
        money: '',
        remark: '',
      });

      //表单验证
      const validatorRules = reactive({});
      const { resetFields, validate, validateInfos } = useForm(formData, validatorRules, { immediate: true });
      const dbData = {};
      const formItemLayout = {
        labelCol: { xs: { span: 24 }, sm: { span: 5 } },
        wrapperCol: { xs: { span: 24 }, sm: { span: 16 } },
      };

      // 表单禁用
      const disabled = computed(() => {
        if (props.formBpm === true) {
          if (props.formData.disabled === false) {
            return false;
          } else {
            return true;
          }
        }
        return props.formDisabled;
      });

      function add() {
        resetFields();
        cesOrderGoodsTable.dataSource = [];
        cesOrderCustomerFormRef.value.initFormData();
      }

      async function edit(row) {
        //主表数据
        await queryMainData(row.id);
        //子表数据
        const cesOrderGoodsDataList = await queryCesOrderGoodsListByMainId(row['id']);
        cesOrderGoodsTable.dataSource = [...cesOrderGoodsDataList];
        await cesOrderCustomerFormRef.value.initFormData(row['id']);
      }

      async function queryMainData(id) {
        const row = await queryDataById(id);
        Object.keys(row).map((k) => {
          formData[k] = row[k];
        });
      }

      const { getSubFormAndTableData, transformData } = useValidateAntFormAndTable(activeKey, {
        cesOrderGoods: cesOrderGoodsTableRef,
        cesOrderCustomer: cesOrderCustomerFormRef,
      });

      async function getFormData() {
        await validate();
        return transformData(toRaw(formData));
      }

      async function submitForm() {
        const mainData = await getFormData();
        const subData = await getSubFormAndTableData();
        const values = Object.assign({}, dbData, mainData, subData);
        console.log('表单提交数据', values);
        const isUpdate = values.id ? true : false;
        await saveOrUpdate(values, isUpdate);
        //关闭弹窗
        emit('success');
      }

      function setFieldsValue(values) {
        if (values) {
          Object.keys(values).map((k) => {
            formData[k] = values[k];
          });
        }
      }

      /**
       * 值改变事件触发-树控件回调
       * @param key
       * @param value
       */
      function handleFormChange(key, value) {
        formData[key] = value;
      }

      return {
        cesOrderGoodsTableRef,
        cesOrderGoodsTable,
        cesOrderCustomerFormRef,
        validatorRules,
        validateInfos,
        activeKey,
        loading,
        formData,
        setFieldsValue,
        handleFormChange,
        formItemLayout,
        disabled,
        getFormData,
        submitForm,
        add,
        edit,
      };
    },
  });
</script>
