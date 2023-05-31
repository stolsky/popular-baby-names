import path from "path";
// eslint-disable-next-line import/no-extraneous-dependencies
import HtmlWebpackPlugin from "html-webpack-plugin";

export default () => ({
    entry: "./src/index.js",
    mode: "development",
    plugins: [
        new HtmlWebpackPlugin({
            title: "Popular Baby Names"
        })
    ],
    output: {
        clean: true,
        path: path.resolve("./dist"),
        filename: "[name].bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource"
            }
        ]
    }
});
