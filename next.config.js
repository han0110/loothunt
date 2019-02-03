const withSass = require('@zeit/next-sass')
const withImages = require('next-images')

const reponame = 'loothunt'

module.exports = withSass(
  withImages({
    assetPrefix: process.env.NODE_ENV === 'production' ? `/${reponame}` : '',
    cssModules: true,
    cssLoaderOptions: {
      localIdentName: '[name]___[local]___[hash:base64:5]',
      camelCase: true,
    },
  })
)
