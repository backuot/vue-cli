<template>
  <div :class="$style.container">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class Container extends Vue {}
</script>

<style lang="scss" module>
.container {
  padding: 0 12px;
  width: 100%;
  max-width: 1024px;
}
</style>
