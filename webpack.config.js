/*
* @Author: Administrator
* @Date:   2017-12-12 16:43:47
* @Last Modified by:   Administrator
* @Last Modified time: 2017-12-13 03:31:40
*/
 const path = require('path');

 var webpack = require('webpack');
 var ExtractTextPlugin = require("extract-text-webpack-plugin");
 var HtmlWebpackPlugin = require('html-webpack-plugin');

 //环境变量配置，dev / online
 var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
 console.log(WEBPACK_ENV);
 
 //获取html-webpack-plugin参数的方法
 var getHtmlConfig = function (name) {
 	return {
 		template :'./src/view/' + name + '.html',
 		filename : 'view/' + name + '.html',
 		inject : true,
 		hash : true,
 		chunks : ['common',name],
 	}
 }

 var config = {
     entry: {
     	'common' : ['./src/page/common/index.js'],
     	'index' : ['./src/page/index/index.js'],
     	'login' : ['./src/page/login/login.js'],
     },
     output: {
         path: path.resolve(__dirname, './dist'),
         publicPath: '/dist',
         filename: 'js/[name].js'
     },
     externals : {
     	'jquery' : 'window.jQuery'
     },
     
	module: {
	    loaders: [
		    {
			    test: /\.css$/,
			    loader :  ExtractTextPlugin.extract("style-loader","css-loader")
				// loaders : ExtractTextPlugin.extract({ 
				// 		use : 'css-loader', 
				// 		fallback : 'style-loader' })
			},
			{ test: /\.(gif|png|jpg)\??.*$/, loader: 'url-loader?limit=100&name=resources/[name].[ext]'}
		]
	},
	
     plugins : [
     	// 独立通用模块到js/base.js
     	new webpack.optimize.CommonsChunkPlugin({
     		name : 'common',
     		filename : 'js/base.js'
     	}),

     	//把css单独打包到文件夹
     	new ExtractTextPlugin("css/[name].css"),

     	//html模板的处理
     	new HtmlWebpackPlugin(getHtmlConfig('index')),
     	new HtmlWebpackPlugin(getHtmlConfig('login')),
     ]
 };

 //判断当前环境是dev 在common中加入client
 if(WEBPACK_ENV === 'dev'){
 	config.entry.common.push('webpack-dev-server/client?http://localhost:8088/' );
 }

module.exports = config;
