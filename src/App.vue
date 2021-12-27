<template>
  <Home />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Home from '@/pages/Home.vue';

@Options({
  components: {
    Home,
  },
})
export default class App extends Vue {}
</script>

<style>
body {
  padding: 0;
  margin: 0;
  font-family: "Calibri Light", "sans-serif", "consolas";
}
</style>
