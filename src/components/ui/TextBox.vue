<template>
  <input
    :class="$style.input"
    type="text"
    @input="onInput"
    :placeholder="placeholder"
  />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    placeholder: {
      type: String,
      default: '',
    },
  },
  emits: ['input'],
})
export default class TextBox extends Vue {
  onInput(value: never): void {
    this.$emit('input', value);
  }
}
</script>

<style lang="scss" module>
.input {
  padding: 0 10px;
  width: 100%;
  border: none;
  border-radius: 2px;
  background-color: rgba(66, 66, 66, 0.8);
  color: white;
  font-size: 18px;
  font-family: "Calibri Light", "sans-serif", "consolas";
}
</style>
