const path = require('path');

module.exports = {
	entry: './src/app.js',
	output: {
		path: path.resolve(__dirname, './public/dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.jsx*/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	},
	devServer: {
		contentBase: path.join(__dirname, 'public'),
		port: 3000
	}
};
