<template>
  <a-spin :spinning="loading">
    <a-form v-bind="formItemLayout">
      <a-row>
        <a-col :span="24">
          <a-form-item label="课程名称" v-bind="validateInfos.name">
            <a-input v-model:value="formData.name" placeholder="请输入课程名称" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="科目编号" v-bind="validateInfos.subjectId">
            <j-popup
              placeholder="请选择科目编号"
              v-model:value="formData.subjectId"
              code="stu_subject_selector"
              :fieldConfig="[{ source: 'id', target: 'subjectId' }]"
              :multi="false"
              :setFieldsValue="setFieldsValue"
              :disabled="disabled"
            />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="开课单位" v-bind="validateInfos.courseOpeningDepart">
            <j-select-dept v-model:value="formData.courseOpeningDepart" :multiple="false" checkStrictly :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="开课学期" v-bind="validateInfos.offerTerm">
            <j-dict-select-tag v-model:value="formData.offerTerm" dictCode="academic_year_term" placeholder="请选择开课学期" :disabled="disabled" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>

    <!-- 子表单区域 -->
    <a-tabs v-model:activeKey="activeKey" />
  </a-spin>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive, computed, toRaw, onMounted } from 'vue';
  import { defHttp } from '/@/utils/http/axios';
  import { useValidateAntFormAndTable } from '/@/hooks/system/useJvxeMethods';
  import { queryDataById, saveOrUpdate } from '../TeachingPlan.api';
  import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
  import JPopup from '/@/components/Form/src/jeecg/components/JPopup.vue';
  import JSelectDept from '/@/components/Form/src/jeecg/components/JSelectDept.vue';
  import { Form } from 'ant-design-vue';
  const useForm = Form.useForm;

  export default defineComponent({
    name: 'TeachingPlanForm',
    components: {
      JDictSelectTag,
      JPopup,
      JSelectDept,
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
      const activeKey = ref('');
      const formData = reactive<Record<string, any>>({
        id: '',
        name: '',
        subjectId: '',
        courseOpeningDepart: '',
        offerTerm: '',
      });

      //表单验证
      const validatorRules = reactive({
        name: [{ required: true, message: '请输入课程名称!' }],
        subjectId: [{ required: true, message: '请输入科目编号!' }],
        courseOpeningDepart: [{ required: true, message: '请输入开课单位!' }],
        offerTerm: [{ required: true, message: '请输入开课学期!' }],
      });
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
      }

      async function edit(row) {
        //主表数据
        await queryMainData(row.id);
        //子表数据
      }

      async function queryMainData(id) {
        const row = await queryDataById(id);
        Object.keys(row).map((k) => {
          formData[k] = row[k];
        });
      }

      const { getSubFormAndTableData, transformData } = useValidateAntFormAndTable(activeKey, {});

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
