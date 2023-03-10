<template>
  <a-radio-group v-if="compType === CompTypeEnum.Radio" v-bind="attrs" v-model:value="state" @change="handleChangeRadio">
    <template v-for="item in dictOptions" :key="`${item.value}`">
      <a-radio :value="item.value">
        {{ item.label }}
      </a-radio>
    </template>
  </a-radio-group>

  <a-radio-group
    v-else-if="compType === CompTypeEnum.RadioButton"
    v-bind="attrs"
    v-model:value="state"
    buttonStyle="solid"
    @change="handleChangeRadio"
  >
    <template v-for="item in dictOptions" :key="`${item.value}`">
      <a-radio-button :value="item.value">
        {{ item.label }}
      </a-radio-button>
    </template>
  </a-radio-group>

  <template v-else-if="compType === CompTypeEnum.Select">
    <!-- 显示加载效果 -->
    <a-input v-if="loadingEcho" readOnly placeholder="加载中…">
      <template #prefix>
        <LoadingOutlined />
      </template>
    </a-input>
    <a-select
      v-else
      :placeholder="placeholder"
      v-bind="attrs"
      v-model:value="state"
      :filterOption="handleFilterOption"
      :getPopupContainer="getPopupContainer"
      @change="handleChange"
    >
      <a-select-option v-if="showChooseOption" :value="null">请选择…</a-select-option>
      <template v-for="item in dictOptions" :key="`${item.value}`">
        <a-select-option :value="item.value">
          <span style="display: inline-block; width: 100%" :title="item.label">
            {{ item.label }}
          </span>
        </a-select-option>
      </template>
    </a-select>
  </template>
</template>
<script lang="ts">
  import { defineComponent, PropType, ref, reactive, watchEffect, computed, unref, watch, onMounted, nextTick } from 'vue';
  import { propTypes } from '/@/utils/propTypes';
  import { useAttrs } from '/@/hooks/core/useAttrs';
  import { initDictOptions } from '/@/utils/dict';
  import { get, omit } from 'lodash-es';
  import { useRuleFormItem } from '/@/hooks/component/useFormItem';
  import { CompTypeEnum } from '/@/enums/CompTypeEnum';
  import { LoadingOutlined } from '@ant-design/icons-vue';

  export default defineComponent({
    name: 'JDictSelectTag',
    components: { LoadingOutlined },
    inheritAttrs: false,
    props: {
      value: propTypes.oneOfType([propTypes.string, propTypes.number, propTypes.array]),
      dictCode: propTypes.string,
      type: propTypes.string,
      placeholder: propTypes.string,
      stringToNumber: propTypes.bool,
      getPopupContainer: {
        type: Function,
        // update-begin--author:Curtis---date:2022-12-29 18:01:41---for:代码生成原生vue3在弹窗中使用该组件会被父窗口遮挡
        default: (node) => document.body,
        // update-end--author:Curtis---date:2022-12-29 18:01:41---for:代码生成原生vue3在弹窗中使用该组件会被父窗口遮挡
      },
      // 是否显示【请选择】选项
      showChooseOption: propTypes.bool.def(true),
      // 下拉项-online使用
      options: {
        type: Array,
        default: [],
        required: false,
      },
    },
    emits: ['options-change', 'change'],
    setup(props, { emit, refs }) {
      const dictOptions = ref<any[]>([]);
      const attrs = useAttrs();
      const [state, , , formItemContext] = useRuleFormItem(props, 'value', 'change');
      const getBindValue = Object.assign({}, unref(props), unref(attrs));
      // 是否正在加载回显数据
      const loadingEcho = ref<boolean>(false);
      // 是否是首次加载回显，只有首次加载，才会显示 loading
      let isFirstLoadEcho = true;

      //组件类型
      const compType = computed(() => {
        return !props.type || props.type === 'list' ? 'select' : props.type;
      });
      /**
       * 监听字典code
       */
      watchEffect(() => {
        if (props.dictCode) {
          loadingEcho.value = isFirstLoadEcho;
          isFirstLoadEcho = false;
          initDictData().finally(() => {
            loadingEcho.value = isFirstLoadEcho;
          });
        }
        //update-begin-author:taoyan date: 如果没有提供dictCode 可以走options的配置--
        if (!props.dictCode) {
          dictOptions.value = props.options;
        }
        //update-end-author:taoyan date: 如果没有提供dictCode 可以走options的配置--
      });

      //update-begin-author:taoyan date:20220404 for: 使用useRuleFormItem定义的value，会有一个问题，如果不是操作设置的值而是代码设置的控件值而不能触发change事件
      // 此处添加空值的change事件,即当组件调用地代码设置value为''也能触发change事件
      watch(
        () => props.value,
        () => {
          if (props.value === '') {
            emit('change', '');
            nextTick(() => formItemContext.onFieldChange());
          }
        }
      );
      //update-end-author:taoyan date:20220404 for: 使用useRuleFormItem定义的value，会有一个问题，如果不是操作设置的值而是代码设置的控件值而不能触发change事件

      async function initDictData() {
        const { dictCode, stringToNumber } = props;
        //根据字典Code, 初始化字典数组
        const dictData = await initDictOptions(dictCode);
        dictOptions.value = dictData.reduce((prev, next) => {
          if (next) {
            const value = next['value'];
            prev.push({
              label: next['text'] || next['label'],
              value: stringToNumber ? +value : value,
              ...omit(next, ['text', 'value']),
            });
          }
          return prev;
        }, []);
      }

      function handleChange(e) {
        const { mode } = unref<Recordable>(getBindValue);
        // 兼容多选模式
        if (mode === 'multiple') {
          state.value = e?.target?.value ?? e;
        } else {
          state.value = [e?.target?.value ?? e];
        }
        // 过滤掉空值
        if (state.value == null || state.value === '') {
          state.value = [];
        }
        if (Array.isArray(state.value)) {
          state.value = state.value.filter((item) => item != null && item !== '');
        }
        //update-begin---author:wangshuai ---date:20221123  for：单选模式要改成字符串------------
        if(mode !== 'multiple' && state.value && state.value.length>0){
          state.value = state.value[0];
        }
        //update-end---author:wangshuai ---date:20221123  for：单选模式要改成字符串--------------
        // nextTick(() => formItemContext.onFieldChange());
      }

      /** 单选radio的值变化事件 */
      function handleChangeRadio(e) {
        state.value = e?.target?.value ?? e;
      }

      /** 用于搜索下拉框中的内容 */
      function handleFilterOption(input, option) {
        // 在 label 中搜索
        const labelIf = option.children()[0]?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        if (labelIf) {
          return true;
        }
        // 在 value 中搜索
        return (option.value || '').toString().toLowerCase().indexOf(input.toLowerCase()) >= 0;
      }

      return {
        state,
        compType,
        attrs,
        loadingEcho,
        getBindValue,
        dictOptions,
        CompTypeEnum,
        handleChange,
        handleChangeRadio,
        handleFilterOption,
      };
    },
  });
</script>
