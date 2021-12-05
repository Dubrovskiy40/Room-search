const path = require("path"),
  fs = require("fs"),
  HTMLplugin = require("html-webpack-plugin"),
  CopyPlugin = require("copy-webpack-plugin"),
  MiniCssExtractPlugin = require("mini-css-extract-plugin"),
  UglifyJsPlugin = require("uglifyjs-webpack-plugin"),
  OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const isDevelopment = process.env.NODE_ENV === "development";
const PAGES_DIR = path.join(__dirname, "src", "pages");
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith(".pug"))

module.exports = {
  // куда смотреть, точка входа
  entry: {
    main: path.resolve(__dirname, "src", "index.js"),
  },
  // куда собирать билд
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
  },
  // настройка сервера локального
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
      watch: true,
    },
    watchFiles: ["src/**/*"],
  },
  // настройка всех загрузчиков (какими лоадерами обрабатывать файлы)
  module: {
    rules: [
      {
        test: /\.js$/, // регулярное выражение - совпадения имени файла
        exclude: /node_modules/, // регулярное выражение - игнорировать если в имени есть это
        use: {
          loader: "babel-loader" // какой лоадер использовать
        }
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "img/[name][ext]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext]",
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.pug$/,
        use: "pug-loader"
      },
    ]
  },
  // оптимизация, минификация билда
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  // подключение плагинов
  plugins: [
    ...PAGES.map(page => new HTMLplugin ({
      template: path.resolve(__dirname, "src", "pages", page),
      filename: `${page.replace(/\.pug/,".html")}`,
      minify: false,
      meta: {
        "viewport": "width=device-width, initial-scale=1, shrink-to-fit=no",
      },
      scriptLoading: "defer",
    })),
    // копировать любую директорию
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, "src", "images"),
    //       to: path.join(__dirname, "dist", "img"),
    //     },
    //   ],
    // }),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   jQuery: 'jquery'
    // }),
  ],
};
