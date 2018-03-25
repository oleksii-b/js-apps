const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const path = require('path');


const common = {
    entry: [
        'babel-polyfill',
        'index.js'
    ],

    output: {
        path: path.join(__dirname, '/build'),
        filename: 'js/bundle.js'
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'public/index.html'
        })
    ],

    resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['.js', '.css', '.less']
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: [/node_modules/],
                options: {
                    presets: [
                        'env',
                        'flow',
                        'react',
                        'stage-0'
                    ]
                }
            }
        ]
    }
};

module.exports = (env) => {
    switch (env) {
        case 'dev':
            return merge([
                common,
                {
                    devServer: {
                        port: 8808
                    },

                    devtool: 'inline-source-map',

                    module: {
                        rules: [
                            {
                                test: /\.css$/,
                                loader: [
                                    'style-loader',
                                    'css-loader',
                                    'autoprefixer-loader'
                                ]
                            }, {
                                test: /\.less$/,
                                use: [{
                                    loader: 'style-loader'
                                }, {
                                    loader: 'css-loader',
                                    options: {
                                        sourceMap: true
                                    }
                                }, {
                                    loader: 'autoprefixer-loader'
                                }, {
                                    loader: 'less-loader',
                                    options: {
                                        sourceMap: true
                                    }
                                }]
                            }, {
                                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                                loader: 'file-loader'
                            }
                        ]
                    }
                }
            ]);
        case 'build':
            return merge([
                common,
                {
                    module: {
                        rules: [
                            {
                                test: /\.css$/,
                                use: ExtractTextPlugin.extract({
                                    publicPath: '../',
                                    fallback: 'style-loader',
                                    use: [
                                        'css-loader',
                                        'autoprefixer-loader'
                                    ]
                                }),
                                exclude: [/node_modules?!(\/bootstrap)/]
                            }, {
                                test: /\.less$/,
                                use: ExtractTextPlugin.extract({
                                    publicPath: '../',
                                    fallback: 'style-loader',
                                    use: [
                                        'css-loader',
                                        'autoprefixer-loader',
                                        'less-loader'
                                    ]
                                }),
                                exclude: [/node_modules/]
                            }, {
                                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                                loader: 'url-loader?limit=1024&name=/fonts/[name].[ext]'
                            }
                        ]
                    },

                    plugins: [
                        new ExtractTextPlugin('./css/[name].css')
                    ]
                }
            ]);
    }
};
