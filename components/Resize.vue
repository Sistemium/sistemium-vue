<template lang="pug">

.stm-resize(:style="style" ref="root")
  slot

</template>
<script>

import debounce from 'lodash/debounce';

export default {

  name: 'Resize',

  props: {
    padding: Number,
    maximize: Boolean,
  },

  data() {
    return {
      style: {},
      top: 0,
      height: 0,
      handleResize: debounce(this.setHeight, 700),
    };
  },

  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.$nextTick(() => {
      this.setHeight();
    });
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },

  methods: {

    setHeight() {
      const { top } = this.$refs.root.getBoundingClientRect();
      this.top = top;
      this.height = window.innerHeight;
      const maxHeight = `${this.height - this.top - (this.padding || 0)}px`;
      this.style = { 'max-height': maxHeight };
      if (this.maximize) {
        this.style = { height: maxHeight };
      }
    },

  },

};

</script>
<style scoped lang="scss">

.stm-resize {
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  @media print {
    max-height: none !important;
    height: auto !important;
  }
}

</style>
