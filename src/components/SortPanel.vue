<template>
  <Section :class="$style.section">
    <Container :class="$style.container">
      <span :class="$style.text">{{ text }}</span>
      <div
        v-if="isSortRadioVisible"
        :class="$style.radioContainer"
      >
        <span :class="$style.sortName">Sort by</span>
        <RadioBox
          :options="radioOptions"
          @changed="onRadioChanged"
        />
      </div>
    </Container>
  </Section>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Section from '@/components/ui/Section.vue';
import Container from '@/components/ui/Container.vue';
import RadioBox from '@/components/ui/RadioBox.vue';

@Options({
  components: {
    RadioBox,
    Section,
    Container,
  },
  props: {
    text: {
      type: String,
      default: '',
    },
    isSortRadioVisible: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['sort-changed'],
})
export default class SortPanel extends Vue {
  radioOptions = [
    {
      id: 3,
      value: 0,
      text: 'Release date',
    },
    {
      id: 4,
      value: 1,
      text: 'Rating',
    },
  ];

  onRadioChanged(value: never): void {
    this.$emit('sort-changed', value);
  }
}
</script>

<style lang="scss" module>
.section {
  background-color: #555555;
}

.container {
  padding: 15px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  color: white;
  font-weight: bold;
}

.radioContainer {
  display: flex;
  align-items: center;
}

.sortName {
  color: white;
  text-transform: uppercase;
  margin-right: 15px;
}
</style>
