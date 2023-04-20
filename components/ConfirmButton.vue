<template lang="pug">

el-badge.countdown(
  :value="countdown"
  :hidden="!countdown"
)
  el-button.confirm-button(
    :type="buttonType"
    :class="countdown && 'confirmation'"
    :size="size"
    :disabled="isDisabled"
    @click="onClick"
  )
    span {{ buttonText }}

</template>
<script setup>

import { computed, ref } from 'vue';

const props = defineProps({
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
  disabled: {
    type: Boolean,
    default: false,
  },
  confirmDelay: {
    type: Number,
    default: 2,
  },
  confirmLength: {
    type: Number,
    default: 6,
  },
});

const emit = defineEmits(['confirm']);

const confirmation = ref(null);
const countdown = ref(0);
const interval = ref(null);

const isDisabled = computed(() => {
  return props.disabled || (confirmation.value && countdown.value > props.confirmDelay) || null;
});

const buttonText = computed(() => {
  return confirmation.value ? props.confirmText || `${props.text}?` : props.text;
});

const buttonType = computed(() => {
  if (!confirmation.value) {
    return props.type;
  }
  return isDisabled.value ? 'warning' : 'danger';
});

function onClick() {

  const onTimeout = () => {
    confirmation.value = false;
    clearInterval(interval.value);
    countdown.value = 0;
  };

  const onCountdown = () => {
    countdown.value -= 1;
  };

  if (confirmation.value) {
    clearTimeout(confirmation.value);
    onTimeout();
    emit('confirm');
  } else {
    confirmation.value = setTimeout(onTimeout, props.timeout);
    countdown.value = props.confirmLength;
    interval.value = setInterval(onCountdown, 1000);
  }
}

</script>
<style scoped>

.countdown {
  margin-right: 6px;
}

</style>
