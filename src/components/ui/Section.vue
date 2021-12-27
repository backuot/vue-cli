<template>
  <section :class="$style.section">
    <slot />
  </section>
</template>

<script lang="ts"></script>

<style lang="scss" module>
.section {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
