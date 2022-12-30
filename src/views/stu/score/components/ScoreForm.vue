<template>
  <a-spin :spinning="loading">
    <a-form v-bind="formItemLayout">
      <a-row>
        <a-col :span="24">
          <a-form-item label="学生" v-bind="validateInfos.studentId">
            <j-select-user-by-dept
              v-model:value="formData.studentId"
              :disabled="disabled"
              v-bind="userDeptProps"
              row-key="id"
              :is-radio-selection="true"
            />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="课程" v-bind="validateInfos.courseId">
            <j-popup
              placeholder="请选择课程"
              v-model:value="formData.courseId"
              code="stu_course_select"
              :fieldConfig="[{ source: 'id', target: 'courseId' }]"
              :multi="false"
              :setFieldsValue="setFieldsValue"
              :disabled="disabled"
              label-key="name"
            />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="成绩" v-bind="validateInfos.score">
            <a-input-number v-model:value="formData.score" placeholder="请输入成绩" style="width: 100%" :disabled="disabled" />
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
  import { queryDataById, saveOrUpdate } from '../Score.api';
  import JPopup from '/@/components/Form/src/jeecg/components/JPopup.vue';
  import JSelectUserByDept from '/@/components/Form/src/jeecg/components/JSelectUserByDept.vue';
  import { Form } from 'ant-design-vue';
  const useForm = Form.useForm;

  export default defineComponent({
    name: 'ScoreForm',
    components: {
      JPopup,
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
        studentId: '',
        courseId: '',
        score: '',
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
        studentId: [{ required: true, message: '请输入学生!' }],
        courseId: [{ required: true, message: '请输入课程!' }],
        score: [{ required: true, message: '请输入成绩!' }],
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
