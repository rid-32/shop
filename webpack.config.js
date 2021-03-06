const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

const plugins = [new CleanWebpackPlugin('dist', {})]

const extensions = ['.js', '.json']

const mode = process.env.NODE_ENV || 'production'

module.exports = {
    mode,
    entry: path.join(__dirname, 'server.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.js',
    },

    resolve: {
        modules: [path.join(__dirname, 'app'), 'node_modules'],
        extensions,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            [
                                '@babel/plugin-proposal-decorators',
                                { legacy: true },
                            ],
                            [
                                '@babel/plugin-proposal-class-properties',
                                { loose: true },
                            ],
                        ],
                    },
                },
            },
        ],
    },
    plugins,
    target: 'node',
    externals: [nodeExternals()],
}
