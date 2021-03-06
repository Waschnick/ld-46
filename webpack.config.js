const path = require('path');
const webpack = require('webpack');

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackBar = require('webpackbar');

const BUNDLE_VERSION = process.env.npm_package_version + (process.env.SNAPSHOT || ('-SNAPSHOT@' + new Date().toISOString()));
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

defaultConfig = {
  entry: {
    app: ['./src/main.ts']
  },
  mode: 'development',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '',
    jsonpFunction: 'ld46Jsonp'
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },

  module: {
    rules: [
      {test: /\.(tsx?)|(js)$/, exclude: /node_modules/, loader: 'ts-loader'},
      // {test: [/\.vert$/, /\.frag$/], use: 'raw-loader'}, // shaders
      // {test: /assets([\/\\])/, type: 'javascript/auto', loader: 'file-loader?name=[hash].[ext]'},
      {
        test: /\.(png|jpe?g|gif|svg|ico|ogg|mp3|wav|xml)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]?[hash]',
          // name: '[path][name].[ext]',
          context: 'src/assets',
        }
      },
      {
        test: /\.json$/,
        loader: 'file-loader',
        type: 'javascript/auto',
        options: {
          name: '[path][name].[ext]?[hash]',
          context: 'src/assets',
        }
      },
    ]
  },

  plugins: [
    new WebpackBar(),
    new webpack.DefinePlugin({
      BUNDLE_VERSION: JSON.stringify(BUNDLE_VERSION),
      IS_PROD: JSON.stringify(IS_PRODUCTION),
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(true)
    }),
    new CopyWebpackPlugin([
      {from: 'src/assets/public', to: ''}
    ]),
    new HtmlWebpackPlugin({
      // filename: './index.html',
      template: './src/index.html',
      chunks: ['app'],
      chunksSortMode: 'manual',
      // minify: {
      //   removeAttributeQuotes: false,
      //   collapseWhitespace: false,
      //   html5: false,
      //   minifyCSS: false,
      //   minifyJS: false,
      //   minifyURLs: false,
      //   removeComments: false,
      //   removeEmptyAttributes: false
      // },
      // hash: false
    }),
  ],

  devServer: {
    contentBase: 'dist',
    host: 'localhost',
    port: 3000,
    noInfo: true,
    stats: 'minimal',
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: /node_modules/
    },
    disableHostCheck: true
  }
};


// const staticFiles = [
//   {from: 'src/assets/demos', to: 'demos'},
//   {from: 'src/assets/icons/now-slack-logo.png', to: 'icons'}
// ];
// defaultConfig.plugins.push(new CopyWebpackPlugin(staticFiles));


module.exports = defaultConfig;
