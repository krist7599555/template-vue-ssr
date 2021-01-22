import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from './App.vue';
import routes from './routes';

export async function create_vue_instance_spa({ mount = '#app' } = {}) {
  const app = createApp(App);
  const router = createRouter({
    history: createWebHistory(),
    routes: routes
  })
  app.use(router);
  await router.isReady();
  if (mount) {
    app.mount(mount)
  }
  return { app, router };
}

create_vue_instance_spa();

