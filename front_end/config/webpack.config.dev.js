const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const PATH = require('path')

module.exports = {
    mode: 'development',
    entry: {
        main: ['./src/javascripts/app'],
        admin: ['./src/javascripts/admin']
    },
    output: {
        filename: '[name].js',
        path: PATH.resolve(__dirname, '../dev')
    },
    devServer: {
        contentBase: [PATH.join(__dirname, '../dev')],
        compress: true,
        port: 9000,
        proxy: { // 代理api请求到 api server
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['main']
        }),
        new HtmlWebpackPlugin({
            template: './src/admin.html',
            filename: 'admin.html',
            chunks: ['admin']
        }),
        new CopyWebpackPlugin([{
            from: PATH.resolve(__dirname, '../static'),
            to: PATH.join(__dirname, '../dev/static')
        }])
    ],
    module: {
        rules: [{
                test: /\.(css|scss)$/,
                use: [{
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [ // loader从后向前使用
                    {
                        loader: 'string-loader'
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }
            }

        ]
    }
}