import { defHttp } from '/@/utils/http/axios';
import { Modal } from 'ant-design-vue';
import { useMessage } from '/@/hooks/web/useMessage';
const { createConfirm } = useMessage();

enum Api {
  list = '/stu/stu/list',
  save = '/stu/stu/add',
  edit = '/stu/stu/edit',
  getUserRole = '/sys/user/queryUserRole',
  duplicateCheck = '/sys/duplicate/check',
  deleteUser = '/sys/user/delete',
  deleteBatch = '/sys/user/deleteBatch',
  importExcel = '/sys/user/importExcel',
  exportXls = '/sys/user/exportXls',
  allRolesList = '/sys/role/queryall',
  allTenantList = '/sys/tenant/queryList',
  allPostList = '/sys/position/list',
  userDepartList = '/sys/user/userDepartList',
  changePassword = '/sys/user/changePassword',

  // -----------子表

  scoreList = '/stu/score/list',
  scoreSave = '/stu/score/add',
  scoreEdit = '/stu/score/edit',
  scoreDelete = '/stu/score/delete',
  scoreDeleteBatch = '/stu/score/deleteBatch',

  scoreStat = '/stu/score/score_stat',
}
/**
 * 导出api
 * @param params
 */
export const getExportUrl = Api.exportXls;
/**
 * 导入api
 */
export const getImportUrl = Api.importExcel;
/**
 * 列表接口
 * @param params
 */
export const list = (params) => defHttp.get({ url: Api.list, params });

/**
 * 用户角色接口
 * @param params
 */
export const getUserRoles = (params) => defHttp.get({ url: Api.getUserRole, params }, { errorMessageMode: 'none' });

/**
 * 删除用户
 */
export const deleteUser = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.deleteUser, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};
/**
 * 批量删除用户
 * @param params
 */
export const batchDeleteUser = (params, handleSuccess) => {
  Modal.confirm({
    title: '确认删除',
    content: '是否删除选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.delete({ url: Api.deleteBatch, data: params }, { joinParamsToUrl: true }).then(() => {
        handleSuccess();
      });
    },
  });
};
/**
 * 保存或者更新用户
 * @param params
 */
export const saveOrUpdateUser = (params, isUpdate) => {
  const url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({ url: url, params });
};
/**
 * 唯一校验
 * @param params
 */
export const duplicateCheck = (params) => defHttp.get({ url: Api.duplicateCheck, params }, { isTransformResponse: false });
/**
 * 获取全部角色
 * @param params
 */
export const getAllRolesList = (params) => defHttp.get({ url: Api.allRolesList, params });
/**
 * 获取全部租户
 */
export const getAllTenantList = (params) => defHttp.get({ url: Api.allTenantList, params });
/**
 * 获取指定用户负责部门
 */
export const getUserDepartList = (params) => defHttp.get({ url: Api.userDepartList, params }, { successMessageMode: 'none' });
/**
 * 获取全部职务
 */
export const getAllPostList = (params) => {
  return new Promise((resolve) => {
    defHttp.get({ url: Api.allPostList, params }).then((res) => {
      resolve(res.records);
    });
  });
};
/**
 * 修改密码
 * @param params
 */
export const changePassword = (params) => {
  return defHttp.put({ url: Api.changePassword, params });
};

// -------------子表

/**
 * 导入
 */
export const scoreImportUrl = '/stu/score/importExcel';

/**
 * 导出
 */
export const scoreExportXlsUrl = '/stu/score/exportXls';
/**
 * 列表接口
 * @param params
 */
export const scoreList = (params) => {
  if (params['studentId']) {
    return defHttp.get({ url: Api.scoreList, params });
  }
  return Promise.resolve({});
};

/**
 * 删除单个
 */
export const scoreDelete = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.scoreDelete, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};
/**
 * 批量删除
 * @param params
 */
export const scoreDeleteBatch = (params, handleSuccess) => {
  createConfirm({
    iconType: 'warning',
    title: '确认删除',
    content: '是否删除选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.delete({ url: Api.scoreDeleteBatch, data: params }, { joinParamsToUrl: true }).then(() => {
        handleSuccess();
      });
    },
  });
};
/**
 * 保存或者更新
 * @param params
 */
export const scoreSaveOrUpdate = (params, isUpdate) => {
  const url = isUpdate ? Api.scoreEdit : Api.scoreSave;
  return defHttp.post({ url: url, params });
};

/**
 * 获取学生分数统计结果
 * @param userId
 */
export const getScoreStat = (userId: string) => {
  return defHttp.get({
    url: Api.scoreStat,
    params: {
      userId,
    },
  });
};
