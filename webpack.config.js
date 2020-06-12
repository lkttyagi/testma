var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
var ExtractText = require('extract-text-webpack-plugin');

module.exports ={
	entry:path.join(__dirname,'assets/src/js/index'),

	output:{
		path:path.join(__dirname,'assets/dist'),
		filename:'[name]-[hash].js'
	},
	plugins:[
		new BundleTracker({
			path:__dirname,
			filename:'webpack.stats.json'
		}),
		new ExtractText({
			filename:'[name]-[hash].css'
		}),
	],
	module:{
		rules:[
			{
				test:/\.jsx?$/,
				
				exclude:/node_modules/,
				use:[
				{
				   loader:'babel-loader',
				   options:{
					presets:['@babel/preset-react',
					{'plugins':['@babel/plugin-proposal-class-properties']}]
				}
				}
                                ],
			},
			{
				test:/\.css$/,
				loader:['style-loader','css-loader'],
			}
		],
	},
	devServer:{
		historyApiFallback: true
	}
}
