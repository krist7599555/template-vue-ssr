const path = require('path')

const copy = require('rollup-plugin-copy')
const run = require('@rollup/plugin-run')
const vue = require('rollup-plugin-vue');
const postcss = require('rollup-plugin-postcss')
const replace = require('@rollup/plugin-replace')
const resolve = require('@rollup/plugin-node-resolve').nodeResolve
const commonjs = require('rollup-plugin-commonjs');
const typescript = require('rollup-plugin-typescript');
const auto_external = require('rollup-plugin-auto-external');

const dev = !!process.env.ROLLUP_WATCH;
const prod = !dev;

/** @type {import('rollup').RollupOptions} */
const build_ssr = {
  input: 'src/server.ts',
  output: {
    file: 'dist/server.js',
    format: 'cjs',
  },
  plugins: [
    auto_external(),
    vue({ target: 'node', preprocessStyles: false }),
    typescript({}),
    postcss({
      config: {
        path: path.join(__dirname, 'postcss.config.js'),
        ctx: { prod }
      }
    }),
    dev && run({
      options: {
        detached: true
      }
    })
  ],
};

/** @type {import('rollup').RollupOptions} */
const build_spa = {
  input: 'src/client.ts',
  output: {
    name: 'client_vue',
    file: 'dist/bundle/client.js',
    format: 'iife',
  },
  plugins: [
    copy({
      targets: [
        { src: 'src/index.html', dest: 'dist' },
        { src: 'src/public/**/*', dest: 'dist/bundle' },
        { src: 'src/assets', dest: 'dist/bundle/assets' }
      ],
    }),
    vue({ target: 'browser' }),
    typescript({ module: 'es2015', sourceMap: false }),
    resolve(),
    commonjs({
      namedExports: {
        'vue': ['getCurrentInstance', 'inject', 'onUnmounted', 'onDeactivated', 'onActivated', 'computed', 'unref', 'defineComponent', 'reactive', 'h', 'provide', 'ref', 'watch', 'shallowRef', 'nextTick', 'createVNode', 'Teleport', 'resolveComponent', 'Fragment', 'openBlock', 'createBlock', 'createApp', 'createCommentVNode', 'createTextVNode', 'withCtx', 'toDisplayString', 'withScopeId', 'pushScopeId', 'popScopeId']
      }
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(dev ? 'development' : 'production'),
      '__VUE_PROD_DEVTOOLS__': JSON.stringify(false),
    }),
    postcss({
      minimize: !dev,
      extract: true,
      config: {
        path: path.join(__dirname, 'postcss.config.js'),
        ctx: { prod }
      }
    }),
  ],
}

export default [build_ssr, build_spa];