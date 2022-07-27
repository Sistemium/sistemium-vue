<template lang="pug">

.form-buttons
  confirm-button(
    size="small" type="warning"
    @confirm="$emit('deleteClick')"
    :text="$t('delete')"
    v-if="!changed"
    v-show="deletable"
    :disabled="loading"
  )
  el-button(
    type="default" size="small"
    @click="$emit('cancelClick')"
    :disabled="loading"
  ) {{ changed ? $t('cancel') : $t('close') }}
  el-button(
    type="primary" size="small"
    @click="$emit('saveClick')"
    :disabled="loading"
    v-if="changed"
  ) {{ $t('save') }}

</template>
<script>

import ConfirmButton from './ConfirmButton.vue';

export default {
  name: 'FormButtons',
  props: {
    loading: Boolean,
    changed: Boolean,
    deletable: {
      type: Boolean,
      default: true,
    },
  },
  components: { ConfirmButton },
  i18n: {
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
  },
};

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
