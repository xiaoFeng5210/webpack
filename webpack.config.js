const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = {
    mode: 'production',
    // 让webpack去检查eslint
    plugins: [new ESLintPlugin({
        extensions: ['.js', '.jsx']
    })],
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env'],
                            ['@babel/preset-react', {runtime: 'classic'}],
                            ['@babel/preset-typescript']
                        ]
                    }
                }
            }
        ]
    }
}