const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'none',
  watch: {

  },
  plugins: [
    new CopyPlugin()
  ]
}
