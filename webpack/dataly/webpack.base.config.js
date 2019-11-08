// output.pathに絶対パスを指定する必要があるため、pathモジュールを読み込んでおく
// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require("webpack");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = {
  entry: {
    ts: ["./src/dataly/main.ts"]
  },
  output: {
    // 出力するファイル名
    filename: "dataly.min.js",
    // 出力先のパス（絶対パスを指定する必要がある）
    path: path.join(__dirname, "../../public/js/dataly")
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: "all"
  //   }
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
            loader: "ts-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      Promise: "es6-promise", // Thanks Aaron (https://gist.github.com/Couto/b29676dd1ab8714a818f#gistcomment-1584602)
      fetch: "imports?this=>global!exports?global.fetch!whatwg-fetch",
      sendBeacon: "sendbeacon-polyfill"
    })
  ]
};
