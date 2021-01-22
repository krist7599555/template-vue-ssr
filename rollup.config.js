const vue = require('rollup-plugin-vue');
const typescript = require('rollup-plugin-typescript');
const commonjs = require('rollup-plugin-commonjs');
const run = require('@rollup/plugin-run')
const postcss = require('rollup-plugin-postcss')
const copy = require('rollup-plugin-copy')
const resolve = require('@rollup/plugin-node-resolve').nodeResolve
const autoExternal = require('rollup-plugin-auto-external');
import buble from '@rollup/plugin-buble';
const inject_env = require('rollup-plugin-inject-process-env')
const replace = require('@rollup/plugin-replace')

const dev = !!process.env.ROLLUP_WATCH;

/** @type {import('rollup').RollupOptions} */
const build_ssr = {
  input: 'src/server.ts',
  output: {
    file: 'dist/server.js',
    format: 'cjs',
    sourcemap: false // https://github.com/vuejs/rollup-plugin-vue/issues/238
  },
  // external: ['@vue/server-renderer', 'vue', 'koa', '@koa/cors', 'vue-router', '@vue/compiler-ssr', 'stream'],
  plugins: [
    autoExternal(),
    vue({ target: 'node' }),
    typescript({}),
    dev && run({})
    // commonjs(),
  ],
};

/** @type {import('rollup').RollupOptions} */
const build_spa = {
  input: 'src/client.ts',
  output: {
    name: 'client_vue',
    file: 'dist/public/client.js',
    format: 'iife',
    sourcemap: false // https://github.com/vuejs/rollup-plugin-vue/issues/238
  },
  // external: ['vue'],
  // external: ['@vue/server-renderer', 'vue', 'koa', '@koa/cors', 'vue-router', '@vue/compiler-ssr', 'stream'],
  plugins: [
    copy({
      targets: [
        { src: 'src/index.html', dest: 'dist' },
        { src: 'src/public', dest: 'dist/public' },
        { src: 'assets/**/*', dest: 'dist/public/assets' }
      ],
      // assets: [
      //   'src/index.html',
      //   'src/favicon.ico',
      //   'src/public',
      // ]
      // target: [
      //   { src: 'src/index.html', dest: 'dist/client/index.html' }
      // ]
    }),
    // commonjs({
    //   namedExports: {
    //     'vue': ['createVNode', 'resolveComponent', 'openBlock', 'createBlock', 'Fragment', 'Teleport', 'createApp', 'onUnmounted']
    //   }
    // }),
    vue({ target: 'browser', preprocessStyles: true }),
    typescript({ module: 'es2015', sourceMap: false }),
    // postcss({
    //   extension: ['.scss', '.css', '.sss', '.pcss'],
    //   extract: true
    // }),
    resolve(),
    commonjs({
      namedExports: { 
        'vue': [
          ...'getCurrentInstance, inject, onUnmounted, onDeactivated, onActivated, computed, unref, defineComponent, reactive, h, provide, ref, watch, shallowRef, nextTick'.split(', '),
          'createVNode', 'Teleport', 'resolveComponent', 'Fragment', 'openBlock', 'createBlock', 'createApp', 'createCommentVNode', 'createTextVNode', 'withCtx', 'toDisplayString'
        ] 
      }
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(dev ? 'development' : 'production'),
      '__VUE_PROD_DEVTOOLS__': JSON.stringify(false),
    })
    // autoExternal(),
    // buble({
    //   transforms: {
    //     asyncAwait: false,
    //     forOf: false
    //   }
    // }),
  ],
}

export default [build_ssr, build_spa];

// const pt = () => typescript({
//   tsconfig: false,
//   experimentalDecorators: true,
//   module: 'es2015'
// }),

// const build = [
//   // ESM build to be used with webpack/rollup.
//   {
//     input: 'src/index.js',
//     output: {
//       format: 'esm',
//       file: 'dist/library.esm.js'
//     },
//     plugins: [
//       pt(),
//       vue()
//     ]
//   },
//   // SSR build.
//   {
//     input: 'src/index.js',
//     output: {
//       format: 'cjs',
//       file: 'dist/library.ssr.js'
//     },
//     plugins: [
//       pt(),
//       vue({ template: { optimizeSSR: true } })
//     ]
//   },
//   // Browser build.
//   {
//     input: 'src/wrapper.js',
//     output: {
//       format: 'iife',
//       file: 'dist/library.js'
//     },
//     plugins: [
//       pt(),
//       vue()
//     ]
//   }
// ]

// // export default {
// //   // ...
// //   plugins: [
// //     typescript({
// //       tsconfig: false,
// //       experimentalDecorators: true,
// //       module: 'es2015'
// //     }),
// //     vue({ template: { optimizeSSR: true } })
// //   ]
// // }

// export default build[0]