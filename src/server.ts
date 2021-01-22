/* ----------------------------------- VUE ---------------------------------- */

import { createSSRApp } from "vue";
import { createRouter, createMemoryHistory } from "vue-router";
import { renderToString, SSRContext } from "@vue/server-renderer";
import * as fs from 'fs'
import * as path from 'path'

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
import { PORT, HOST } from 'src/config';

const app =  new Koa();

app.use(cors());
app.use(require('koa-logger')())
app.use(async (ctx, next) => {
  try {
    const file_local_path = await send(ctx, ctx.path, { root: path.join(__dirname, 'public') });
    if (!file_local_path) {
      await next();
    }
  } catch(err) {
    await next();
  }
})
app.use(async ctx => {
  ctx.body = (await create_vue_instance_ssr({ path: ctx.path })).template;
})
app.listen(PORT, () => {
  console.log(`listen http://${HOST}:${PORT}`)
})