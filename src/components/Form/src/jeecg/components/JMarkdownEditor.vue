<template>
  <MarkDown v-bind="bindProps" @change="onChange" @get="onGetVditor" />
</template>

<script lang="ts">
  import { computed, defineComponent, watch } from 'vue';
  import { MarkDown } from '/@/components/Markdown';
  import { propTypes } from '/@/utils/propTypes';

  export default defineComponent({
    name: 'JMarkdownEditor',
    components: { MarkDown },
    // 不将 attrs 的属性绑定到 html 标签上
    inheritAttrs: false,
    props: {
      value: propTypes.string.def(''),
      disabled: propTypes.bool.def(false),
    },
    emits: ['change', 'update:value'],
    setup(props, { emit, attrs }) {
      // markdown 组件实例
      let mdRef: any = null;
      // vditor 组件实例
      let vditorRef: any = null;
      // 合并 props 和 attrs
      const bindProps = computed(() => Object.assign({}, props, attrs));

      // 相当于 onMounted
      function onGetVditor(instance) {
        mdRef = instance;
        vditorRef = mdRef.getVditor();

        // 监听禁用，切换编辑器禁用状态
        watch(
          () => props.disabled,
          (disabled) => (disabled ? vditorRef.disabled() : vditorRef.enable()),
          { immediate: true }
        );
      }

      // value change 事件
      function onChange(value) {
        emit('change', value);
        emit('update:value', value);
      }

      return {
        bindProps,

        onChange,
        onGetVditor,
      };
    },
  });
</script>

<style lang="less" scoped></style>
