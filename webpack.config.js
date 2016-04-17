var webpack = require('webpack');
var bower_dir = __dirname + '/bower_components';

var config = {
	addVendor: function (name, path) {
    	this.resolve.alias[name] = path;
    	this.module.noParse.push(new RegExp('^' + name + '$'));
  	},
  	entry: {
    	app: ['webpack/hot/dev-server','./app/main.js'],
    	vendors: ['react','react-dom','bootstrap','bootstrap.css','jquery']
  	},
  	resolve: { alias: {} },
  	plugins: [
    	new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    	new webpack.ProvidePlugin({
        	'$': 'jquery',
        	'jQuery': 'jquery',
        	'window.jQuery': 'jquery'
    	})
  	],
  	output: {
    	path: process.env.NODE_ENV === 'production' ? './dist' : './build',
    	filename: 'bundle.js'
  	},
  	module: {
    	noParse: ['react','react-dom','bootstrap','jquery'],
    	loaders: [
	      	{
	        	test: /\.jsx?$/,
	        	exclude: /(node_modules|bower_components)/,
	        	loader: 'babel',
	        	query: {
	          		presets: ['react','stage-2', 'es2015']
	       		}
	      	},
	      	{ test: /\.css$/, loader: "style-loader!css-loader" },
	      	{ test: /\.(woff|woff2)$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
			{ test: /\.ttf$/,  loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
			{ test: /\.eot$/,  loader: "file-loader" },
			{ test: /\.svg$/,  loader: "url-loader?limit=10000&mimetype=image/svg+xml" }
    	]
	}
};

config.addVendor('bootstrap', bower_dir + '/bootstrap/dist/js/bootstrap.min.js');
config.addVendor('bootstrap.css', bower_dir + '/bootstrap/dist/css/bootstrap.min.css');
config.addVendor('jquery', bower_dir + '/jQuery/dist/jquery.min.js');

module.exports = config;