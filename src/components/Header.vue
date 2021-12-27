<template>
  <header :class="$style.header">
    <a
      :class="$style.brandLogo"
      href=""
    >
      <img
        :class="$style.brandLogoImg"
        src="@/assets/icons/svg/brand-logo.svg"
        alt="Brand logo"
      />
    </a>
    <button
      v-if="isSearchButtonVisible"
      :class="$style.searchButton"
      @click="$emit('search')"
    >
      <img
        :class="$style.searchLogoImg"
        src="@/assets/icons/svg/search.svg"
        alt="Search logo"
      />
    </button>
  </header>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Section from '@/components/ui/Section.vue';

@Options({
  components: {
    Section,
  },
  props: {
    isSearchButtonVisible: Boolean,
    default: false,
  },
})
export default class Header extends Vue {}
</script>

<style lang="scss" module>
.header {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
}

.brandLogo {
}

.searchButton {
  padding: 0;
  border: none;
  cursor: pointer;
  background: transparent;
}

.brandLogoImg,
.searchLogoImg {
  height: 24px;
}
</style>
