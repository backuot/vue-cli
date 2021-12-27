<template>
  <Section :class="$style.section">
    <Container :class="$style.container">
      <slot name="header" />
      <div :class="$style.content">
        <slot name="content" />
      </div>
    </Container>
  </Section>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Section from '@/components/ui/Section.vue';
import Container from '@/components/ui/Container.vue';
import Header from '@/components/Header.vue';
import SearchPanel from '@/components/SearchPanel.vue';
import MoviePanel from '@/components/MoviePanel.vue';

@Options({
  components: {
    MoviePanel,
    Section,
    Container,
    Header,
    SearchPanel,
  },
})
export default class Hero extends Vue {}
</script>

<style lang="scss" module>
.section {
  position: relative;
  background-color: black;
  overflow: hidden;
}

.section:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("~@/assets/images/jpg/movies-back.jpg");
  opacity: 0.7;
  filter: blur(2px);
}

.container {
  z-index: 2;
}

.content {
  display: flex;
  justify-content: center;
}
</style>
