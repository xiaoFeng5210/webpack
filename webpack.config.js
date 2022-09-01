const ESLintPlugin = require('eslint-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCSSAssetsPlutin = require('optimize-css-assets-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    // watch: false,
    // watchOptions: {
    //     ignored: /node_modules/,
    //     aggregateTimeout: 300,
    //     poll: 1000
    // },
    // 让webpack去检查eslint
    plugins: [new ESLintPlugin({
        extensions: ['.js', '.jsx']
    }), new webpack.HotModuleReplacementPlugin(),
    new OptimizeCSSAssetsPlutin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano')
    }),
    new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src/index.html'),
        filename: 'index.html',
        chunks: ['index'],
        inject: true,
        minify: {
            html5: true,
            collapseWhitespace: true,
            preserveLineBreaks: false,
            minifyCSS: true,
            minifyJS: true,
            removeComments: false
        }
    }),

    ],
    devServer: {
        contentBase: './dist',
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.styl(us)?$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                compileType: 'icss',
                            }
                        }
                    },
                    {
                        loader: 'stylus-loader',
                        options: {
                            stylusOptions: {
                                import: [path.resolve(__dirname, 'src/stylus-vars.styl')]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.less$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                compileType: 'icss',
                            },
                        },
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            additionalData: `@import "src/less-vars.less"`,
                            lessOptions: {
                                paths: [
                                    path.resolve(__dirname, 'node_modules'),
                                ]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env'],
                            ['@babel/preset-react', { runtime: 'classic' }],
                            ['@babel/preset-typescript']
                        ]
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    // 'sass-loader'
                    {
                        loader: 'sass-loader',
                        options: {
                            additionalData: `@import "src/scss-vars.scss"`,
                            sassOptions: {
                                includePaths: [__dirname]
                            }
                        }
                    }
                ]
            },
            // 图片资源解析
            {
                test: /.(png|jpg|gif|jpeg)$/,
                use: 'file-loader'
            },
        ]
    }
}