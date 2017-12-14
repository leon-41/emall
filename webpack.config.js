/*
* @Author: Administrator
* @Date:   2017-12-12 16:43:47
* @Last Modified by:   Administrator
* @Last Modified time: 2017-12-14 20:26:32
*/
 const path = require('path');

 var webpack = require('webpack');
 var ExtractTextPlugin = require("extract-text-webpack-plugin");
 var HtmlWebpackPlugin = require('html-webpack-plugin');

 //环境变量配置，dev / online
 var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
 console.log(WEBPACK_ENV);
 
 //获取html-webpack-plugin参数的方法
 var getHtmlConfig = function (name,title) {
 	return {
 		template :'./src/view/' + name + '.html',
 		filename : 'view/' + name + '.html',
          title    : title,
 		inject   : true,
 		hash     : true,      
 		chunks   : ['common',name],
 	}
 }

 var config = {
     entry: {
     	'common' : ['./src/page/common/index.js'],
     	'index'  : ['./src/page/index/index.js'],
          'login'  : ['./src/page/login/login.js'],
     	'result' : ['./src/page/result/result.js'],
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
			    test: /\.css$/,loader :  ExtractTextPlugin.extract("style-loader","css-loader")
				// loaders : ExtractTextPlugin.extract({ 
				// 		use : 'css-loader', 
				// 		fallback : 'style-loader' })
			},
			{ test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resources/[name].[ext]'},
               { test: /\.string$/,loader : 'html-loader'} 
		]
	},

     resolve :{
          alias : {
               util         : __dirname + '/src/util',
               page         : __dirname + '/src/page',
               image        : __dirname + '/src/image',
               service      : __dirname + '/src/service',
               node_modules : __dirname + '/node_modules',
          }
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
          new HtmlWebpackPlugin(getHtmlConfig( 'index' , '首页'     )),
     	new HtmlWebpackPlugin(getHtmlConfig( 'result', '操作'     )),
          new HtmlWebpackPlugin(getHtmlConfig( 'login' , '用户登录' )),
     ]
 };

 //判断当前环境是dev 在common中加入client
 if(WEBPACK_ENV === 'dev'){
 	config.entry.common.push('webpack-dev-server/client?http://localhost:8088/' );
 }

module.exports = config;
