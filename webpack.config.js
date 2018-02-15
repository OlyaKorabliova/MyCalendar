module.exports = {
    entry: './src/index.jsx',
    output: {
        filename: './build/bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['react', 'es2015', 'env']
                }
            }
        ]
    }
};