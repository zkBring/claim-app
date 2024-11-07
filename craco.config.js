const webpack = require('webpack')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = {
  webpack: {
    plugins: [
      new NodePolyfillPlugin(),
      new webpack.ProvidePlugin({
        process: 'process/browser',
      })
    ],
    configure: {
      ignoreWarnings: [{ module: /node_modules\// }]
    }
  },
  configure: (webpackConfig) => {
    webpackConfig.resolve.extensions.push('.mjs', '.cjs')
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
    plugins: [
      "@babel/plugin-proposal-nullish-coalescing-operator", 
      "@babel/plugin-proposal-optional-chaining"
    ],
  },
}