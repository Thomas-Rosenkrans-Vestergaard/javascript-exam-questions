var CopyPlugin = require('copy-webpack-plugin');
var path = require('path');

module.exports = {
    entry: './js/main.js',
    mode: 'production',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    plugins: [
        /*new HtmlWebpackPlugin()*/
        new CopyPlugin([
            {
                from: 'index.html',
                to: 'index.html'
            },
            {
                from: 'css/*.css',
            }
        ])
    ]
};