const webpack = require('webpack')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = {
  webpack: {
    plugins: [
      new NodePolyfillPlugin(),
      new webpack.ProvidePlugin({
        process: 'process/browser',
      })
    ]
  },
  configure: (webpackConfig) => {
    return {
      ...webpackConfig,
      resolve: {
        ...webpackConfig.resolve,
        fallback: {
          ...webpackConfig.resolve.fallback,
          assert: false,
          crypto: false,
          http: false,
          https: false,
          os: false,
          stream: false,
        }
      }
    }
  },
  babel: {
    plugins: ["@babel/plugin-proposal-nullish-coalescing-operator", "@babel/plugin-proposal-optional-chaining"],
  },
}