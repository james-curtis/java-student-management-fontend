<template>
  <Tooltip placement="top" v-bind="getBindProps">
    <template #title>
      <span>{{ t('common.redo') }}</span>
    </template>
    <RedoOutlined @click="redo" />
  </Tooltip>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import { Tooltip } from 'ant-design-vue';
  import { RedoOutlined } from '@ant-design/icons-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useTableContext } from '../../hooks/useTableContext';

  export default defineComponent({
    name: 'RedoSetting',
    components: {
      RedoOutlined,
      Tooltip,
    },
    props: {
      isMobile: Boolean,
    },
    setup(props) {
      const table = useTableContext();
      const { t } = useI18n();

      const getBindProps = computed(() => {
        const obj = {};
        if (props.isMobile) {
          obj['visible'] = false;
        }
        return obj;
      });

      function redo() {
        table.reload();
        table.emit!('table-redo');
      }

      return { getBindProps, redo, t };
    },
  });
</script>
