var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {

    entry: './src/index.jsx',

    resolve: {
        extensions: ['', '.js', '.jsx', '.ts', '.tsx', '.web.js', '.webpack.js']
    },


    output: {
        filename: 'bundle.js',
        path: __dirname + '/assets'
    },

    module: {
        loaders: [
            {
                test: /\.[j|t]sx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['es2015','react']
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!autoprefixer-loader'
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader?root=.")
            },
            {
              test: /\.(eot|svg|ttf|woff|woff2)$/,
              loader: 'file-loader',
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            },
            {
              test: /\.html$/,
              loader: 'html-loader',
            },
            {
              test: /\.json$/,
              loader: 'json-loader',
            },
            {
              test: /\.(mp4|webm)$/,
              loader: 'url-loader?limit=10000',
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin('styles.css'),
        // new StaticSiteGeneratorPlugin('main', data.routes, data),
    ],

    devServer: {
        publicPath: '/assets',
        filename: 'bundle.js',
        port: 8082
    }
}