import * as path from "path"
import * as webpack from "webpack"

const Root = path.resolve(__dirname)

const Paths = {
  Src: path.resolve(Root, "src"),
  Dist: path.resolve(Root, "dist"),
  resolve: (...p: string[]) => path.resolve(Root, ...p),
}

const config: webpack.Configuration = {
  mode: "production",
  entry: Paths.resolve("src/index.ts"),
  devtool: "source-map",
  output: {
    path: Paths.Dist,
    filename: "index.min.js",
    library: "WebpackTempPlugin",
    libraryTarget: "umd",
  },
  target: "node",
  // 有了 target: "node", 下面这些就不用指明了
  // node: {
  //   global: false,
  //   __filename: false,
  //   __dirname: false,
  // },
  // externals: {
  //   path: "commonjs2 path",
  // },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        include: [
          Paths.Src,
        ],
        use: [
          "babel-loader",
          "ts-loader",
        ],
      },
    ]
  }
}

export default config
