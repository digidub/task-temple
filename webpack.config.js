const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;



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
            inject: false,
        }),
        new CleanWebpackPlugin({ protectWebpackAssets: false, }),
        new BundleAnalyzerPlugin()
    ]
};