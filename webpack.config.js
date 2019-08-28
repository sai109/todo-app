const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = env => {
	const isProduction = env === 'production';
	const devMode = env !== 'production';

	return {
		entry: './src/app.js',
		output: {
			path: path.resolve(__dirname, './public'),
			filename: './dist/bundle.js',
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: './dist/style.css',
			}),
		],
		module: {
			rules: [
				{
					test: /\.jsx*/,
					exclude: /node_modules/,
					loader: 'babel-loader',
				},
				{
					test: /\.module\.s(a|c)ss$/,
					loader: [
						devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
							options: {
								modules: true,
								localIdentName: '[name]__[local]___[hash:base64:5]',
								camelCase: true,
								sourceMap: devMode,
							},
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: devMode,
							},
						},
					],
				},
				{
					test: /\.(c|s(a|c))ss$/,
					exclude: /\.module.(s(a|c)ss)$/,
					loader: [
						devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
						'css-loader',
						{
							loader: 'sass-loader',
							options: {
								sourceMap: devMode,
							},
						},
					],
				},
			],
		},
		devtool: isProduction ? 'sourcemap' : 'inline-source-map',
		devServer: {
			contentBase: path.join(__dirname, 'public'),
			port: 8080,
			historyApiFallback: true,
			proxy: {
				'/api': {
					target: 'http://localhost:3000',
				},
			},
		},
	};
};
