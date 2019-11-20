// const path = require('path');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const { EnvironmentPlugin, HotModuleReplacementPlugin } = require('webpack');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

// const plugins = [
//     new EnvironmentPlugin({
//         NODE_ENV: process.env.NODE_ENV | 'development',
//         DEBUG: true,
//     }),
//     new CopyWebpackPlugin([{ from: 'res', to: 'res' }]), // para copiar estaticos
//     new HtmlWebpackPlugin({
//         hash: true,
//         template: './index.html',
//         filename: './index.html',
//         alwaysWriteToDisk: true,
//     }),
//     new HtmlWebpackHarddiskPlugin(),
// ];

// module.exports = {
//     entry: { // cuál es la entrade de nuestra aplicación
//         client: ['@babel/polyfill', './renderer/index.js'],
//     },
//     resolve: {
//         modules: [__dirname, path.resolve('renderer'), 'node_modules'],
//         extensions: ['.js', '.jsx', '.json'],
//     },
//     output: {
//         filename: '[name].js', // dónde colocará los archivos al terminar
//         path: path.resolve(__dirname, 'dist'),
//         publicPath: './',
//     },
//     devServer: {
//         // opciones para el servidor de desarrollo
//         inline: true, // para que se recargue automáticamente cuando cambie un archivo
//         port: 3333, // puerto donde funcionará el servidor
//         historyApiFallback: true,
//         hot: true,
//     },
//     plugins,
//     module: {
//         rules: [
//             {
//                 test: /\.js$/,
//                 exclude: /(node_modules)/,
//                 use: {
//                     loader: 'babel-loader',
//                 },
//             },
//         ],
//     },
// };


const path = require('path');

module.exports = {
    mode: 'development',
    entry: './renderer/index.js',
    output: {
        path: path.join(__dirname, 'app'),
        filename: 'bundle.js',
    },
    resolve: {
        modules: [__dirname, path.resolve('renderer'), 'node_modules'],
        extensions: ['.js', '.jsx', '.json'],
    },
    devServer: {
        // opciones para el servidor de desarrollo
        inline: true, // para que se recargue automáticamente cuando cambie un archivo
        port: 3333, // puerto donde funcionará el servidor
        historyApiFallback: true,
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                },
            }
        ]
    },
    target: 'electron-renderer',
    node: {
        __dirname: false,
        __filename: false,
    }
};