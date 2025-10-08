<template lang="pug">

.form-buttons
  confirm-button(
    :size="size"
    type="warning"
    @confirm="emit('deleteClick')"
    :text="t('delete')"
    v-if="!changed"
    v-show="deletable"
    :disabled="disabled || loading || false"
  )
  el-button(
    type="default"
    :size="size"
    @click="emit('cancelClick')"
    :disabled="disabled || loading || false"
  ) {{ changed ? t('cancel') : t('close') }}
  el-button(
    type="primary"
    :size="size"
    @click="emit('saveClick')"
    :disabled="disabled || loading || false"
    v-if="changed"
  ) {{ t('save') }}

</template>
<script setup>

import { useI18n } from 'vue-i18n';
import ConfirmButton from './ConfirmButton.vue';

defineProps({
  loading: Boolean,
  changed: Boolean,
  deletable: {
    type: Boolean,
    default: true,
  },
  size: {
    type: String,
    default: 'small',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['saveClick', 'close', 'cancelClick', 'deleteClick']);

const { t } = useI18n({
  messages: {
    en: {
      save: 'Save',
      cancel: 'Cancel',
      close: 'Close',
      delete: 'Delete',
    },
    ru: {
      save: 'Сохранить',
      cancel: 'Отмена',
      close: 'Закрыть',
      delete: 'Удалить',
    },
    lt: {
      save: 'Saugoti',
      cancel: 'Atšaukti',
      close: 'Uždaryti',
      delete: 'Ištrinti',
    },
  },
});

</script>
<style scoped lang="scss">

.form-buttons {
  display: flex;
  justify-content: space-around;
  text-align: center;
}

</style>
<style lang="scss">

@import "../styles/variables";

.el-drawer__body .form-buttons {
  padding: $margin-right 0;
  background: $gray-background;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
}

</style>
