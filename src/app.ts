import { createApp, createSSRApp } from 'vue'
import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router';

import "./style.scss"
import App from './App.vue';
import Home from './pages/Home.vue';
import { renderToString, SSRContext } from '@vue/server-renderer';

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: { template: `<div>About</div>` } },
  { path: '/**', component: { template: `<div>Not Found</div>` } },
];

export async function create_vue_instance_ssr({ path = '/', ...context } = {}) {
  const app = createSSRApp(App);
  const router = createRouter({
    history: createMemoryHistory(),
    routes: routes
  })
  app.use(router);
  if (path) {
    router.push(path)
  }
  const template = await renderToString(app, context);
  return { app, router, template, context: context as SSRContext };
}

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

