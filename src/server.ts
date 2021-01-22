/* ----------------------------------- VUE ---------------------------------- */

import { createSSRApp } from "vue";
import { createRouter, createMemoryHistory } from "vue-router";
import { renderToString, SSRContext } from "@vue/server-renderer";
import * as fs from 'fs'
import * as path from 'path'

const public_dir = path.join(__dirname, 'bundle');
const index_html_template = fs.readFileSync(path.resolve(__dirname, './index.html')).toString('utf-8')


import App from './App.vue';
import routes from './routes';

export async function create_vue_instance_ssr({ path = '/', ...context } = {} as SSRContext) {
  const app = createSSRApp(App);
  const router = createRouter({
    history: createMemoryHistory(),
    routes: routes
  })
  app.use(router);
  if (path) {
    router.push(path)
  }
  await router.isReady();
  const html = await renderToString(app, context);
  return { 
    app, 
    router, 
    context: context as SSRContext,
    template: index_html_template
      .replace(/{{head}}/, context.teleports?.head ?? '')
      .replace(/{{html}}/, html)
  };
}

/* ----------------------------------- KOA ---------------------------------- */

import Koa from 'koa'
import cors from '@koa/cors'
import send from 'koa-send'
import logger from 'koa-logger'
import { PORT, HOST } from './config';

const app =  new Koa();

app.use(cors());
app.use(logger());
app.use(async (ctx) => {
  const file_exist = await send(ctx, ctx.path, { root: public_dir }).catch(() => null)
  if (!file_exist) {
    ctx.body = (await create_vue_instance_ssr({ path: ctx.path })).template;
  }
});

app.listen(PORT, () => {
  console.log(`listen http://${HOST}:${PORT}`)
})