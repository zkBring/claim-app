const path = require('path')
const rewireBabelLoader = require("craco-babel-loader")
const fs = require("fs")
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  webpack: {
    alias: {
      react: path.resolve('./node_modules/react')
    }
  },
  babel: {
    plugins: ["@babel/plugin-proposal-nullish-coalescing-operator", "@babel/plugin-proposal-optional-chaining"],
  },
}