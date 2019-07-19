// output.pathに絶対パスを指定する必要があるため、pathモジュールを読み込んでおく
const path = require('path');
const Dotenv = require('dotenv-webpack');
const dir = '../../.env/'
const envfile = "dev/gcp/.env-dev"

module.exports = {
  entry: {
      "ts":['./src/implementorjs/main.ts']
  },
  output: {
    // 出力するファイル名
    filename: 'atimplementorjs.min.js',
    // 出力先のパス（絶対パスを指定する必要がある）
    path: path.join(__dirname, '../../../public/js/implementorjs/')
  },
  plugins: [
    new Dotenv({ path:  path.resolve(__dirname, dir, envfile)})
  ],
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  // externals:{
  // //   fs:true,
  //   crypto: crypto,
  //   global: true
  // },
  // node:{
  //   fs:true,
  //   crypto: true,
  //   global: true
  // },

  // ファイルの種類がなんであってもwebpackが処理できるモジュールにLoaderが変換してくれることで、
  // webpackがbundleファイルを作れるようになる。
  // testプロパティ：拡張子を指定して、あるLoaderがどのような種類のファイルを処理するべきなのか特定する(正規表現で拡張子を指定)
  // useプロパティ：Loaderを指定して、testプロパティに指定したファイルがアプリケーションの依存関係や最終的なbundleファイルに加えられるように変換する
  module: {
      rules: [
        {
          test: /\.ts?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
            },
          ]
        }
      ]
  },
  devtool:"source-map"
};