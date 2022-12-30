import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { JVxeTypes, JVxeColumn } from '/@/components/jeecg/JVxeTable/types';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '学生',
    align: 'center',
    dataIndex: 'studentId_dictText',
  },
  {
    title: '课程编号',
    align: 'center',
    dataIndex: 'courseId',
  },
  {
    title: '课程名称',
    align: 'center',
    dataIndex: 'courseId_dictText',
  },
  {
    title: '成绩',
    align: 'center',
    dataIndex: 'score',
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '学生',
    field: 'studentId',
    component: 'JSelectUserByDept',
    colProps: { span: 6 },
  },
  {
    label: '课程',
    field: 'courseId',
    component: 'JPopup',
    componentProps: ({ formActionType }) => {
      const { setFieldsValue } = formActionType;
      return {
        setFieldsValue: setFieldsValue,
        code: 'stu_course_select',
        fieldConfig: [{ source: 'id', target: 'courseId' }],
        multi: false,
      };
    },

    colProps: { span: 6 },
  },
  {
    label: '成绩',
    field: 'score',
    component: 'JRangeNumber',
    colProps: { span: 6 },
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '学生',
    field: 'studentId',
    component: 'JSelectUserByDept',
    componentProps: {
      labelKey: 'realname',
    },
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入学生!' }];
    },
  },
  {
    label: '课程',
    field: 'courseId',
    component: 'JPopup',
    componentProps: ({ formActionType }) => {
      const { setFieldsValue } = formActionType;
      return {
        setFieldsValue: setFieldsValue,
        code: 'stu_course_select',
        fieldConfig: [{ source: 'id', target: 'courseId' }],
        multi: false,
      };
    },

    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入课程!' }];
    },
  },
  {
    label: '成绩',
    field: 'score',
    component: 'InputNumber',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入成绩!' }];
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
