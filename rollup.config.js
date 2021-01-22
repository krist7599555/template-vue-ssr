const vue = require('rollup-plugin-vue');
const typescript = require('rollup-plugin-typescript');
const commonjs = require('rollup-plugin-commonjs');
const run = require('@rollup/plugin-run')
const postcss = require('rollup-plugin-postcss')
const copy = require('rollup-plugin-copy')
const resolve = require('@rollup/plugin-node-resolve').nodeResolve
const auto_external = require('rollup-plugin-auto-external');
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
    sourcemap: false
  },
  plugins: [
    auto_external(),
    vue({ target: 'node' }),
    typescript({}),
    dev && run({})
  ],
};

/** @type {import('rollup').RollupOptions} */
const build_spa = {
  input: 'src/client.ts',
  output: {
    name: 'client_vue',
    file: 'dist/public/client.js',
    format: 'iife',
    sourcemap: false
  },
  plugins: [
    copy({
      targets: [
        { src: 'src/index.html', dest: 'dist' },
        { src: 'src/public', dest: 'dist/public' },
        { src: 'assets/**/*', dest: 'dist/public/assets' }
      ],
    }),
    vue({ target: 'browser', preprocessStyles: true }),
    typescript({ module: 'es2015', sourceMap: false }),
    // postcss({
    //   extension: ['.scss', '.css', '.sss', '.pcss'],
    //   extract: true
    // }),
    resolve(),
    commonjs({
      namedExports: { 
        'vue': ['getCurrentInstance', 'inject', 'onUnmounted', 'onDeactivated', 'onActivated', 'computed', 'unref', 'defineComponent', 'reactive', 'h', 'provide', 'ref', 'watch', 'shallowRef', 'nextTick', 'createVNode', 'Teleport', 'resolveComponent', 'Fragment', 'openBlock', 'createBlock', 'createApp', 'createCommentVNode', 'createTextVNode', 'withCtx', 'toDisplayString'] 
      }
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(dev ? 'development' : 'production'),
      '__VUE_PROD_DEVTOOLS__': JSON.stringify(false),
    })
  ],
}

export default [build_ssr, build_spa];