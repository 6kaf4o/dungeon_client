const path = require('path');

module.exports = {
  entry: './dungeon_client/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dungeon_client/production'),
  },
  mode: 'production',
  resolve: {
    roots: [path.resolve(__dirname, 'dungeon_client/')],
  },
  // TODO remove this line, currently this line prevents obfuscation of function update()
  optimization: {
    minimize: false
  },
};