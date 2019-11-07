require('dotenv').config();
const webpack = require('webpack');
const path = require('path');
const LiveReloadPlugin = require('webpack-livereload-plugin');

let plugins = [
    new webpack.DefinePlugin({
        PRODUCTION: process.env.NODE_ENV === 'production',
        STAGING: process.env.NODE_ENV === 'staging',
        DEVELOPMENT: process.env.NODE_ENV === 'development',
    }),
];
if (process.env.NODE_ENV === 'developmemt') {
    plugins.push(
        new LiveReloadPlugin(),
    );
}

module.exports = {
    entry: {
        dashboard: './src/webui/frontend/dashboard.jsx',
        projects: './src/webui/frontend/projects.jsx',
        forms: './src/webui/frontend/forms.jsx',
        users: './src/webui/frontend/users.jsx',
        roles: './src/webui/frontend/roles.jsx',
    },
    output: {
        path: path.resolve(__dirname, 'src/webui/backend/lib/public/js'),
        filename: '[name].bundle.js'
    },
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                        },
                    },
                ],
            },
            {
                test: /\.(s*)css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.pug$/,
                use: ['pug-loader']
            }
        ]
    },
    plugins,
};
