// output.pathに絶対パスを指定する必要があるため、pathモジュールを読み込んでおく
const merge = require('webpack-merge');
const baseConfig = require('../../webpack.base.config');
const Dotenv = require('dotenv-webpack');
const path = require('path');
const dir = '../../.env/'

const envfile = "production/.env";

module.exports = merge(baseConfig, {
  plugins: [new Dotenv({ path: path.resolve(__dirname, dir, envfile) })],
  mode: 'production',
});
