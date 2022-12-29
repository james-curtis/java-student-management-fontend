import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { JVxeTypes, JVxeColumn } from '/@/components/jeecg/JVxeTable/types';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '科目编号',
    align: 'center',
    dataIndex: 'id',
    width: '15%',
  },
  {
    title: '科目名称',
    align: 'center',
    dataIndex: 'name',
  },
  {
    title: '创建日期',
    align: 'center',
    sorter: true,
    dataIndex: 'createTime',
    width: '15%',
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '科目名称',
    field: 'name',
    component: 'Input',
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
    label: '科目名称',
    field: 'name',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入科目名称!' }];
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
