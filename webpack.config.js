const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlinePlugin = require('html-webpack-inline-source-plugin');

const mode = process.env.NODE_ENV;

const config = {
	mode,
	entry: path.resolve(__dirname, 'src/index.js'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader',
				exclude: [/node_modules/],
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
					},
					{
						loader: 'postcss-loader',
					},
				],
			},
		],
	},

	plugins: [],
};

if (mode === 'development') {
	config.devServer = {
		contentBase: path.resolve(__dirname, 'src'),
		port: 5000,
	};

	config.plugins.push(
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src/index.html'),
			inject: 'body',
		})
	);
}

if (mode === 'production') {
	config.plugins.push(
		new HtmlWebpackPlugin({
			filename: 'index.html',
			inject: true,
			template: path.resolve(__dirname, 'src', 'index.html'),
			inlineSource: '.(js|css)$',
		}),
		new HtmlWebpackInlinePlugin(HtmlWebpackPlugin)
	);
}

module.exports = config;
