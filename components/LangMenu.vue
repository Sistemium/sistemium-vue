<template lang="pug">

el-dropdown.lang-menu(
  @command="setLang"
  :trigger="trigger"
  :size="size"
)
  span.el-dropdown-link
    flagged-lang(
      :icon="lang.icon"
      :text="lang.key"
    )
      i.el-icon-arrow-down
  template(#dropdown)
    el-dropdown-menu
      el-dropdown-item(
        v-for="lng in languages"
        :key="lng.key"
        :command="lng"
      )
        flagged-lang(
          :icon="lng.icon"
          :text="lng.name"
        )

</template>
<script setup>

import find from 'lodash/find';
import { computed } from 'vue';
import FlaggedLang from './FlaggedLang.vue';

const props = defineProps({
  languages: Array,
  trigger: {
    type: String,
    default: 'hover',
  },
  size: String,
  modelValue: {
    type: String,
    required: true,
  }
});

const emit = defineEmits(['update:modelValue']);
const lang = computed(() => {
  const { languages } = props;
  const found = find(languages, { key: props.modelValue });
  return found || languages[0];
});

function setLang(lng) {
  emit('update:modelValue', lng.key);
}

</script>
<style scoped>

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}

</style>
