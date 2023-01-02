import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { getAllRolesList, getAllTenantList } from './user.api';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getPositionByCode } from '/@/api/common/api';
export const columns: BasicColumn[] = [
  {
    title: '班级排名',
    width: 40,
    dataIndex: 'classRank',
  },
  {
    title: '姓名',
    dataIndex: 'realname',
    width: 100,
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    width: 50,
    customRender: render.renderAvatarImage(true, 40),
  },
  {
    title: '性别',
    dataIndex: 'sex',
    width: 30,
    customRender: ({ text }) => {
      return render.renderDict(text, 'sex');
    },
  },
  {
    title: '平均成绩',
    width: 40,
    dataIndex: 'average',
    customRender: ({ text }) => {
      return Number(text).toFixed(2);
    },
  },
  {
    title: '总成绩',
    width: 40,
    dataIndex: 'total',
    customRender: ({ text }) => {
      return Number(text).toFixed(2);
    },
  },
  {
    title: '及格率',
    width: 40,
    dataIndex: 'passRatio',
    customRender: ({ text, record }) => {
      const item = record as any;
      return (Number(item.coursePassTotalSize / item.courseTotalSize) * 100).toFixed(0) + '%';
    },
  },
  {
    title: '班级',
    width: 50,
    dataIndex: 'classInfo',
    customRender: ({ text, record }) => {
      return text.name;
    },
  },
  {
    title: '专业',
    width: 150,
    dataIndex: 'orgCodeTxt',
  },
  {
    title: '学院',
    width: 150,
    dataIndex: 'parentDepartId_dictText',
  },
  {
    title: '状态',
    dataIndex: 'status_dictText',
    width: 40,
  },
];

export const searchInfo: Recordable = {
  post: 'student',
};

export const searchFormSchema: FormSchema[] = [
  {
    label: '班级',
    field: 'classId',
    component: 'JPopup',
    componentProps: ({ formActionType }) => {
      const { setFieldsValue } = formActionType;
      return {
        setFieldsValue: setFieldsValue,
        code: 'stu_class_selector',
        fieldConfig: [{ source: 'id', target: 'classId' }],
        multi: false,
        labelKey: 'name',
      };
    },
  },
];

export const formSchema: FormSchema[] = [
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    label: '用户账号',
    field: 'username',
    component: 'Input',
    dynamicDisabled: ({ values }) => {
      return !!values.id;
    },
    dynamicRules: ({ model, schema }) => rules.duplicateCheckRule('sys_user', 'username', model, schema, true),
  },
  {
    label: '登录密码',
    field: 'password',
    component: 'StrengthMeter',
    rules: [
      {
        required: true,
        message: '请输入登录密码',
      },
    ],
  },
  {
    label: '确认密码',
    field: 'confirmPassword',
    component: 'InputPassword',
    dynamicRules: ({ values }) => rules.confirmPassword(values, true),
  },
  {
    label: '用户姓名',
    field: 'realname',
    required: true,
    component: 'Input',
  },
  {
    label: '学号',
    field: 'workNo',
    required: true,
    component: 'Input',
    dynamicRules: ({ model, schema }) => rules.duplicateCheckRule('sys_user', 'work_no', model, schema, true),
  },
  {
    label: '职务',
    field: 'post',
    required: false,
    component: 'JSelectPosition',
    componentProps: {
      rowKey: 'code',
      labelKey: 'name',
    },
  },
  {
    label: '角色',
    field: 'selectedroles',
    component: 'ApiSelect',
    componentProps: {
      mode: 'multiple',
      api: getAllRolesList,
      labelField: 'roleName',
      valueField: 'id',
    },
  },
  {
    label: '专业',
    field: 'selecteddeparts',
    component: 'JSelectDept',
    componentProps: ({ formActionType, formModel }) => {
      return {
        sync: false,
        checkStrictly: true,
        defaultExpandLevel: 2,

        onSelect: (options, values) => {
          const { updateSchema } = formActionType;
          //所属部门修改后更新负责部门下拉框数据
          updateSchema([
            {
              field: 'departIds',
              componentProps: { options },
            },
          ]);
          //所属部门修改后更新负责部门数据
          formModel.departIds && (formModel.departIds = formModel.departIds.filter((item) => values.value.indexOf(item) > -1));
        },
      };
    },
  },
  {
    label: '班级',
    field: 'selectedClasses',
    component: 'JPopup',
    componentProps: ({ formActionType }) => {
      const { setFieldsValue } = formActionType;
      return {
        setFieldsValue: setFieldsValue,
        code: 'stu_class_selector',
        fieldConfig: [{ source: 'id', target: 'selectedclass' }],
        multi: false,
        labelKey: 'name',
      };
    },
  },
  {
    label: '头像',
    field: 'avatar',
    component: 'JImageUpload',
    componentProps: {
      fileMax: 1,
    },
  },
  {
    label: '生日',
    field: 'birthday',
    component: 'DatePicker',
  },
  {
    label: '性别',
    field: 'sex',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'sex',
      placeholder: '请选择性别',
      stringToNumber: true,
    },
  },
  {
    label: '邮箱',
    field: 'email',
    component: 'Input',
    rules: rules.rule('email', false),
  },
  {
    label: '手机号码',
    field: 'phone',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [
        { ...rules.duplicateCheckRule('sys_user', 'phone', model, schema, true)[0] },
        { pattern: /^1[3|4|5|7|8|9][0-9]\d{8}$/, message: '手机号码格式有误' },
      ];
    },
  },
  {
    label: '座机',
    field: 'telephone',
    component: 'Input',
    rules: [{ pattern: /^0\d{2,3}-[1-9]\d{6,7}$/, message: '请输入正确的座机号码' }],
  },
];

export const scoreColumns: BasicColumn[] = [
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
    sorter: true,
  },
];

export const scoreFormSchema: FormSchema[] = [
  {
    label: '学生',
    field: 'studentId',
    component: 'JSelectUserByDept',
    componentProps: {
      labelKey: 'id',
      disabled: true,
      multiple: false,
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
        labelKey: 'name',
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
