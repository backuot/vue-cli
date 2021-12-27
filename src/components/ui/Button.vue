<template>
  <button
    :class="$style.button"
    @click="onClick"
  >
    {{ text }}
  </button>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    text: {
      type: String,
      default: '',
    },
  },
  emits: ['click'],
})
export default class Button extends Vue {
  onClick(): void {
    this.$emit('click');
  }
}
</script>

<style lang="scss" module>
.button {
  font-size: 18px;
  font-family: "Calibri Light", "sans-serif", "consolas";
  text-transform: uppercase;
  padding: 15px 55px;
  border: none;
  border-radius: 2px;
  background-color: #F65261;
  color: white;
  cursor: pointer;
}
</style>
