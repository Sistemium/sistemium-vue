<template lang="pug">

el-badge.countdown(:value="countdown" :hidden="!countdown")
  el-button.confirm-button(
  :type="buttonType"
  :class="countdown && 'confirmation'"
  :size="size"
  :disabled="isDisabled"
  @click="onClick"
  )
    span {{ buttonText }}

</template>
<script>

export default {

  name: 'ConfirmButton',

  props: {
    text: String,
    size: {
      type: String,
    },
    type: {
      type: String,
      default: 'default',
    },
    confirmText: String,
    timeout: {
      type: Number,
      default: 5000,
    },
    confirmDelay: {
      type: Number,
      default: 2,
    },
    confirmLength: {
      type: Number,
      default: 6,
    },
  },

  data() {
    return {
      confirmation: false,
      countdown: null,
      interval: false,
    };
  },

  computed: {

    isDisabled() {
      return this.confirmation && this.countdown > this.confirmDelay;
    },

    buttonText() {
      return this.confirmation ? this.confirmText || `${this.text}?` : this.text;
    },

    buttonType() {
      if (!this.confirmation) {
        return this.type;
      }
      return this.isDisabled ? 'warning' : 'danger';
    },

  },

  methods: {
    onClick() {

      const onTimeout = () => {
        this.confirmation = false;
        clearInterval(this.interval);
        this.countdown = 0;
      };

      const onCountdown = () => {
        this.countdown -= 1;
      };

      const { confirmation } = this;

      if (confirmation) {
        clearTimeout(confirmation);
        onTimeout();
        this.$emit('confirm');
      } else {
        this.confirmation = setTimeout(onTimeout, this.timeout);
        this.countdown = this.confirmLength;
        this.interval = setInterval(onCountdown, 1000);
      }

    },
  },

};

</script>
<style scoped>

.countdown {
  margin-right: 6px;
}

</style>
