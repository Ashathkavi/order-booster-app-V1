const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    entry: {
        app: './src/app.js',
    },
    module:{
        rules:[{
            loader:'babel-loader',
            test:/\.js$/,
            exclude:/node_modules/
        },{
            test:/\.s?css$/,
            use: [
                {
                    loader:MiniCssExtractPlugin.loader
                }, {
                    loader: 'css-loader',
                    options: {
                      sourceMap: true
                    }
                },{
                    loader: 'sass-loader',
                    options: {
                      sourceMap: true
                    }
                }
            ]
        }]
    },
    output: {
        path:path.join(__dirname, 'public', 'dist'),
        filename:'bundle.js'
    },
    plugins: [
        new MiniCssExtractPlugin({filename:'style.css'}), 
    ]
};