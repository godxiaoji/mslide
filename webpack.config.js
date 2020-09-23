const path = require('path')

module.exports = {
  entry: './src/mslide.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'mslide.js',
    library: 'MSlide',
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true,
    globalObject: 'this'
  },
  mode: 'production'
}
