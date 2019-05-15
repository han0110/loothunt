const withSass = require('@zeit/next-sass')
const withImages = require('next-images')

module.exports = withSass(
  withImages({
    distDir: '../build',
    cssModules: true,
    cssLoaderOptions: {
      localIdentName: '[name]___[local]___[hash:base64:5]',
      camelCase: true,
    },
  })
)
