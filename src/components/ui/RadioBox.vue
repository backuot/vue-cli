<template>
  <div :class="$style.container">
    <div
      v-for="option in options"
      :key="option.id"
      :class="$style.option"
    >
      <input
        type="radio"
        :id="`opt-${option.id}`"
        :value="option.value"
        :checked="option.value === value"
        @input="onRadioCheck(option.value)"
      />
      <label :for="`opt-${option.id}`">
        {{ option.text }}
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    options: Array,
    default: () => [],
  },
  emits: ['changed'],
})
export default class RadioBox extends Vue {
  value = 0

  onRadioCheck(value: never): void {
    this.value = value;
    this.$emit('changed', value);
  }
}
</script>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: row;
  border-radius: 3px;
  background-color: rgba(66, 66, 66, 0.8);
  overflow: hidden;
}

.option {
  cursor: pointer;
  color: white;
  display: flex;
  justify-content: center;
  text-transform: uppercase;

  & > * {
    cursor: pointer;
  }

  & > input {
    display: none;
  }

  & > input + label {
    overflow: hidden;
    padding: 5px 20px;
  }

  & > input:checked + label {
    background-color: #f64261;
  }
}
</style>
