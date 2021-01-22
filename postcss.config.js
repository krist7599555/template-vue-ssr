const path = require('path')

module.exports = (ctx) => ({
  plugins: [
    require('postcss-import'),
    require('postcss-preset-env')({ stage: 1 }),
    require('postcss-nested'),
    require('tailwindcss')(path.join(__dirname, './tailwind.config.js')),
    ctx.prod && require('@fullhuman/postcss-purgecss')({
      content: ['./src/**/*.html', './src/**/*.vue', './src/**/*.ts']
    }),
    ctx.prod && require('autoprefixer'),
  ]
})