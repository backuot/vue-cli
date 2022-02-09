import { createApp } from 'vue';
import VueLazyLoad from 'vue3-lazyload';
import App from './App.vue';
import { store, key } from './store';
import Router from './routes';

createApp(App)
  .use(Router)
  .use(VueLazyLoad)
  .use(store, key)
  .mount('#app');
