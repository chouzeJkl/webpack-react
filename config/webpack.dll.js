const path = require('path');
const webpack = require('webpack');
const packageJson = require('../package.json');
const dependencies = Object.keys(packageJson.dependencies || {});

console.log('dependencies building dll...');
console.log(dependencies);

const generateEntry = function(target) {
  return target.filter(item => {
    return ['react', 'react-dom', 'react-router-dom'].includes(item) === false;
  });
}
const vendors = generateEntry(dependencies);

module.exports = {
  mode: 'production',
  entry: {
    react: ['react', 'react-dom', 'react-router-dom'],
  },
  output: {
    path: path.resolve(__dirname, '../dll'),
    filename: '[name].dll.js',
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, '../dll/[name].manifest.json'),
      name: '[name]'
    })
  ]
};
