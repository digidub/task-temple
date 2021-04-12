const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    //devtool: 'inline-source-map',
    module: {
        rules: [
            /*{
                test: /\.js$/,
                enforce: "pre",
                use: ["source-map-loader"],
            },*/
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
                type: 'asset/resource',
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                  },
            },
        ]
    },
    /*devServer: {
        contentBase: './src',
        port: 9000,
    },*/
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.resolve(__dirname, "src", "index.html"),
            title: "Production",
            favicon: "./src/favicon.ico",
            inject: false,
        }),
    ]
};