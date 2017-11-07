const path = require('path')
const { CheckerPlugin } = require('awesome-typescript-loader')

const config = {
  resolve: {
    extensions: ['.ts']
  },
  entry: {
    index: './src/index.ts'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'awesome-typescript-loader'
      }
    ]
  },
  plugins: [
    new CheckerPlugin()
  ]
}

module.exports = config