<template>
  <a-spin :spinning="loading">
    <a-form v-bind="formItemLayout">
      <a-row>
        <a-col :span="24">
          <a-form-item label="班级名称" v-bind="validateInfos.name">
            <a-input v-model:value="formData.name" placeholder="请输入班级名称" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="年级" v-bind="validateInfos.grade">
            <j-dict-select-tag v-model:value="formData.grade" dictCode="grade" placeholder="请选择年级" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="班主任" v-bind="validateInfos.classTeacher">
            <j-select-user-by-dept
              v-bind="userDeptProps"
              v-model:value="formData.classTeacher"
              :disabled="disabled"
              row-key="id"
              :is-radio-selection="true"
            />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="所属专业" v-bind="validateInfos.major">
            <j-select-dept v-model:value="formData.major" :multiple="false" checkStrictly :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="所属学院" v-bind="validateInfos.collegeId">
            <j-select-dept v-model:value="formData.collegeId" :multiple="false" checkStrictly :disabled="disabled" />
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
  import { queryDataById, saveOrUpdate } from '../StuClass.api';
  import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
  import JSelectDept from '/@/components/Form/src/jeecg/components/JSelectDept.vue';
  import JSelectUserByDept from '/@/components/Form/src/jeecg/components/JSelectUserByDept.vue';
  import { Form } from 'ant-design-vue';
  const useForm = Form.useForm;

  export default defineComponent({
    name: 'StuClassForm',
    components: {
      JDictSelectTag,
      JSelectDept,
      JSelectUserByDept,
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
        grade: '',
        classTeacher: '',
        major: '',
        collegeId: '',
      });

      const userDeptProps = {
        columns: [
          {
            title: '用户账号',
            dataIndex: 'username',
            width: 50,
          },
          {
            title: '用户姓名',
            dataIndex: 'realname',
            width: 50,
          },
          {
            title: '性别',
            dataIndex: 'sex_dictText',
            width: 20,
          },
          {
            title: '身份',
            dataIndex: 'post_dictText',
            width: 50,
          },
          {
            title: '部门',
            dataIndex: 'orgCodeTxt',
            width: 50,
          },
        ],
      };
      //表单验证
      const validatorRules = reactive({
        name: [{ required: true, message: '请输入班级名称!' }],
        grade: [{ required: true, message: '请输入年级!' }],
        major: [{ required: true, message: '请输入所属专业!' }],
        collegeId: [{ required: true, message: '请输入所属学院!' }],
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
        // resetFields();
        formData.id = '';
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
        userDeptProps,
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
