const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    index: path.resolve(__dirname, 'src', 'index.js')
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist/web'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        // WOFF2 only — Safari 14+, Chrome 36+, Firefox 39+ all support it.
        // TTF and WOFF are no longer emitted; the corresponding @font-face
        // src lines have been pruned in src/style/font/index.css and
        // src/component/fontawesome/index.css. Removing the duplicates
        // shrinks dist/web/font/ by roughly 3x per family.
        test: /\.woff2$/,
        type: 'asset/resource',
        generator: {
          filename: 'font/[name][ext]',
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'image/[name][ext]',
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CopyPlugin({
      patterns: [{
        from: './src/manifest.json',
        to: './manifest.json'
      }, {
        from: './src/icon/',
        to: './icon/'
      }, {
        from: './src/locale',
        to: './_locales'
      }, {
        from: './src/initialBackground.js',
        to: './initialBackground.js'
      }]
    })
  ]
};
