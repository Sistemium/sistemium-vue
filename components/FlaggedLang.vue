<template lang="pug">

span.flagged-lang
  img(:src="icon")
  span {{ text }}
  slot

</template>
<script setup>

defineProps({
  icon: String,
  text: String,
});

</script>
<style scoped lang="scss">
@import "../styles/variables";

.flagged-lang {
  display: flex;
  align-items: center;

  > * + * {
    margin-left: $padding;
  }
}

img {
  width: 20px;
  height: 20px;
}

</style>
