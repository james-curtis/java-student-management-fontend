import { defHttp } from '/@/utils/http/axios';
import { useMessage } from '/@/hooks/web/useMessage';

const { createConfirm } = useMessage();

enum Api {
  list = '/test/cesOrderMain/list',
  save = '/test/cesOrderMain/add',
  edit = '/test/cesOrderMain/edit',
  deleteOne = '/test/cesOrderMain/delete',
  deleteBatch = '/test/cesOrderMain/deleteBatch',
  importExcel = '/test/cesOrderMain/importExcel',
  exportXls = '/test/cesOrderMain/exportXls',
  cesOrderGoodsList = '/test/cesOrderMain/listCesOrderGoodsByMainId',
  cesOrderGoodsSave = '/test/cesOrderMain/addCesOrderGoods',
  cesOrderGoodsEdit = '/test/cesOrderMain/editCesOrderGoods',
  cesOrderGoodsDelete = '/test/cesOrderMain/deleteCesOrderGoods',
  cesOrderGoodsDeleteBatch = '/test/cesOrderMain/deleteBatchCesOrderGoods',
  cesOrderCustomerList = '/test/cesOrderMain/listCesOrderCustomerByMainId',
  cesOrderCustomerSave = '/test/cesOrderMain/addCesOrderCustomer',
  cesOrderCustomerEdit = '/test/cesOrderMain/editCesOrderCustomer',
  cesOrderCustomerDelete = '/test/cesOrderMain/deleteCesOrderCustomer',
  cesOrderCustomerDeleteBatch = '/test/cesOrderMain/deleteBatchCesOrderCustomer',
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
 * 删除单个
 */
export const deleteOne = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.deleteOne, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};
/**
 * 批量删除
 * @param params
 */
export const batchDelete = (params, handleSuccess) => {
  createConfirm({
    iconType: 'warning',
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
 * 保存或者更新
 * @param params
 */
export const saveOrUpdate = (params, isUpdate) => {
  const url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({ url: url, params });
};
/**
 * 列表接口
 * @param params
 */
export const cesOrderGoodsList = (params) => {
  if (params['orderMainId']) {
    return defHttp.get({ url: Api.cesOrderGoodsList, params });
  }
  return Promise.resolve({});
};

/**
 * 删除单个
 */
export const cesOrderGoodsDelete = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.cesOrderGoodsDelete, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};
/**
 * 批量删除
 * @param params
 */
export const cesOrderGoodsDeleteBatch = (params, handleSuccess) => {
  createConfirm({
    iconType: 'warning',
    title: '确认删除',
    content: '是否删除选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.delete({ url: Api.cesOrderGoodsDeleteBatch, data: params }, { joinParamsToUrl: true }).then(() => {
        handleSuccess();
      });
    },
  });
};
/**
 * 保存或者更新
 * @param params
 */
export const cesOrderGoodsSaveOrUpdate = (params, isUpdate) => {
  const url = isUpdate ? Api.cesOrderGoodsEdit : Api.cesOrderGoodsSave;
  return defHttp.post({ url: url, params });
};
/**
 * 导入
 */
export const cesOrderGoodsImportUrl = '/test/cesOrderMain/importCesOrderGoods';

/**
 * 导出
 */
export const cesOrderGoodsExportXlsUrl = '/test/cesOrderMain/exportCesOrderGoods';
/**
 * 列表接口
 * @param params
 */
export const cesOrderCustomerList = (params) => {
  if (params['orderMainId']) {
    return defHttp.get({ url: Api.cesOrderCustomerList, params });
  }
  return Promise.resolve({});
};

/**
 * 删除单个
 */
export const cesOrderCustomerDelete = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.cesOrderCustomerDelete, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};
/**
 * 批量删除
 * @param params
 */
export const cesOrderCustomerDeleteBatch = (params, handleSuccess) => {
  createConfirm({
    iconType: 'warning',
    title: '确认删除',
    content: '是否删除选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.delete({ url: Api.cesOrderCustomerDeleteBatch, data: params }, { joinParamsToUrl: true }).then(() => {
        handleSuccess();
      });
    },
  });
};
/**
 * 保存或者更新
 * @param params
 */
export const cesOrderCustomerSaveOrUpdate = (params, isUpdate) => {
  const url = isUpdate ? Api.cesOrderCustomerEdit : Api.cesOrderCustomerSave;
  return defHttp.post({ url: url, params });
};
/**
 * 导入
 */
export const cesOrderCustomerImportUrl = '/test/cesOrderMain/importCesOrderCustomer';

/**
 * 导出
 */
export const cesOrderCustomerExportXlsUrl = '/test/cesOrderMain/exportCesOrderCustomer';
