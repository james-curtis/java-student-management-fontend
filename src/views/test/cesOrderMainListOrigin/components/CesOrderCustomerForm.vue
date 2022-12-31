<template>
  <a-spin :spinning="loading">
    <a-form v-bind="formItemLayout">
      <a-row>
        <a-col :span="24">
          <a-form-item label="客户名字" v-bind="validateInfos.name">
            <j-popup
              placeholder="请选择客户名字"
              v-model:value="formData.name"
              code="tj_user_report"
              :fieldConfig="[
                { source: 'realname', target: 'name' },
                { source: 'sex', target: 'sex' },
                { source: 'birthday', target: 'birthday' },
              ]"
              :multi="true"
              :setFieldsValue="setFieldsValue"
              :disabled="disabled"
            />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="客户性别" v-bind="validateInfos.sex">
            <j-dict-select-tag v-model:value="formData.sex" dictCode="sex" placeholder="请选择客户性别" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="客户生日" v-bind="validateInfos.birthday">
            <a-date-picker
              placeholder="请选择客户生日"
              v-model:value="formData.birthday"
              showTime
              value-format="YYYY-MM-DD HH:mm:ss"
              style="width: 100%"
              :disabled="disabled"
            />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="年龄" v-bind="validateInfos.age">
            <a-input-number v-model:value="formData.age" placeholder="请输入年龄" style="width: 100%" :disabled="disabled" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="常用地址" v-bind="validateInfos.address">
            <a-input v-model:value="formData.address" placeholder="请输入常用地址" :disabled="disabled" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-spin>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive, toRaw } from 'vue';
  import { queryCesOrderCustomerListByMainId } from '../CesOrderMain.api';
  import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
  import JPopup from '/@/components/Form/src/jeecg/components/JPopup.vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { Form } from 'ant-design-vue';
  const useForm = Form.useForm;

  export default defineComponent({
    name: 'CesOrderCustomerForm',
    components: {
      JDictSelectTag,
      JPopup,
    },
    props: {
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    setup() {
      const { createMessage } = useMessage();
      const isForm = true;
      const loading = ref(false);
      const formData = reactive<Record<string, any>>({
        id: '',
        name: '',
        sex: '',
        birthday: '',
        age: '',
        address: '',
      });
      //表单验证
      const validatorRules = reactive({});
      const { resetFields, validate, validateInfos } = useForm(formData, validatorRules, { immediate: true });
      const formItemLayout = {
        labelCol: { xs: { span: 24 }, sm: { span: 5 } },
        wrapperCol: { xs: { span: 24 }, sm: { span: 16 } },
      };

      async function initFormData(mainId) {
        resetFields();
        if (mainId) {
          const list = await queryCesOrderCustomerListByMainId(mainId);
          if (list && list.length > 0) {
            const temp = list[0];
            Object.keys(temp).map((k) => {
              formData[k] = temp[k];
            });
          }
        }
      }

      async function getFormData() {
        await validate();
        const subFormData = toRaw(formData);
        if (Object.keys(subFormData).length > 0) {
          return subFormData;
        }
        return false;
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
        loading,
        formData,
        formItemLayout,
        initFormData,
        getFormData,
        setFieldsValue,
        handleFormChange,
        isForm,
        validateInfos,
      };
    },
  });
</script>
