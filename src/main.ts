import { createApp } from 'vue';
import VueLazyLoad from 'vue3-lazyload';
import App from './App.vue';
import { store, key } from './store';

createApp(App)
  .use(VueLazyLoad)
  .use(store, key)
  .mount('#app');
