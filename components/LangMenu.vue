<template lang="pug">

el-dropdown.lang-menu(@command="setLang" :trigger="trigger" :size="size")
  span.el-dropdown-link
    flagged-lang(:icon="lang.icon" :text="lang.key")
      i.el-icon-arrow-down
  el-dropdown-menu(slot="dropdown")
    el-dropdown-item(
      v-for="lang in languages"
      :key="lang.key"
      :command="lang"
    )
      flagged-lang(:icon="lang.icon" :text="lang.name")

</template>
<script>

import find from 'lodash/find';
// import { saveLocale } from '@/i18n';
import FlaggedLang from './FlaggedLang.vue';

const NAME = 'LangMenu';

export default {
  name: NAME,
  props: {
    languages: Array,
    trigger: {
      type: String,
      default: 'hover',
    },
    size: String,
  },
  computed: {
    lang() {
      return find(this.languages, { key: this.$i18n.locale }) || this.languages[0];
    },
  },
  methods: {
    setLang(lang) {
      // saveLocale(lang.key);
      this.$i18n.locale = lang.key;
    },
  },
  components: { FlaggedLang },
};

</script>
<style scoped lang="scss">

//@import "../../../styles/variables";

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}

</style>
