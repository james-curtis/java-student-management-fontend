import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '单价',
    align: 'center',
    dataIndex: 'price',
  },
  {
    title: '用户名',
    align: 'center',
    dataIndex: 'name',
  },
  {
    title: '密码',
    align: 'center',
    dataIndex: 'miMa',
  },
  {
    title: '字典下拉',
    align: 'center',
    dataIndex: 'xiala_dictText',
  },
  {
    title: '字典单选',
    align: 'center',
    dataIndex: 'danxuan_dictText',
  },
  {
    title: '字典多选',
    align: 'center',
    dataIndex: 'duoxuan_dictText',
  },
  {
    title: '开关',
    align: 'center',
    dataIndex: 'kaiguan',
    customRender: ({ text }) => {
      return render.renderSwitch(text, [
        { text: '是', value: '1' },
        { text: '否', value: '2' },
      ]);
    },
  },
  {
    title: '日期',
    align: 'center',
    dataIndex: 'riqi',
    customRender: ({ text }) => {
      return !text ? '' : text.length > 10 ? text.substr(0, 10) : text;
    },
  },
  {
    title: '年月日时分秒',
    align: 'center',
    dataIndex: 'nyrsfm',
  },
  {
    title: '时间',
    align: 'center',
    dataIndex: 'shijian',
  },
  {
    title: '文件',
    align: 'center',
    dataIndex: 'wenjian',
    slots: { customRender: 'fileSlot' },
  },
  {
    title: '图片',
    align: 'center',
    dataIndex: 'tupian',
    customRender: render.renderImage,
  },
  {
    title: '多行文本框',
    align: 'center',
    dataIndex: 'dhwb',
  },
  {
    title: '字典下拉多选框',
    align: 'center',
    dataIndex: 'xldx_dictText',
  },
  {
    title: '字典表下拉搜索框',
    align: 'center',
    dataIndex: 'xlss_dictText',
  },
  {
    title: 'popup弹窗',
    align: 'center',
    dataIndex: 'popup',
  },
  {
    title: 'popback',
    align: 'center',
    dataIndex: 'popback',
  },
  {
    title: '分类字典树',
    align: 'center',
    dataIndex: 'flzds',
    customRender: ({ text }) => {
      return render.renderCategoryTree(text, 'B02');
    },
  },
  {
    title: '部门选择',
    align: 'center',
    dataIndex: 'bmxz_dictText',
  },
  {
    title: '用户选择',
    align: 'center',
    dataIndex: 'yhxz_dictText',
  },
  {
    title: '省市区',
    align: 'center',
    dataIndex: 'shq',
    slots: { customRender: 'pcaSlot' },
  },
  {
    title: '联动组件一',
    align: 'center',
    dataIndex: 'ldzuy',
  },
  {
    title: '联动组件二',
    align: 'center',
    dataIndex: 'ldzje',
  },
  {
    title: '联动组件三',
    align: 'center',
    dataIndex: 'ldzjs',
  },
  {
    title: '自定义树',
    align: 'center',
    dataIndex: 'zdys_dictText',
  },
  {
    title: 'double类型',
    align: 'center',
    dataIndex: 'yuanjia',
  },
  {
    title: 'integer类型',
    align: 'center',
    dataIndex: 'geshu',
  },
  {
    title: '唯一检验',
    align: 'center',
    dataIndex: 'jycs',
  },
  {
    title: '输入2到10位的字母',
    align: 'center',
    dataIndex: 'province',
  },
  {
    title: '自定义查询',
    align: 'center',
    dataIndex: 'zdmrz',
  },
  {
    title: '字典表下拉',
    align: 'center',
    dataIndex: 'zdbxl_dictText',
  },
  {
    title: '字典表单选',
    align: 'center',
    dataIndex: 'zdbdx_dictText',
  },
  {
    title: '字典表多选',
    align: 'center',
    dataIndex: 'zdbduoxuan_dictText',
  },
  {
    title: '字典表下拉多选',
    align: 'center',
    dataIndex: 'zdbxldx_dictText',
  },
  {
    title: '字典表带条件下拉',
    align: 'center',
    dataIndex: 'zddtjxl_dictText',
  },
  {
    title: '字典表带条件单选',
    align: 'center',
    dataIndex: 'zddtjdx_dictText',
  },
  {
    title: '字典表带条件多选',
    align: 'center',
    dataIndex: 'zddtjduox_dictText',
  },
  {
    title: '字典表带条件下拉多选',
    align: 'center',
    dataIndex: 'zddtjxldx_dictText',
  },
  {
    title: '字典表带条件下拉搜索',
    align: 'center',
    dataIndex: 'zddtjxlss_dictText',
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '用户名',
    field: 'name',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    label: '字典下拉',
    field: 'xiala',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'sex',
    },
    colProps: { span: 6 },
  },
  {
    label: '日期',
    field: 'riqi',
    component: 'RangePicker',
    colProps: { span: 6 },
  },
  {
    label: '时间',
    field: 'shijian',
    component: 'Input', //TODO 范围查询
    colProps: { span: 6 },
  },
  {
    label: '字典表下拉搜索框',
    field: 'xlss',
    component: 'JSearchSelect',
    componentProps: {
      dict: 'sys_user,realname,username',
    },
    colProps: { span: 6 },
  },
  {
    label: '部门选择',
    field: 'bmxz',
    component: 'JSelectDept',
    colProps: { span: 6 },
  },
  {
    label: '用户选择',
    field: 'yhxz',
    component: 'JSelectUserByDept',
    colProps: { span: 6 },
  },
  {
    label: '省市区',
    field: 'shq',
    component: 'JAreaLinkage',
    colProps: { span: 6 },
  },
  {
    label: '自定义查询',
    field: 'zdmrz',
    component: 'Input',
    colProps: { span: 6 },
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '单价',
    field: 'price',
    component: 'InputNumber',
  },
  {
    label: '用户名',
    field: 'name',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入用户名!' }];
    },
  },
  {
    label: '密码',
    field: 'miMa',
    component: 'InputPassword',
  },
  {
    label: '字典下拉',
    field: 'xiala',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'sex',
    },
  },
  {
    label: '字典单选',
    field: 'danxuan',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'sex',
    },
  },
  {
    label: '字典多选',
    field: 'duoxuan',
    component: 'JSelectMultiple',
    componentProps: {
      dictCode: 'urgent_level',
    },
  },
  {
    label: '开关',
    field: 'kaiguan',
    component: 'JSwitch',
    componentProps: {
      options: [1, 2],
    },
  },
  {
    label: '日期',
    field: 'riqi',
    component: 'DatePicker',
  },
  {
    label: '年月日时分秒',
    field: 'nyrsfm',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '时间',
    field: 'shijian',
    component: 'TimePicker',
    componentProps: {
      valueFormat: 'HH:mm:ss',
    },
  },
  {
    label: '文件',
    field: 'wenjian',
    component: 'JUpload',
    componentProps: {},
  },
  {
    label: '图片',
    field: 'tupian',
    component: 'JImageUpload',
    componentProps: {},
  },
  {
    label: '多行文本框',
    field: 'dhwb',
    component: 'InputTextArea',
  },
  {
    label: '字典下拉多选框',
    field: 'xldx',
    component: 'JSelectMultiple',
    componentProps: {
      dictCode: 'urgent_level',
    },
  },
  {
    label: '字典表下拉搜索框',
    field: 'xlss',
    component: 'JSearchSelect',
    componentProps: {
      dict: 'sys_user,realname,username',
    },
  },
  {
    label: 'popup弹窗',
    field: 'popup',
    component: 'JPopup',
    componentProps: ({ formActionType }) => {
      const { setFieldsValue } = formActionType;
      return {
        setFieldsValue: setFieldsValue,
        code: 'report_user',
        fieldConfig: [
          { source: 'username', target: 'popup' },
          { source: 'realname', target: 'popback' },
        ],
        multi: true,
      };
    },
  },
  {
    label: 'popback',
    field: 'popback',
    component: 'Input',
  },
  {
    label: '分类字典树',
    field: 'flzds',
    component: 'JCategorySelect',
    componentProps: {
      pcode: 'B02', //TODO back和事件未添加，暂时有问题
    },
  },
  {
    label: '部门选择',
    field: 'bmxz',
    component: 'JSelectDept',
  },
  {
    label: '用户选择',
    field: 'yhxz',
    component: 'JSelectUserByDept',
    componentProps: {
      labelKey: 'realname',
    },
  },
  {
    label: '富文本',
    field: 'fwb',
    component: 'JEditor',
  },
  {
    label: 'markdown',
    field: 'markdownString',
    component: 'JMarkdownEditor', //注意string转换问题
  },
  {
    label: '省市区',
    field: 'shq',
    component: 'JAreaLinkage',
  },
  {
    label: '联动组件一',
    field: 'ldzuy',
    component: 'Input',
  },
  {
    label: '联动组件二',
    field: 'ldzje',
    component: 'Input',
  },
  {
    label: '联动组件三',
    field: 'ldzjs',
    component: 'Input',
  },
  {
    label: '自定义树',
    field: 'zdys',
    component: 'JTreeSelect',
    componentProps: {
      dict: 'sys_category,name,id',
      pidValue: '0',
    },
  },
  {
    label: 'double类型',
    field: 'yuanjia',
    component: 'InputNumber',
  },
  {
    label: 'integer类型',
    field: 'geshu',
    component: 'InputNumber',
  },
  {
    label: '唯一检验',
    field: 'jycs',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false }, { ...rules.duplicateCheckRule('ai_control_single', 'jycs', model, schema)[0] }];
    },
  },
  {
    label: '输入2到10位的字母',
    field: 'province',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: false }, { pattern: '^[a-z|A-Z]{2,10}$', message: '不符合校验规则!' }];
    },
  },
  {
    label: '自定义查询',
    field: 'zdmrz',
    defaultValue: '1',
    component: 'Input',
  },
  {
    label: '字典表下拉',
    field: 'zdbxl',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'sys_depart,depart_name,id',
    },
  },
  {
    label: '字典表单选',
    field: 'zdbdx',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'sys_depart,depart_name,id',
    },
  },
  {
    label: '字典表多选',
    field: 'zdbduoxuan',
    component: 'JSelectMultiple',
    componentProps: {
      dictCode: 'sys_depart,depart_name,id',
    },
  },
  {
    label: '字典表下拉多选',
    field: 'zdbxldx',
    component: 'JSelectMultiple',
    componentProps: {
      dictCode: 'sys_depart,depart_name,id',
    },
  },
  {
    label: '字典表带条件下拉',
    field: 'zddtjxl',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: "sys_user where username like '%a%',realname,username",
    },
  },
  {
    label: '字典表带条件单选',
    field: 'zddtjdx',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: "sys_user where username like '%a%',realname,username",
    },
  },
  {
    label: '字典表带条件多选',
    field: 'zddtjduox',
    component: 'JSelectMultiple',
    componentProps: {
      dictCode: "sys_user where username like '%a%',realname,username",
    },
  },
  {
    label: '字典表带条件下拉多选',
    field: 'zddtjxldx',
    component: 'JSelectMultiple',
    componentProps: {
      dictCode: "sys_user where username like '%a%',realname,username",
    },
  },
  {
    label: '字典表带条件下拉搜索',
    field: 'zddtjxlss',
    component: 'JSearchSelect',
    componentProps: {
      dict: "sys_user where username like '%a%',realname,username",
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

/**
 * 流程表单调用这个方法获取formSchema
 * @param param
 */
export function getBpmFormSchema(_formData): FormSchema[] {
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}
