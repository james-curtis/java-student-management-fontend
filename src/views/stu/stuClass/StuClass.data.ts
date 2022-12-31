import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { JVxeTypes, JVxeColumn } from '/@/components/jeecg/JVxeTable/types';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '班级名称',
    align: 'center',
    dataIndex: 'name',
  },
  {
    title: '年级',
    align: 'center',
    dataIndex: 'grade_dictText',
  },
  {
    title: '班主任',
    align: 'center',
    dataIndex: 'classTeacher_dictText',
  },
  {
    title: '所属专业',
    align: 'center',
    dataIndex: 'major_dictText',
  },
  {
    title: '所属学院',
    align: 'center',
    dataIndex: 'collegeId_dictText',
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '班级名称',
    field: 'name',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '年级',
    field: 'grade',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'grade',
    },
    colProps: { span: 6 },
  },
  {
    label: '班主任',
    field: 'classTeacher',
    component: 'JSelectUserByDept',
    colProps: { span: 6 },
  },
  {
    label: '所属专业',
    field: 'major',
    component: 'JSelectDept',
    colProps: { span: 6 },
  },
  {
    label: '所属学院',
    field: 'collegeId',
    component: 'JSelectDept',
    colProps: { span: 6 },
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '班级名称',
    field: 'name',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入班级名称!' }];
    },
  },
  {
    label: '年级',
    field: 'grade',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'grade',
    },
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入年级!' }];
    },
  },
  {
    label: '班主任',
    field: 'classTeacher',
    component: 'JSelectUserByDept',
    componentProps: {
      labelKey: 'realname',
    },
  },
  {
    label: '所属专业',
    field: 'major',
    component: 'JSelectDept',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入所属专业!' }];
    },
  },
  {
    label: '所属学院',
    field: 'collegeId',
    component: 'JSelectDept',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入所属学院!' }];
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
