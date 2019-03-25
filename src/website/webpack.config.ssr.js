const path = require('path');
// const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: './ssr/index.js',
  mode: 'development',
  target: 'node',
  // externals: [nodeExternals()],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              ['@babel/plugin-transform-runtime',
                {
                  'regenerator': true
                }
              ]
            ],
          }
        }
      }
    ]
  }
};