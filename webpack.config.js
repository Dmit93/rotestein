const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const pages = [
    'index',
    'proektirovanie',
    'partnerstvo',
    'card'
];


const htmlPlugins = pages.map(page => new HtmlWebpackPlugin({
    template: path.resolve(__dirname, `./app/${page}.html`),
    filename: `${page}.html`,
    inject: 'body',
    chunks: ['main'] // Используем 'main' для всех страниц
}));

module.exports = {
    entry: './app/index.js',
    module: {
        rules: [
            { test: /\.(js)$/, use: 'babel-loader' },
            {
                test: /.(png|jpg|jpeg|webp|gif|svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: './img/[name][ext][query]',
                }
            },
            {
                test: /.(scss|sass|css)$/i,
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
        ...htmlPlugins,
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