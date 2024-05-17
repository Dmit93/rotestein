const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './app/index.js',
    module: {
        rules: [
            { test: /\.(js)$/, use: 'babel-loader' },
            {
                test: /.(png|jpg|jpeg|gif|svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: './img/[name][ext][query]',
                }
            },
            {
                test: /.(scss|sass)$/i,
                use: [
                    process.env.NODE_ENV !== 'production'
                        ? 'style-loader'
                        : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './app/index.html',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        hot: true,
        watchFiles: ['app/**/*.html'],
    },
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development'
}