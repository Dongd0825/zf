const path = require('path');
const webpack =require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const bootstrap = path.resolve('node_modules/bootstrap/dist/css/bootstrap.css');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWepbackExternalsPlugin = require('html-webpack-externals-plugin')
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
module.exports = ({development, production}) => {
  const isEnvDevelopment = development === 'development';
  const isEnvProduction = production === 'production';
  console.log('isEnvProduction', isEnvProduction);
  const getStyleLoaders = (cssOptions) => {
    const loaders = [
      isEnvDevelopment && require.resolve('style-loader'),
      isEnvProduction && MiniCssExtractPlugin.loader,
      {
        loader: require.resolve('css-loader'),
        options: cssOptions,
      },
      'postcss-loader',
    ].filter(Boolean);
    return loaders;
  }
  return {
    mode: isEnvProduction ? 'production': isEnvDevelopment ? 'development' : 'none',
    devtool: isEnvProduction
      ? shouldUseSourceMap
        ? 'source-map'
        : false
      : isEnvDevelopment && 'cheap-source-map',
    cache: {
      type: 'filesystem' //  开启缓存 放入文件夹 或者memoery内存中
    },
    entry: {
      main: './src/index.js'
    },
    optimization: {
      minimize: isEnvProduction,
      minimizer: [
        new TerserPlugin({parallel: true}),
        new OptimizeCssAssetsPlugin(),
      ],
      splitChunks: {
        chunks: 'all', // 同步 + 异步
        minSize: 0,//分隔文件小大小
        minRemainingSize: 0,//分隔出去剩下的大小
        maxSize: 0,// 最大大小 不限
        minChunks: 1,//最小引用次数
        maxAsyncRequests: 30,// 异步最大请求个数 import('./entry.js') 
        maxInitialRequests: 30,// 同步模块最大请求个数
        enforceSizeThreshold: 50000, // 强制分隔的阈值 超过50k强行大包，
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true
          },
          default: {
            minChunks: 2, // 如果一个模块被引用两次的话，会单独提取代码块
            priority: -20,
            reuseExistingChunk: true
          }
        }
      },
      runtimeChunk: {
        name: entrypoint => `runtime-${entrypoint.name}`,
      },
      moduleIds: isEnvProduction ? 'deterministic': 'named', // 持久化缓存 prod
      chunkIds: isEnvProduction ? 'deterministic': 'named', // 持久化缓存 prod
    },
    resolve: {
      modules: [path.resolve('node_modules')], //配置模块查找范围
      extensions: ['.js'], // 配置后缀名
      alias: {
        bootstrap
      },
      fallback: {
        crypto: false, // 引入的包邮node核心模块，并用不到的时候，可以不引入
        buffer: false,
        stream: false,
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true, // 使用缓存
                presets: [
                  "@babel/preset-react"
                ],
                plugins: [
                  "@babel/plugin-proposal-class-properties"
                ]
              }
            }
          ],
          include: path.resolve('src'),
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: getStyleLoaders({importLoaders: 1})
        }
      ]
    },
    devServer: {},
    plugins: [
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: './public/index.html'
          },
          isEnvProduction
            ? {
              minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyeLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCss: true,
                minifyURLs: true
              }
            }
            : undefined
        )
      ),
      new HtmlWepbackExternalsPlugin({ // 引入外部模块，减少包的体积，和打包时间
        externals: [
          {
            module: 'lodash',
            entry: "https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.20/lodash.js",
            global: "_"
          }
        ]
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      })
    ]
  }
}