import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { JVxeTypes, JVxeColumn } from '/@/components/jeecg/JVxeTable/types';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '课程编号',
    align: 'center',
    dataIndex: 'id',
    width: '11%',
  },
  {
    title: '课程名称',
    align: 'center',
    dataIndex: 'name',
  },
  {
    title: '及格分数',
    align: 'center',
    dataIndex: 'passMark',
    width: '5%',
  },
  {
    title: '科目编号',
    align: 'center',
    dataIndex: 'subjectId',
    width: '11%',
  },
  {
    title: '科目名称',
    align: 'center',
    dataIndex: 'subjectId_dictText',
  },
  {
    title: '开课单位',
    align: 'center',
    dataIndex: 'courseOpeningDepart_dictText',
  },
  {
    title: '开课学期',
    align: 'center',
    sorter: true,
    dataIndex: 'offerTerm_dictText',
    width: '10%',
  },
  {
    title: '创建日期',
    align: 'center',
    sorter: true,
    dataIndex: 'createTime',
    width: '10%',
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '课程名称',
    field: 'name',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '科目编号',
    field: 'subjectId',
    component: 'JPopup',
    componentProps: ({ formActionType }) => {
      const { setFieldsValue } = formActionType;
      return {
        setFieldsValue: setFieldsValue,
        code: 'stu_subject_selector',
        fieldConfig: [{ source: 'id', target: 'subjectId' }],
        multi: false,
      };
    },

    colProps: { span: 6 },
  },
  {
    label: '开课单位',
    field: 'courseOpeningDepart',
    component: 'JSelectDept',
    colProps: { span: 6 },
  },
  {
    label: '开课学期',
    field: 'offerTerm',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'academic_year_term',
    },
    colProps: { span: 6 },
  },
  {
    label: '创建日期',
    field: 'createTime',
    component: 'RangePicker',
    componentProps: {
      showTime: true,
    },
    colProps: { span: 6 },
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '课程名称',
    field: 'name',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入课程名称!' }];
    },
  },
  {
    label: '科目编号',
    field: 'subjectId',
    component: 'JPopup',
    componentProps: ({ formActionType }) => {
      const { setFieldsValue } = formActionType;
      return {
        setFieldsValue: setFieldsValue,
        code: 'stu_subject_selector',
        fieldConfig: [{ source: 'id', target: 'subjectId' }],
        multi: false,
      };
    },

    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入科目编号!' }];
    },
  },
  {
    label: '开课单位',
    field: 'courseOpeningDepart',
    component: 'JSelectDept',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入开课单位!' }];
    },
  },
  {
    label: '开课学期',
    field: 'offerTerm',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'academic_year_term',
    },
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入开课学期!' }];
    },
  },
  // TODO 主键隐藏字段，目前写死为ID
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
];
//子表单数据
//子表表格配置
