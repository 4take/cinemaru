// Note: You must restart bin/webpack-dev-server for changes to take effect

/* eslint global-require: 0 */
/* eslint import/no-dynamic-require: 0 */
const DEBUG = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === undefined
const nodeEnv = DEBUG ? 'development' : 'production'
const webpack = require('webpack')
const { basename, dirname, join, relative, resolve } = require('path')
const { sync } = require('glob')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const extname = require('path-complete-extname')
const { env, settings, output, loadersDir } = require('./configuration.js')

const extensionGlob = `**/*{${settings.extensions.join(',')}}*`
const entryPath = join(settings.source_path, settings.source_entry_path)
const packPaths = sync(join(entryPath, extensionGlob))
const path = require('path')

module.exports = {
  entry: packPaths.reduce(
    (map, entry) => {
      const localMap = map
      const namespace = relative(join(entryPath), dirname(entry))
      localMap[join(namespace, basename(entry, extname(entry)))] = resolve(entry)
      return localMap
    }, {}
  ),

  output: {
    filename: '[name].js',
    path: output.path,
    publicPath: output.publicPath
  },

  module: {
    rules: sync(join(loadersDir, '*.js')).map(loader => require(loader))
  },

  plugins: [
    new webpack.EnvironmentPlugin(JSON.parse(JSON.stringify(env))),
    new ExtractTextPlugin(env.NODE_ENV === 'production' ? '[name]-[hash].css' : '[name].css'),
    new ManifestPlugin({
      publicPath: output.publicPath,
      writeToFileEmit: true
    }),
    // new webpack.ProvidePlugin({
    //     $: 'jquery',
    //     jQuery: 'jquery',
    //     THREE: 'three'
    // }),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(nodeEnv),
        },
    }),
  ],

  resolve: {
    extensions: settings.extensions,
    modules: [
      resolve(settings.source_path),
      'node_modules'
    ],
    // alias: {
    //   // カメラ制御
    //   '@three/controls/OrbitControls': path.join(__dirname, 'node_modules/three/examples/js/controls/OrbitControls.js'),
    //   '@three/controls/DeviceOrientationControls': path.join(__dirname, 'node_modules/three/examples/js/controls/DeviceOrientationControls.js')
    // }
      alias: {
          'three-examples': path.join(__dirname, 'node_modules/three/examples/js')
      }
  },

  resolveLoader: {
    modules: ['node_modules']
  }
}
