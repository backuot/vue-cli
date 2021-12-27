<template>
  <footer :class="$style.footer">
    <img
      :class="$style.brandLogoImg"
      src="@/assets/icons/svg/brand-logo.svg"
      alt="Brand logo"
    />
  </footer>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class Footer extends Vue {
}
</script>

<style lang="scss" module>
.footer {
  display: flex;
  justify-content: center;
  padding: 12px 0;
  background-color: #424242;
}

.brandLogoImg {
  height: 24px;
}
</style>
